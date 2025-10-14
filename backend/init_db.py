from database import engine
from models.ewaste_model import Base as EwasteBase
from models.user_model import Base as UserBase

def init_db():
    # Create all tables
    UserBase.metadata.create_all(bind=engine)
    EwasteBase.metadata.create_all(bind=engine)

if __name__ == "__main__":
    init_db()
    print("Database initialized successfully!")