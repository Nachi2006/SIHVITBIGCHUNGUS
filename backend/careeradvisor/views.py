from rest_framework.decorators import api_view
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

# Removed Google authentication

#views.py
@api_view(['GET'])  
def home(request):
    data = {'message': 'Welcome to the home page!'}
    return Response(data)

def get_chatbot_response(message):
    """
    Enhanced chatbot response function with career-focused responses.
    Replace this with your actual ML model's prediction logic.
    """
    message = message.lower()
    
    if any(word in message for word in ["hello", "hi", "hey", "greetings"]):
        return "Hello! I'm your CareerCompass AI assistant. I'm here to help you with career guidance, job search tips, skill development, and resume advice. What would you like to know?"
    
    elif any(word in message for word in ["career", "guidance", "advice", "path"]):
        return "I'd be happy to help with career guidance! To provide the best advice, could you tell me more about your current situation? Are you a student looking to choose a career path, someone considering a career change, or looking to advance in your current field?"
    
    elif any(word in message for word in ["job", "search", "finding", "employment"]):
        return "Great! Job searching can be challenging, but I'm here to help. Here are some key tips:\n\n1. Tailor your resume for each application\n2. Use job boards like LinkedIn, Indeed, and company websites\n3. Network with professionals in your field\n4. Prepare for interviews by researching companies\n5. Follow up after applications\n\nWhat specific aspect of job searching would you like to focus on?"
    
    elif any(word in message for word in ["resume", "cv", "curriculum"]):
        return "I can definitely help with resume advice! A strong resume should:\n\n• Have a clear, professional format\n• Include relevant keywords from job descriptions\n• Highlight your achievements with specific metrics\n• Be tailored to each position\n• Include a compelling summary statement\n\nWould you like specific advice for any particular section of your resume?"
    
    elif any(word in message for word in ["skill", "skills", "development", "learning"]):
        return "Skill development is crucial for career growth! Here's how to approach it:\n\n1. Identify in-demand skills in your field\n2. Take online courses (Coursera, Udemy, LinkedIn Learning)\n3. Practice through projects and volunteering\n4. Seek mentorship and feedback\n5. Stay updated with industry trends\n\nWhat specific skills are you looking to develop?"
    
    elif any(word in message for word in ["interview", "interviews", "interviewing"]):
        return "Interview preparation is key to success! Here are essential tips:\n\n• Research the company and role thoroughly\n• Practice common interview questions\n• Prepare specific examples using the STAR method\n• Dress appropriately and arrive early\n• Prepare thoughtful questions to ask the interviewer\n• Follow up with a thank-you email\n\nWould you like help with any specific type of interview questions?"
    
    elif any(word in message for word in ["salary", "negotiate", "compensation", "pay"]):
        return "Salary negotiation is an important skill! Here's how to approach it:\n\n1. Research market rates for your role and location\n2. Consider your total compensation package\n3. Wait for the right moment (usually after a job offer)\n4. Present your case with data and achievements\n5. Be prepared to discuss non-salary benefits\n\nRemember, negotiation is often expected and shows your value!"
    
    elif any(word in message for word in ["networking", "network", "connections"]):
        return "Networking is one of the most effective ways to advance your career! Try these strategies:\n\n• Attend industry events and conferences\n• Join professional associations\n• Use LinkedIn to connect with colleagues\n• Offer help and value to others first\n• Follow up and maintain relationships\n• Consider informational interviews\n\nBuilding genuine relationships is key to successful networking."
    
    elif any(word in message for word in ["thank", "thanks", "appreciate"]):
        return "You're very welcome! I'm here to help you succeed in your career journey. Feel free to ask me anything about career development, job searching, or professional growth anytime!"
    
    else:
        return "I'm here to help with your career development! I can assist with:\n\n• Career guidance and planning\n• Job search strategies\n• Resume and cover letter advice\n• Interview preparation\n• Skill development recommendations\n• Networking tips\n• Salary negotiation\n\nWhat specific area would you like to explore?"

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