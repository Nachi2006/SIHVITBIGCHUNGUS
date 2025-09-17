from django.urls import path, include, re_path
from .views import Home, RegisterView, GoogleLoginCallback, GoogleLogin, LoginPage, ChatbotView, ChatHistoryView

urlpatterns=[
    path('', Home.as_view(),name='home'),
    path("googlelogin", LoginPage.as_view(), name="login"),
    path('register',RegisterView.as_view(),name='register'),
    path("v1/auth", include("dj_rest_auth.urls")),
    re_path(r"^v1/auth/accounts", include("allauth.urls")),
    path("v1/auth/registration", include("dj_rest_auth.registration.urls")),
    path("v1/auth/google", GoogleLogin.as_view(), name="google_login"),
    path(
        "v1/auth/google/callback",
        GoogleLoginCallback.as_view(),
        name="google_login_callback",
    ),
    path('chat', ChatbotView.as_view(), name='chatbot'),
    path('chat/history', ChatHistoryView.as_view(), name='chat-history')
]