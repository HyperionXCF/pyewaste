import os
from fastapi import UploadFile
from datetime import datetime


UPLOAD_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "uploads")


def save_image(file: UploadFile) -> str:
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    timestamp = datetime.utcnow().strftime("%Y%m%d%H%M%S%f")
    # Replace spaces and normalize filename
    safe_name = file.filename.replace(" ", "_").replace("\\", "/")
    filename = f"{timestamp}_{safe_name}"
    # Use os.path.join for local file system operations
    path = os.path.join(UPLOAD_DIR, filename)
    with open(path, "wb") as buffer:
        buffer.write(file.file.read())
    # Use forward slashes for URL paths
    return f"/uploads/{filename.replace('\\', '/')}"