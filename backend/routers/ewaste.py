from fastapi import APIRouter, Depends, File, UploadFile, Form, HTTPException, Query
from sqlalchemy.orm import Session, joinedload
from database import get_db
from models.ewaste_model import EwasteItem
from models.user_model import User
from schemas.ewaste_schema import EwasteCreate, EwasteOut, EwasteWithUserOut
from utils.image_handler import save_image
from utils.gemini_api import analyze_image
from utils.auth_utils import get_current_user

router = APIRouter(prefix="/ewaste", tags=["ewaste"])

@router.post("/add", response_model=EwasteOut)
def add_ewaste(
    user_id: int = Form(...),
    category: str = Form(...),
    product_name: str = Form(None),
    is_working: bool = Form(...),
    price: int = Form(None),
    image: UploadFile = File(None),
    db: Session = Depends(get_db),
):
    image_path = None
    if image:
        image_path = save_image(image)
    tag = None
    analysis = None
    if is_working:
        # working devices: reuse or resell decision — default to reuse
        tag = "reuse"
        if not price and tag == "reuse":
            raise HTTPException(status_code=400, detail="Price is required for working items")
    else:
        tag = "recycle"
        price = None  # No price for non-working items
        if image_path:
            analysis = analyze_image(image_path)
    item = EwasteItem(
        user_id=user_id,
        category=category,
        product_name=product_name,
        is_working=is_working,
        image_path=image_path,
        tag=tag,
        price=price,
        gemini_analysis=analysis
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

@router.get("/user/{user_id}", response_model=list[EwasteOut])
def get_user_items(user_id: int, db: Session = Depends(get_db)):
    items = db.query(EwasteItem).filter(EwasteItem.user_id == user_id).all()
    return items

@router.get("/all", response_model=list[EwasteWithUserOut])
def get_all_items(db: Session = Depends(get_db)):
    items = db.query(EwasteItem).all()
    result = []
    for item in items:
        user = db.query(User).filter(User.id == item.user_id).first()
        if user:
            item_dict = {
                "id": item.id,
                "user_id": item.user_id,
                "category": item.category,
                "product_name": item.product_name,
                "is_working": item.is_working,
                "image_path": item.image_path,
                "tag": item.tag,
                "gemini_analysis": item.gemini_analysis,
                "user_name": user.name
            }
            result.append(item_dict)
    return result


@router.get("/filter", response_model=list[EwasteOut])
def filter_items(
    tag: str | None = Query(None, description="Filter by tag: reuse, resell, recycle"),
    category: str | None = Query(None, description="Filter by category: consumer, utility"),
    db: Session = Depends(get_db),
):
    query = db.query(EwasteItem)
    if tag:
        query = query.filter(EwasteItem.tag == tag)
    if category:
        query = query.filter(EwasteItem.category == category)
    return query.all()


@router.get("/analytics")
def analytics(db: Session = Depends(get_db)):
    """Public endpoint for analytics - no authentication required"""
    try:
        # Get all items
        items = db.query(EwasteItem).all()

        # Convert items to list of dicts
        all_items = []
        for item in items:
            # Get user info if available
            user = db.query(User).filter(User.id == item.user_id).first()
            
            # Handle potentially null fields
            tag = item.tag if item.tag else "unknown"
            category = item.category if item.category else "unknown"
            
            item_dict = {
                "id": item.id,
                "user_id": item.user_id,
                "category": category,
                "product_name": item.product_name or "",
                "is_working": item.is_working,
                "image_path": item.image_path,
                "tag": tag,
                "gemini_analysis": item.gemini_analysis,
                "price": item.price if hasattr(item, 'price') else None,
                "user_name": user.name if user else None
            }
            all_items.append(item_dict)

        total = len(items)
        
        # counts by tag
        tags = ["reuse", "resell", "recycle", "unknown"]
        tag_counts = {t: 0 for t in tags}  # Initialize all counts to 0
        for item in items:
            item_tag = item.tag if item.tag else "unknown"
            if item_tag in tag_counts:
                tag_counts[item_tag] += 1
        
        # counts by category
        categories = ["consumer", "utility", "unknown"]
        category_counts = {c: 0 for c in categories}  # Initialize all counts to 0
        for item in items:
            item_category = item.category if item.category else "unknown"
            if item_category in category_counts:
                category_counts[item_category] += 1
        
        return {
            "total": total,
            "by_tag": tag_counts,
            "by_category": category_counts,
            "all_items": all_items
        }
    except Exception as e:
        return {
            "total": 0,
            "by_tag": {"reuse": 0, "resell": 0, "recycle": 0, "unknown": 0},
            "by_category": {"consumer": 0, "utility": 0, "unknown": 0},
            "all_items": [],
            "error": str(e)
        }

    # counts by category
    categories = ["consumer", "utility"]
    category_counts = {}
    for c in categories:
        category_counts[c] = sum(1 for item in items if item.category == c)

    return {
        "total": total,
        "by_tag": tag_counts,
        "by_category": category_counts,
        "all_items": all_items
    }



@router.get("/reusable", response_model=list[EwasteWithUserOut])
def get_reusable_items(db: Session = Depends(get_db)):
    """Get all items tagged for reuse with their prices and contact info"""
    try:
        print("Fetching reusable items...") # Debug log
        items = db.query(EwasteItem).filter(EwasteItem.tag == "reuse").all()
        print(f"Found {len(items)} items") # Debug log
        result = []
        for item in items:
            user = db.query(User).filter(User.id == item.user_id).first()
            if user:
                item_dict = {
                    "id": item.id,
                    "user_id": item.user_id,
                    "category": item.category,
                    "product_name": item.product_name,
                    "is_working": item.is_working,
                    "image_path": item.image_path,
                    "tag": item.tag,
                    "gemini_analysis": item.gemini_analysis,
                    "price": item.price,
                    "user_name": user.name,
                    "user_phone": user.phone
                }
                print(f"Item data: {item_dict}") # Debug log
                result.append(item_dict)
        return result
    except Exception as e:
        print(f"Error in get_reusable_items: {e}") # Debug log
        raise

@router.delete("/{item_id}")
def delete_item(item_id: int, db: Session = Depends(get_db)):
    """Delete an e-waste item by id. Returns 404 if not found."""
    item = db.query(EwasteItem).filter(EwasteItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(item)
    db.commit()
    return {"detail": "deleted"}