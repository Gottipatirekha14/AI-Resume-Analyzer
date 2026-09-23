from services.pdf_parser import extract_text_from_pdf
from services.resume_analyzer import analyze_resume
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import shutil

load_dotenv()


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173",
                   "https://ai-resume-analyzer-frontend-za4a.onrender.com",
                   ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create uploads folder automatically
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.get("/")
def home():
    return {"message": "Welcome to AI Resume Analyzer API 🚀"}


@app.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    resume_text = extract_text_from_pdf(file_path)

    try:
        analysis = analyze_resume(resume_text)
    except Exception as e:
        print("Gemini error:", e)
        return {
            "filename": file.filename,
            "message": "Resume uploaded, but AI analysis is temporarily unavailable.",
            "error": str(e)
        }

    return {
        "filename": file.filename,
        "message": "Resume analyzed successfully!",
        "analysis": analysis
    }