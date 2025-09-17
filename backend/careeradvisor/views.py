from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer, ChatSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
import requests
import google.generativeai as genai
import os
from .models import Chat
from django.views.decorators.csrf import csrf_exempt


# ================= JWT Protected Home =================
class Home(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        content = {'message': 'Hello, World!'}
        return Response(content)


# ================= User Registration =================
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer


# ================= Custom Login with JWT =================
class CustomLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({
                'error': 'Username and password are required'
            }, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)

        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                }
            })
        else:
            return Response({
                'error': 'Invalid credentials'
            }, status=status.HTTP_401_UNAUTHORIZED)


# ================= Public Home =================
@api_view(['GET'])
def home(request):
    data = {'message': 'Welcome to the home page!'}
    return Response(data)


# ================= Gemini Chatbot =================
def get_chatbot_response(message):
    """
    Enhanced chatbot response function using Google Gemini API for career-focused responses.
    Falls back to rule-based responses if API fails.
    """
    try:
        # Configure Gemini API
        api_key = "AIzaSyAlI8aebOEHNW7fe-yFTQcfp_jDfD3RKBk"
        if not api_key:
            print("❌ No GEMINI_API_KEY found in environment variables")
            return get_fallback_response(message)

        genai.configure(api_key=api_key)

        # Career-focused prompt
        career_prompt = f"""
        You are CareerCompass AI, a professional career guidance assistant. Your role is to provide helpful, accurate, and actionable career advice. 

        Guidelines:
        - Focus on career development, job search, skills, resume writing, interview preparation, and professional growth
        - Provide practical, actionable advice
        - Be encouraging and supportive
        - Keep responses concise but informative (2-3 paragraphs max)
        - If the question is not career-related, gently redirect to career topics

        User question: {message}

        Please provide a helpful career-focused response:
        """

        # Call Gemini API
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(career_prompt)

        if hasattr(response, "text") and response.text:
            print("✅ Gemini responded successfully")
            return response.text.strip()
        elif hasattr(response, "candidates") and response.candidates:
            print("✅ Gemini responded (via candidates)")
            return response.candidates[0].content.parts[0].text.strip()
        else:
            print("⚠️ Gemini returned empty response, using fallback")
            return get_fallback_response(message)

    except Exception as e:
        print(f"❌ Gemini API error: {e}")
        return get_fallback_response(message)


def get_fallback_response(message):
    """
    Fallback rule-based response system when Gemini API is unavailable.
    """
    message_lower = message.lower()

    if any(word in message_lower for word in ['career', 'guidance', 'advice', 'path', 'direction']):
        return "I'd be happy to help with career guidance! Career planning involves understanding your interests, skills, and values. Consider exploring different industries, networking with professionals, and gaining relevant experience through internships or projects. What specific area of career guidance interests you most?"

    elif any(word in message_lower for word in ['job', 'search', 'hunting', 'application', 'interview']):
        return "Here are some effective job search strategies: 1) Tailor your resume for each position, 2) Use professional networks like LinkedIn, 3) Practice common interview questions, 4) Research companies thoroughly, 5) Follow up after applications. Would you like me to elaborate on any of these points?"

    elif any(word in message_lower for word in ['resume', 'cv', 'curriculum vitae']):
        return "A strong resume should highlight your achievements with quantifiable results. Key sections include: Contact info, Professional summary, Work experience, Education, and relevant Skills. Use action verbs and keep it concise (1-2 pages). Would you like specific tips for any section?"

    elif any(word in message_lower for word in ['skill', 'learn', 'development', 'training', 'course']):
        return "Continuous skill development is crucial for career growth! Identify in-demand skills in your field, use online platforms like Coursera, Udemy, or LinkedIn Learning. Practice through projects, seek mentorship, and consider certifications. What skills are you looking to develop?"

    elif any(word in message_lower for word in ['interview', 'preparation', 'questions']):
        return "Interview preparation tips: 1) Research the company and role, 2) Practice STAR method for behavioral questions, 3) Prepare thoughtful questions to ask, 4) Dress appropriately, 5) Arrive early and be confident. Common questions include 'Tell me about yourself' and 'Why do you want this role?' Need help with specific interview scenarios?"

    elif any(word in message_lower for word in ['hello', 'hi', 'hey', 'good morning', 'good afternoon']):
        return "Hello! Welcome to CareerCompass. I'm here to help with career guidance, job search tips, skill development, and resume advice. What would you like to know?"

    else:
        return "I'm here to help with career guidance, job search tips, skill development, and resume advice. What would you like to know?"


# ================= Chatbot API =================
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


# ================= Chat History =================
class ChatHistoryView(generics.ListAPIView):
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Chat.objects.filter(user=self.request.user).order_by('-created_at')


# ================= Job Search API =================
@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
def job_search(request):
    job_title = request.data.get('job_title', '').strip()
    location = request.data.get('location', 'India').strip()

    if not job_title:
        return Response({'error': 'Job title is required'}, status=status.HTTP_400_BAD_REQUEST)

    url = "https://jsearch.p.rapidapi.com/search"

    querystring = {
        "query": f"{job_title} jobs in {location}",
        "page": "1",
        "num_pages": "1",
        "country": "in",
        "date_posted": "all"
    }

    headers = {
        "x-rapidapi-host": "jsearch.p.rapidapi.com",
        "x-rapidapi-key": "0735b4faabmsh42bad049d1ef39dp147b1cjsn55d5602fbba7"
    }

    try:
        response = requests.get(url, headers=headers, params=querystring)
        response.raise_for_status()
        data = response.json()
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
