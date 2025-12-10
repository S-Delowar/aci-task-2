from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from chat.models import ChatMessage, ChatSession
from chat.serializers import ChatMessageSerializer, CreateMessageSerializer
from chat.utils import build_message_payload, call_gpt_4o


class SendMessageView(APIView):

    def post(self, request):
        serializer = CreateMessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        session_id = serializer.validated_data["session_id"]
        content = serializer.validated_data.get("content")
        image = serializer.validated_data.get("image")

        session = get_object_or_404(ChatSession, id=session_id)

        # 1️⃣ Save user message
        user_msg = ChatMessage.objects.create(
            session=session,
            sender="user",
            content=content,
            image=image
        )

        # 2️⃣ Build chat history for GPT
        history = session.chat_messages.all()
        messages_payload = build_message_payload(history)

        # 3️⃣ Call GPT-4o
        bot_reply = call_gpt_4o(messages_payload)

        # 4️⃣ Save bot message
        bot_msg = ChatMessage.objects.create(
            session=session,
            sender="bot",
            content=bot_reply
        )

        # 5️⃣ Return bot reply
        return Response({
            "user_message": ChatMessageSerializer(user_msg).data,
            "bot_message": ChatMessageSerializer(bot_msg).data
        }, status=status.HTTP_200_OK)
