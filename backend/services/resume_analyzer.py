from google import genai
import os
import json


def analyze_resume(resume_text):
    api_key = os.getenv("GEMINI_API_KEY")

    client = genai.Client(api_key=api_key)

    prompt = f"""
You are an AI resume analyzer.

Analyze the following resume.

Resume:
{resume_text}

Return ONLY valid JSON in exactly this structure:

{{
  "ats_score": 0,
  "strengths": [
    "strength 1",
    "strength 2",
    "strength 3"
  ],
  "missing_skills": [
    "skill 1",
    "skill 2",
    "skill 3"
  ],
  "improvements": [
    "improvement 1",
    "improvement 2",
    "improvement 3"
  ],
  "summary": "Overall professional summary of the resume."
}}

Rules:
- ats_score must be a number between 0 and 100.
- strengths must be a list of concise points.
- missing_skills must be a list of relevant missing skills or keywords.
- improvements must be a list of practical suggestions.
- summary must be a concise paragraph.
- Do not include Markdown.
- Do not include ```json.
- Return ONLY the JSON object.
"""

    response = client.models.generate_content(
        model="gemini-3.5-flash-lite",
        contents=prompt
    )

    try:
        return json.loads(response.text)
    except json.JSONDecodeError:
        return {
            "error": "AI returned an invalid response.",
            "raw_response": response.text
        }