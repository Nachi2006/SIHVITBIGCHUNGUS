from django.urls import path, include, re_path
from .views import Home,RegisterView, GoogleLoginCallback, GoogleLogin

urlpatterns=[
    path('', Home.as_view(),name='home'),
    path('register',RegisterView.as_view(),name='register'),
    path("api/v1/auth/", include("dj_rest_auth.urls")),
    re_path(r"^api/v1/auth/accounts/", include("allauth.urls")),
    path("api/v1/auth/registration/", include("dj_rest_auth.registration.urls")),
    path("api/v1/auth/google/", GoogleLogin.as_view(), name="google_login"),
    path(
        "api/v1/auth/google/callback/",
        GoogleLoginCallback.as_view(),
        name="google_login_callback",
    ),
]