from fastapi import FastAPI
from database import engine, Base
import models.user_model
import models.ewaste_model
from routers import auth, ewaste
from fastapi.middleware.cors import CORSMiddleware
import os
from fastapi.staticfiles import StaticFiles

# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="E-Waste Collection API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React development server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Register routers
app.include_router(auth.router)
app.include_router(ewaste.router)

# Serve uploads statically
uploads_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "uploads")
if not os.path.exists(uploads_path):
    os.makedirs(uploads_path, exist_ok=True)

app.mount("/uploads", StaticFiles(directory=uploads_path), name="uploads")

# Test route for image serving
@app.get("/test-image")
def test_image():
    return """
    <html>
        <body>
            <h1>Image Test</h1>
            <img src="/uploads/test.jpg" alt="Test image" onerror="this.style.border='2px solid red'">
            <p>If you see a red border, the image failed to load.</p>
        </body>
    </html>
    """

# Root route
@app.get("/")
def root():
    return {"message": "E-Waste Collection API is running!"}
