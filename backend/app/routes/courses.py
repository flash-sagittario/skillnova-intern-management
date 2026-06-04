from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import func as sa_func
from app.database import get_db
from app.models.course import Course
from app.models.enrollment import Enrollment, EnrollmentStatus
from app.models.user import User
from app.schemas.course import CourseCreate, CourseResponse, CourseListResponse
from app.schemas.enrollment import EnrollRequest, EnrollmentResponse
from app.auth import get_current_user, get_current_admin

router = APIRouter(prefix="/api/courses", tags=["Courses"])


@router.get("/", response_model=CourseListResponse)
async def get_all_courses(
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(10, ge=1, le=100, description="Items per page"),
    category: str = Query(None, description="Filter by category"),
    search: str = Query(None, description="Search by title"),
    db: Session = Depends(get_db),
):
    """
    Get all published courses with pagination, optional category filter and search.
    """
    query = db.query(Course).filter(Course.is_published == True)

    if category:
        query = query.filter(Course.category == category)
    if search:
        query = query.filter(Course.title.ilike(f"%{search}%"))

    total = query.count()
    courses = query.offset((page - 1) * page_size).limit(page_size).all()

    # Attach enrollment counts
    course_responses = []
    for course in courses:
        enrollment_count = (
            db.query(sa_func.count(Enrollment.id))
            .filter(Enrollment.course_id == course.id)
            .scalar()
        )
        resp = CourseResponse.model_validate(course)
        resp.enrollment_count = enrollment_count
        course_responses.append(resp)

    return CourseListResponse(
        courses=course_responses,
        total=total,
        page=page,
        page_size=page_size,
    )


@router.get("/{course_id}", response_model=CourseResponse)
async def get_course_by_id(course_id: int, db: Session = Depends(get_db)):
    """Get a single course by its ID."""
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found",
        )

    enrollment_count = (
        db.query(sa_func.count(Enrollment.id))
        .filter(Enrollment.course_id == course.id)
        .scalar()
    )
    resp = CourseResponse.model_validate(course)
    resp.enrollment_count = enrollment_count
    return resp


@router.post("/", response_model=CourseResponse, status_code=status.HTTP_201_CREATED)
async def create_course(
    course_data: CourseCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin),
):
    """Create a new course (admin only)."""
    new_course = Course(**course_data.model_dump())
    db.add(new_course)
    db.commit()
    db.refresh(new_course)

    resp = CourseResponse.model_validate(new_course)
    resp.enrollment_count = 0
    return resp


@router.post("/enroll", response_model=EnrollmentResponse, status_code=status.HTTP_201_CREATED)
async def enroll_in_course(
    enrollment: EnrollRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Enroll the current authenticated user in a course."""
    # Check course exists
    course = db.query(Course).filter(Course.id == enrollment.course_id).first()
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found",
        )

    # Check if already enrolled
    existing = (
        db.query(Enrollment)
        .filter(
            Enrollment.user_id == current_user.id,
            Enrollment.course_id == enrollment.course_id,
        )
        .first()
    )
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="You are already enrolled in this course",
        )

    # Check max enrollments
    if course.max_enrollments:
        current_count = (
            db.query(sa_func.count(Enrollment.id))
            .filter(Enrollment.course_id == course.id)
            .scalar()
        )
        if current_count >= course.max_enrollments:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Course has reached maximum enrollment capacity",
            )

    # Create enrollment
    new_enrollment = Enrollment(
        user_id=current_user.id,
        course_id=enrollment.course_id,
        status=EnrollmentStatus.ENROLLED,
    )
    db.add(new_enrollment)
    db.commit()
    db.refresh(new_enrollment)

    resp = EnrollmentResponse.model_validate(new_enrollment)
    resp.course_title = course.title
    return resp


@router.get("/my/enrollments", response_model=list[EnrollmentResponse])
async def get_my_enrollments(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get all courses the current user is enrolled in."""
    enrollments = (
        db.query(Enrollment)
        .filter(Enrollment.user_id == current_user.id)
        .all()
    )

    results = []
    for enr in enrollments:
        resp = EnrollmentResponse.model_validate(enr)
        resp.course_title = enr.course.title
        results.append(resp)
    return results
