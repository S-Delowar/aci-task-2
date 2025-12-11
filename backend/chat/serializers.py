from rest_framework import serializers
from .models import ChatMessage

class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ['id', 'user', 'role', 'text', 'image', 'created_at']
        read_only_fields = ['user', 'role', 'created_at']

