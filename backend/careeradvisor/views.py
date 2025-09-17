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


# ================= College Search API using Gemini =================
@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
def college_search(request):
    field = request.data.get('field', '').strip()
    location = request.data.get('location', 'India').strip()

    if not field:
        return Response({'error': 'Field of study is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Configure Gemini API
        api_key = "AIzaSyAlI8aebOEHNW7fe-yFTQcfp_jDfD3RKBk"
        if not api_key:
            return Response({'error': 'Gemini API key not configured'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        genai.configure(api_key=api_key)

        # Create a detailed prompt for college recommendations
        college_prompt = f"""
        You are a college advisor AI. Based on the field of study "{field}" and location preference "{location}", 
        provide a list of 8-10 relevant colleges/universities.

        For each college, provide the following information in JSON format:
        - name: College/University name
        - location: City, State/Country
        - type: (e.g., "Public University", "Private College", "Technical Institute")
        - ranking: National or regional ranking if known (just the number, e.g., "15")
        - programs: Array of 3-5 relevant programs/majors they offer
        - description: Brief 2-3 sentence description of the college
        - website: Official website URL if known
        - rating: Rating out of 5 (e.g., 4.2)
        - student_count: Approximate number of students (e.g., "25,000")
        - established: Year established
        - fees: Approximate annual fees (e.g., "$15,000-20,000" or "₹2-3 Lakhs")

        Focus on colleges that are:
        1. Well-known for the specified field
        2. Located in or near the specified location (if location is provided)
        3. Have good reputation and accreditation
        4. Offer relevant programs

        Return ONLY a valid JSON array with no additional text or formatting. Example format:
        [
          {{
            "name": "Example University",
            "location": "City, State",
            "type": "Public University",
            "ranking": "25",
            "programs": ["Computer Science", "Software Engineering", "Data Science"],
            "description": "A leading public university known for its strong engineering and technology programs.",
            "website": "https://example.edu",
            "rating": 4.3,
            "student_count": "30,000",
            "established": "1965",
            "fees": "$12,000-18,000"
          }}
        ]
        """

        # Call Gemini API
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(college_prompt)

        if hasattr(response, "text") and response.text:
            response_text = response.text.strip()
            
            # Clean up the response to extract JSON
            if response_text.startswith('```json'):
                response_text = response_text[7:]
            if response_text.endswith('```'):
                response_text = response_text[:-3]
            response_text = response_text.strip()
            
            try:
                import json
                colleges_data = json.loads(response_text)
                
                return Response({
                    'status': 'success',
                    'count': len(colleges_data),
                    'data': colleges_data
                })
            except json.JSONDecodeError as e:
                print(f"JSON decode error: {e}")
                print(f"Response text: {response_text}")
                # Return fallback data if JSON parsing fails
                return get_fallback_colleges(field, location)
        else:
            print("No text in Gemini response")
            return get_fallback_colleges(field, location)

    except Exception as e:
        print(f"Gemini API error: {e}")
        return get_fallback_colleges(field, location)


def get_fallback_colleges(field, location):
    """
    Fallback college data when Gemini API fails
    """
    fallback_colleges = [
        {
            "name": "Indian Institute of Technology (IIT) Delhi",
            "location": "New Delhi, India",
            "type": "Public Technical Institute",
            "ranking": "1",
            "programs": ["Computer Science", "Electrical Engineering", "Mechanical Engineering", "Chemical Engineering"],
            "description": "Premier engineering institute in India, known for excellence in technology and research.",
            "website": "https://home.iitd.ac.in/",
            "rating": 4.8,
            "student_count": "11,000",
            "established": "1961",
            "fees": "₹2-3 Lakhs"
        },
        {
            "name": "Indian Institute of Science (IISc) Bangalore",
            "location": "Bangalore, Karnataka, India",
            "type": "Public Research Institute",
            "ranking": "2",
            "programs": ["Computer Science", "Physics", "Chemistry", "Mathematics", "Biological Sciences"],
            "description": "Leading research institute in India, focusing on science and engineering research.",
            "website": "https://www.iisc.ac.in/",
            "rating": 4.7,
            "student_count": "4,000",
            "established": "1909",
            "fees": "₹1-2 Lakhs"
        },
        {
            "name": "Delhi University",
            "location": "New Delhi, India",
            "type": "Public University",
            "ranking": "8",
            "programs": ["Arts", "Science", "Commerce", "Law", "Medicine"],
            "description": "One of India's largest and most prestigious universities with diverse academic programs.",
            "website": "http://www.du.ac.in/",
            "rating": 4.2,
            "student_count": "132,000",
            "established": "1922",
            "fees": "₹50,000-1 Lakh"
        },
        {
            "name": "Jawaharlal Nehru University (JNU)",
            "location": "New Delhi, India",
            "type": "Public University",
            "ranking": "12",
            "programs": ["Social Sciences", "Languages", "International Studies", "Science"],
            "description": "Renowned for social sciences and liberal arts education with a diverse student body.",
            "website": "https://www.jnu.ac.in/",
            "rating": 4.1,
            "student_count": "8,500",
            "established": "1969",
            "fees": "₹30,000-80,000"
        },
        {
            "name": "Indian Institute of Management (IIM) Ahmedabad",
            "location": "Ahmedabad, Gujarat, India",
            "type": "Public Business School",
            "ranking": "3",
            "programs": ["MBA", "Executive MBA", "PhD in Management", "PGPX"],
            "description": "Premier business school in India, known for producing top management professionals.",
            "website": "https://www.iima.ac.in/",
            "rating": 4.6,
            "student_count": "1,200",
            "established": "1961",
            "fees": "₹23-25 Lakhs"
        },
        {
            "name": "All India Institute of Medical Sciences (AIIMS) Delhi",
            "location": "New Delhi, India",
            "type": "Public Medical Institute",
            "ranking": "1",
            "programs": ["MBBS", "MD", "MS", "DM", "MCh", "Nursing"],
            "description": "Premier medical institute in India, known for medical education and healthcare.",
            "website": "https://www.aiims.edu/",
            "rating": 4.9,
            "student_count": "3,000",
            "established": "1956",
            "fees": "₹1,500-5,000"
        }
    ]
    
    # Filter colleges based on field if possible
    field_lower = field.lower()
    if any(term in field_lower for term in ['computer', 'engineering', 'technology', 'software']):
        filtered_colleges = [c for c in fallback_colleges if any(prog.lower().find('computer') != -1 or prog.lower().find('engineering') != -1 for prog in c['programs'])]
    elif any(term in field_lower for term in ['business', 'management', 'mba']):
        filtered_colleges = [c for c in fallback_colleges if 'IIM' in c['name']]
    elif any(term in field_lower for term in ['medical', 'medicine', 'mbbs']):
        filtered_colleges = [c for c in fallback_colleges if 'AIIMS' in c['name']]
    else:
        filtered_colleges = fallback_colleges[:4]  # Return first 4 as general results
    
    if not filtered_colleges:
        filtered_colleges = fallback_colleges[:4]
    
    return Response({
        'status': 'success',
        'count': len(filtered_colleges),
        'data': filtered_colleges,
        'note': 'Fallback data - Gemini API unavailable'
    })
