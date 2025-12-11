from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser

from services.history_builder import build_conversation_history
from services.openai_service import call_gpt4o
from chat.models import ChatMessage
from chat.serializers import ChatMessageSerializer

# Chat View
# =====================
class MultimodalChatView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        text = request.data.get("text")
        image = request.data.get("image")

        if not text and not image:
            return Response({"error": "Provide text or image"}, status=400)

        # Save user message
        user_msg = ChatMessage.objects.create(
            user=request.user,
            role="user",
            text=text,
            image=image
        )

        # Build full conversation history
        conversation_messages = build_conversation_history(
            user=request.user,
            ChatMessage=ChatMessage
        )

        # Send to LLM
        assistant_reply = call_gpt4o(conversation_messages)

        # Save assistant message
        assistant_msg = ChatMessage.objects.create(
            user=request.user,
            role="assistant",
            text=assistant_reply
        )

        return Response({
            "user_message": ChatMessageSerializer(user_msg).data,
            "assistant_message": ChatMessageSerializer(assistant_msg).data
        })
        
        
# Chat History View
# =======================
class ChatHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        messages = ChatMessage.objects.filter(user=request.user).order_by('created_at')
        serializer = ChatMessageSerializer(messages, many=True)
        return Response(serializer.data)