from rest_framework import serializers
from .models import * 
from django.contrib.auth import get_user_model
User = get_user_model()

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    
    def to_representation(self, instance):
        ret = super().to_representation(instance) #instance refer to email and password
        ret.pop('password', None) # we are removing password
        return ret

class ListUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        fields = ['id','first_name', 'last_name','email','sex','role','created_at']

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        fields = ['id','first_name', 'last_name','email','sex','role','password']
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validate_data):
        user = User.objects.create_user(**validate_data)
        return user
    

