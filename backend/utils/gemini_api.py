"""Gemini Vision helper.

This module implements analyze_image(image_path) which will call an external
Gemini Vision-like API to analyze an image and return a structured dict of
recyclable / reusable components.

Behavior:
- If GEMINI_API_KEY is set in the environment, perform a real HTTP request to
  the configured endpoint (defaults to a placeholder URL) using httpx.
- If no API key is provided, fall back to a deterministic local stubbed response.
"""

import os
from typing import Dict, Any
import json

import httpx

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
# Example endpoint; replace with real Gemini Vision endpoint when available
GEMINI_VISION_URL = os.getenv("GEMINI_VISION_URL", "https://api.gemini.example/v1/vision/analyze")


def _stub_response(image_path: str) -> Dict[str, Any]:
    # Basic deterministic stub based on filename hash (keeps responses varied)
    basename = os.path.basename(image_path or "")
    score = sum(ord(c) for c in basename) % 100 / 100.0
    return {
        "source": "stub",
        "recyclable_components": [
            {"name": "copper", "confidence": 0.6 + score * 0.3},
            {"name": "plastic", "confidence": 0.4 + score * 0.5},
        ],
        "raw": None,
        # lightweight decision tag for UX (reuse/resell/recycle)
        "suggested_tag": "reuse",
    }


def analyze_image(image_path: str) -> Dict[str, Any]:
    """Analyze the given image and return component analysis.

    image_path is the relative path stored in DB (e.g. "uploads/20251011_...jpg").
    This function will open the file and POST it to the Gemini-like API.
    Returns a dict with keys: recyclable_components (list), raw (original response).
    """
    if not GEMINI_API_KEY:
        return _stub_response(image_path)

    # Build absolute path to file
    backend_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    abs_path = os.path.join(backend_root, image_path) if image_path else None

    headers = {"Authorization": f"Bearer {GEMINI_API_KEY}"}

    try:
        with httpx.Client(timeout=30.0) as client:
            if abs_path and os.path.exists(abs_path):
                files = {"file": (os.path.basename(abs_path), open(abs_path, "rb"), "application/octet-stream")}
                resp = client.post(GEMINI_VISION_URL, headers=headers, files=files)
            else:
                # If the file is missing, ask the API to analyze by url or return stub
                resp = client.post(GEMINI_VISION_URL, headers=headers, json={"note": "no_file_provided"})

            resp.raise_for_status()
            data = resp.json()
            # Normalize expected structure
            result = {
                "source": "gemini",
                "recyclable_components": data.get("recyclable_components") or data.get("components") or [],
                "raw": data,
            }
            return result
    except Exception as e:
        # If API fails, fall back to stub and attach error info
        stub = _stub_response(image_path)
        stub["error"] = str(e)
        return stub