from django.urls import path
from .views import Home, RegisterView, CustomLoginView, ChatbotView, ChatHistoryView, job_search, college_search

urlpatterns=[
    path('', Home.as_view(),name='home'),
    path('register', RegisterView.as_view(), name='register'),
    path('login', CustomLoginView.as_view(), name='custom-login'),
    path('chat', ChatbotView.as_view(), name='chatbot'),
    path('chat/history', ChatHistoryView.as_view(), name='chat-history'),
    path('jobs/search', job_search, name='job-search'),
    path('colleges/search', college_search, name='college-search')
]