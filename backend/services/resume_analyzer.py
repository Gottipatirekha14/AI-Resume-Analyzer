from google import genai
import os


def analyze_resume(resume_text):
    api_key = os.getenv("GEMINI_API_KEY")

    client = genai.Client(api_key=api_key)

    prompt = f"""
You are an AI resume analyzer.

Analyze the following resume and provide a concise professional assessment.

Resume:
{resume_text}

Provide the following:

1. ATS Score out of 100
2. Resume Strengths
3. Missing Skills or Keywords
4. Areas for Improvement
5. Overall Summary

Keep the analysis practical and suitable for a job applicant.
"""

    response = client.models.generate_content(
        model="gemini-3.5-flash-lite",
        contents=prompt
    )

    return response.text