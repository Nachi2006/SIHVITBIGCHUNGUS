from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, request, generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import UserSerializer, ChatSerializer
from django.contrib.auth.models import User
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from django.conf import settings
from urllib.parse import urljoin
from django.urls import reverse
from django.shortcuts import render
from django.views import View
import requests
from .models import Chat
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt

#jwt authorization
class Home(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        content = {'message': 'Hello, World!'}
        return Response(content)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

#google authentication
class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = settings.GOOGLE_OAUTH_CALLBACK_URL
    client_class = OAuth2Client
class GoogleLoginCallback(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]
    def get(self, request, *args, **kwargs):

        code = request.GET.get("code")

        if code is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        token_endpoint_url = urljoin("http://localhost:8000", reverse("google_login"))
        response = requests.post(url=token_endpoint_url, data={"code": code})

        return Response(response.json(), status=status.HTTP_200_OK)
class LoginPage(View):
    def get(self, request, *args, **kwargs):
        return render(
            request,
            "login.html",
            {
                "google_callback_uri": settings.GOOGLE_OAUTH_CALLBACK_URL,
                "google_client_id": settings.GOOGLE_OAUTH_CLIENT_ID,
            },
        )
#https://accounts.google.com/o/oauth2/v2/auth?redirect_uri={{ google_callback_uri }}&prompt=consent&response_type=code&client_id={{ google_client_id }}&scope=openid%20email%20profile&access_type=offline

#views.py
@api_view(['GET'])  
def home(request):
    data = {'message': 'Welcome to the home page!'}
    return Response(data)

def get_chatbot_response(message):
    """
    A placeholder function to simulate a chatbot's response.
    Replace this with your actual ML model's prediction logic.
    """
    message = message.lower()
    if "hello" in message:
        return "Hello there! How can I help you today?"
    else:
        return "Ask me a question"

class ChatbotView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user_message = request.data.get('message')

        if not user_message:
            return Response({'error': 'Message field is required.'}, status=400)

        bot_response = get_chatbot_response(user_message)

        chat = Chat.objects.create(
            user=request.user,
            message=user_message,
            response=bot_response
        )

        serializer = ChatSerializer(chat)

        return Response(serializer.data)
    
class ChatHistoryView(generics.ListAPIView):
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Chat.objects.filter(user=self.request.user).order_by('-created_at')

@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
def job_search(request):
    job_title = request.data.get('job_title', '').strip()
    location = request.data.get('location', 'India').strip()
    
    if not job_title:
        return Response({'error': 'Job title is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    # API endpoint
    url = "https://jsearch.p.rapidapi.com/search"
    
    # Parameters for job search
    querystring = {
        "query": f"{job_title} jobs in {location}",
        "page": "1",
        "num_pages": "1",
        "country": "in",
        "date_posted": "all"
    }
    
    # Headers with your RapidAPI key
    headers = {
        "x-rapidapi-host": "jsearch.p.rapidapi.com",
        "x-rapidapi-key": "0735b4faabmsh42bad049d1ef39dp147b1cjsn55d5602fbba7"
    }
    
    try:
        # Make request to JSearch API
        response = requests.get(url, headers=headers, params=querystring)
        response.raise_for_status()
        data = response.json()
        
        # Extract and format job data
        jobs = data.get("data", [])
        return Response({
            'status': 'success',
            'count': len(jobs),
            'data': jobs
        })
        
    except requests.exceptions.RequestException as e:
        return Response({
            'status': 'error',
            'message': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)