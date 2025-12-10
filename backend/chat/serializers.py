from rest_framework import serializers
from .models import ChatMessage, ChatSession

class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ["id", "session", "sender", "content", "image", "timestamp"]
        read_only_fields = ["id", "sender", "timestamp"]


class CreateMessageSerializer(serializers.Serializer):
    session_id = serializers.UUIDField()
    content = serializers.CharField(required=False, allow_blank=True)
    image = serializers.ImageField(required=False)

    def validate(self, data):
        if not data.get("content") and not data.get("image"):
            raise serializers.ValidationError("Message must contain text or an image.")
        return data
