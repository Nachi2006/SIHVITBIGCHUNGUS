from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework import serializers
from .models import Chat

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','email', 'password']
        extra_kwargs = {'password': {'write_only': True},
                        'email':{
                            'required': True,
                            'allow_blank':False
                        }}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ['id', 'user', 'message', 'response', 'created_at']
        read_only_fields = ['id', 'user', 'response', 'created_at']