from django.urls import path
from chat.views import ChatHistoryView, MultimodalChatView


urlpatterns = [
    path("history/", ChatHistoryView.as_view(), name="chat-history"),
    path("send/", MultimodalChatView.as_view(), name="chat-send"),
]