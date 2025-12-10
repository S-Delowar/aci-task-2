from openai import OpenAI
from django.conf import settings

client = OpenAI(api_key=settings.OPENAI_API_KEY)


def build_message_payload(messages):
    """Convert chat history into OpenAI format."""
    payload = []

    for msg in messages:
        role = "assistant" if msg.sender == "bot" else "user"

        if msg.image:
            payload.append({
                "role": role,
                "content": [
                    {"type": "text", "text": msg.content or ""},
                    {
                        "type": "input_image",
                        "image_url": msg.image.url,  # served by Django
                    }
                ]
            })
        else:
            payload.append({
                "role": role,
                "content": msg.content
            })

    return payload


def call_gpt_4o(messages_payload):
    """Call GPT-4o model."""
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=messages_payload,
        temperature=0.7
    )

    return response.choices[0].message["content"]
