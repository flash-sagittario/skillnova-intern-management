from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.schemas.user import UserProfile, UserProfileUpdate
from app.auth import get_current_user

router = APIRouter(prefix="/api/profile", tags=["User Profile"])


@router.get("/", response_model=UserProfile)
async def get_profile(current_user: User = Depends(get_current_user)):
    """Get the current authenticated user's profile."""
    return UserProfile.model_validate(current_user)


@router.put("/", response_model=UserProfile)
async def update_profile(
    updates: UserProfileUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Update the current user's profile. Only provided fields are updated."""
    update_data = updates.model_dump(exclude_unset=True)

    if not update_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No fields provided for update",
        )

    for field, value in update_data.items():
        setattr(current_user, field, value)

    db.commit()
    db.refresh(current_user)
    return UserProfile.model_validate(current_user)
