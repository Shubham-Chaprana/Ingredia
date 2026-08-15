import os

from google import genai
from .prompts import RECIPE_PROMPT

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
MODEL = "gemini-3.1-flash-lite"

def generate_recipe(ingredients):
    prompt = RECIPE_PROMPT.format(
        ingredients=", ".join(ingredients)
    )
    response = client.models.generate_content(
        model=MODEL,
        contents=prompt,
    )
    return response.text