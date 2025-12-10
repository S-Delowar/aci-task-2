
from django.db import models
from django.contrib.auth import get_user_model

import uuid


User = get_user_model()

# chat session
class ChatSession(models.Model):
    """ A chat session created by the user. """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chat_sessions')
    title = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title or f"Session {self.id}"


# Message
class ChatMessage(models.Model):
    """ Represents a single message in a chat session """
    SENDER_CHOICES = [
        ('user', 'User'), 
        ('bot', 'Bot')
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    session = models.ForeignKey(ChatSession, on_delete=models.CASCADE, related_name='chat_messages')
    sender = models.CharField(max_length=10, choices=SENDER_CHOICES)
    content = models.TextField()
    image = models.ImageField(upload_to="uploads/", blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['timestamp']
        
    def __str__(self):
        return f"[{self.sender}] {self.content[:50]}"
    

# Chat memory
class ChatMemory(models.Model):
    session = models.OneToOneField(ChatSession, on_delete=models.CASCADE, related_name="memory")
    long_term_summary = models.TextField(blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Memory for Session {self.session.id}"