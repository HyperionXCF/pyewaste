from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Text
from sqlalchemy.dialects.sqlite import JSON
from database import Base


class EwasteItem(Base):
    __tablename__ = "ewaste_items"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    category = Column(String, nullable=False) # consumer | utility
    product_name = Column(String, nullable=True)
    is_working = Column(Boolean, default=True)
    image_path = Column(String, nullable=True)
    tag = Column(String, nullable=True) # reuse | resell | recycle | unknown
    gemini_analysis = Column(JSON, nullable=True)
    price = Column(Integer, nullable=True)  # Price in INR for items marked for reuse