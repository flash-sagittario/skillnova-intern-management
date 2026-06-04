# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker, DeclarativeBase
# from app.config import get_settings

# settings = get_settings()

# engine = create_engine(
#     settings.DATABASE_URL,
#     pool_pre_ping=True,
#     pool_size=10,
#     max_overflow=20,
# )

# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# class Base(DeclarativeBase):
#     pass


# def get_db():
#     """Dependency that provides a database session per request."""
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()


from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from app.config import get_settings

settings = get_settings()

# Use create_async_engine for aiomysql
engine = create_async_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,
)

# Use async_sessionmaker for AsyncSession
SessionLocal = async_sessionmaker(
    bind=engine, 
    class_=AsyncSession, 
    expire_on_commit=False
)

class Base(DeclarativeBase):
    pass

async def get_db():
    """Asynchronous dependency for database sessions."""
    async with SessionLocal() as session:
        yield session