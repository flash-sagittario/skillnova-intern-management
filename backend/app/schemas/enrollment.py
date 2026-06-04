from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class EnrollRequest(BaseModel):
    course_id: int


class EnrollmentResponse(BaseModel):
    id: int
    user_id: int
    course_id: int
    status: str
    progress: int
    enrolled_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    course_title: Optional[str] = None

    class Config:
        from_attributes = True
