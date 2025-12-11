from services.openai_service import prepare_image_content

# building conversation history
def build_conversation_history(user, ChatMessage):
    """
    Builds a GPT-ready message list containing:
      - system prompt
      - all previous conversation messages (with text + image)
    """

    system_prompt = f"""
    You are CHIMERA, an advanced multimodal AI assisting a lone astronaut aboard the deep-space probe CHIMERA-01.

Your role:
• Provide calm, clear, safety-focused guidance.
• Analyze text and images accurately, describing only what is visible.
• Keep responses concise, structured, and mission-oriented.
• Use conversation history for continuity without repeating unnecessary details.
• Offer step-by-step suggestions when helpful, and state uncertainty when needed.
• Never guess identities or invent technical facts.

Goal:
Support the astronaut with reliable diagnostics, observations, and actionable next steps.
"""
    messages = [
        {
            "role": "system",
            "content": system_prompt
        }
    ]

    history = ChatMessage.objects.filter(user=user).order_by("created_at")

    for msg in history:
        content_blocks = []

        # Text
        if msg.text:
            content_blocks.append({
                "type": "text",
                "text": msg.text
            })

        # Image
        if msg.image:
            with msg.image.open("rb") as f:
                content_blocks.append(prepare_image_content(f))

        messages.append({
            "role": msg.role,
            "content": content_blocks
        })

    return messages