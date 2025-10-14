from pydantic import BaseModel
from typing import Optional, Any


class EwasteCreate(BaseModel):
    user_id: int
    category: str
    product_name: Optional[str]
    is_working: bool
    price: Optional[int] = None


class EwasteOut(BaseModel):
    id: int
    user_id: int
    category: str
    product_name: Optional[str]
    is_working: bool
    image_path: Optional[str]
    tag: Optional[str]
    gemini_analysis: Optional[Any]
    price: Optional[int] = None  # Make sure price is optional with None as default

    class Config:
        from_attributes = True
    
class EwasteWithUserOut(EwasteOut):
    user_name: str
    user_phone: Optional[str] = None

    class Config:
        from_attributes = True


class Config:
    orm_mode = True