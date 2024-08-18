from .serializers import *
from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from knox.models import AuthToken
from django.contrib.auth import get_user_model, authenticate
User = get_user_model()

# Create your views here.

class LoginViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = LoginSerializer
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data) #serializing data received 
        if serializer.is_valid():
            email = serializer.validated_data['email']    #extract email and password from validated data
            password = serializer.validated_data['password']   
            user = authenticate(request, email=email, password=password)
            if user:
                _, token = AuthToken.objects.create(user)  #create token for this user
                return Response(
                    {
                        "user": self.serializer_class(user).data, 
                        "token": token
                    }
                )
            else:
                return Response({"error": "Invalid credentials"}, status=401)     #401-unauthorized 
        else:
            return Response(serializer.errors,status=400)


class RegisterViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)
        
class UserViewset(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = ListUsersSerializer
    
    def list(self, request):
        queryset = User.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    

   