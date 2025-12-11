import base64
import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

# openai client
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=OPENAI_API_KEY)


# prepare image content
def prepare_image_content(image_file):
    """
    Convert a file-like image object to a GPT-ready image block (base64 embedded).
    """
    image_bytes = image_file.read()
    b64 = base64.b64encode(image_bytes).decode("utf-8")

    return {
        "type": "image_url",
        "image_url": {
            "url": f"data:image/jpeg;base64,{b64}"
        }
    }
    
    
# generate gpt response
def call_gpt4o(messages, model="gpt-4o-mini"):
    """
    Call the LLM with structured messages.
    messages: a list of dicts with {role, content}.
    """
    response = client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=0.3,
        max_tokens=256
    )
    
    print(f"Assistant response: {response.choices[0].message.content}")
    return response.choices[0].message.content