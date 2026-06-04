from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class CourseBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200, examples=["Python for Beginners"])
    description: Optional[str] = Field(None, examples=["Learn Python from scratch"])
    instructor: str = Field(..., min_length=1, max_length=100, examples=["Dr. Smith"])
    category: Optional[str] = Field(None, max_length=100, examples=["Programming"])
    duration_hours: Optional[float] = Field(None, ge=0, examples=[10.5])
    thumbnail_url: Optional[str] = None
    max_enrollments: Optional[int] = Field(None, ge=1)


class CourseCreate(CourseBase):
    pass


class CourseResponse(CourseBase):
    id: int
    is_published: bool
    created_at: Optional[datetime] = None
    enrollment_count: Optional[int] = 0

    class Config:
        from_attributes = True


class CourseListResponse(BaseModel):
    courses: list[CourseResponse]
    total: int
    page: int
    page_size: int
