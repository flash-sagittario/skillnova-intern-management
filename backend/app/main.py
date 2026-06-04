from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.database import engine, Base
from app.routes import auth, courses, profile

# Import all models so SQLAlchemy registers them before create_all
from app.models import user, course, enrollment  # noqa: F401


# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     """Create database tables on startup."""
#     Base.metadata.create_all(bind=engine)
#     print("✅ Database tables created successfully")
#     yield
#     print("🛑 Shutting down...")

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Create database tables on startup using an async connection."""
    async with engine.begin() as conn:
        # This bridges the async connection to the sync metadata tool
        await conn.run_sync(Base.metadata.create_all)
    
    print("✅ Database tables created successfully")
    yield
    print("🛑 Shutting down...")


app = FastAPI(
    title="SkillNova API",
    description="Backend API for the SkillNova Intern Management Platform",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS — allow the Vite frontend during development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount route groups
app.include_router(auth.router)
app.include_router(courses.router)
app.include_router(profile.router)


@app.get("/", tags=["Health"])
async def health_check():
    return {
        "status": "healthy",
        "service": "SkillNova API",
        "version": "1.0.0",
    }
