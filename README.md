♻️ E‑Waste Collection Platform

A simple full‑stack project for collecting and managing electronic waste submissions. It includes:

Backend: FastAPI (REST API + file uploads)

Frontend: React (Vite scaffold)

Storage: Local filesystem for uploaded images


Built to be lightweight, understandable, and easy to extend (unlike half the projects abandoned after day two).


---

📁 Project Structure
```
.
├── backend/
│   ├── main.py
│   ├── uploads/
│   ├── requirements.txt
│   └── ...
├── frontend/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```
---

⚙️ Requirements

Backend

Python 3.9+

pip / venv (recommended)


Frontend

Node.js 18+

npm



---

🚀 Getting Started

1. Clone the repository

git clone <repo-url>
cd e-waste-collection


---

🧠 Backend Setup (FastAPI)

1. Create virtual environment (optional but sane)

cd backend
python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows

2. Install dependencies

pip install -r requirements.txt

3. Run the server

uvicorn backend.main:app --reload --port 8000

Backend will be available at:

http://localhost:8000

API docs (Swagger):

http://localhost:8000/docs


---

🎨 Frontend Setup (React + Vite)

cd frontend
npm install
npm run dev

Frontend will run at:

http://localhost:5173


---

🖼 Image Upload Handling

Uploaded images are stored in:


backend/uploads/

Images are publicly served from:


http://localhost:8000/uploads/<filename>

Make sure the uploads/ directory exists before running the backend.


---

🔌 API Overview (Example)

Typical features:

Submit e‑waste form

Upload images of devices

Fetch submissions


Example request:

POST /submit
Content-Type: multipart/form-data

Fields may include:

name

device_type

description

image (file)


(Adjust according to your actual implementation.)


---

🛠 Environment Variables (Optional)

You can add a .env file inside backend/ for:

PORT=8000
UPLOAD_DIR=uploads


---

🧪 Development Tips

Use /docs to test APIs quickly.

Keep image sizes limited (no one needs 12MB trash photos).

Add CORS properly if deploying frontend separately.

Consider moving uploads to S3/Cloudinary for production.



---

📦 Production Notes

For real deployment:

Use Gunicorn + Uvicorn workers

Use Nginx as reverse proxy

Store images in cloud storage

Add authentication & validation

Add a real database (Postgres)


Local filesystem storage is fine for learning, not for surviving real users.


---

🧭 Future Improvements

Admin dashboard

Submission status tracking

Location based collection

User accounts

Analytics

Spam protection



---

📜 License

MIT (or whatever keeps lawyers calm)


---

👤 Author

Built by someone who still believes software should solve actual problems, not just inflate resumes.
