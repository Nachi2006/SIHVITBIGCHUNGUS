#!/usr/bin/env python3
"""
Simple script to test the backend endpoints
Run this after starting the Django server
"""

import requests
import json

BASE_URL = "http://127.0.0.1:8000/api"

def test_register():
    """Test user registration"""
    print("Testing registration...")
    data = {
        "username": "testuser",
        "email": "test@example.com",
        "password": "testpass123"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/register", json=data)
        print(f"Register Status: {response.status_code}")
        print(f"Register Response: {response.text}")
        return response.status_code == 201
    except Exception as e:
        print(f"Register Error: {e}")
        return False

def test_login():
    """Test user login"""
    print("\nTesting login...")
    data = {
        "username": "testuser",
        "password": "testpass123"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/login", json=data)
        print(f"Login Status: {response.status_code}")
        print(f"Login Response: {response.text}")
        
        if response.status_code == 200:
            return response.json().get('access')
        return None
    except Exception as e:
        print(f"Login Error: {e}")
        return None

def test_chat(token):
    """Test chat endpoint"""
    print("\nTesting chat...")
    headers = {"Authorization": f"Bearer {token}"}
    data = {"message": "Hello, how can you help me?"}
    
    try:
        response = requests.post(f"{BASE_URL}/chat", json=data, headers=headers)
        print(f"Chat Status: {response.status_code}")
        print(f"Chat Response: {response.text}")
        return response.status_code == 200
    except Exception as e:
        print(f"Chat Error: {e}")
        return False

def main():
    print("Testing CareerCompass Backend Endpoints")
    print("=" * 40)
    
    # Test registration
    register_success = test_register()
    
    # Test login
    token = test_login()
    
    # Test chat if login successful
    if token:
        test_chat(token)
    else:
        print("Skipping chat test - login failed")
    
    print("\n" + "=" * 40)
    print("Test Summary:")
    print(f"Registration: {'✓' if register_success else '✗'}")
    print(f"Login: {'✓' if token else '✗'}")
    print(f"Chat: {'✓' if token and test_chat(token) else '✗'}")

if __name__ == "__main__":
    main()
