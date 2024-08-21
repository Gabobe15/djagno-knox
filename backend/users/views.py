from .serializers import *
from django.shortcuts import render
from django.contrib.auth.hashers import check_password
from rest_framework import viewsets, permissions, status, generics
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

class SingleUserViewset(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = ListUsersSerializer

    def list(self, request):
        user = request.user
        data = {'email': user.email, 'first_name': user.first_name, 'role': user.role, 'id':user.id }
        return Response(data)
    
    
class ChangePasswordViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()  # Define the queryset if needed
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


    def create(self, request, *args, **kwargs):
        user_id = request.data.get('user_id')
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"message": "User does not exist", "icon": "error"})

        if check_password(old_password, user.password):
            user.set_password(new_password)
            user.save()
            return Response({"message": "Password changed successfully", "icon": "success"})
        else:
            return Response({"message": "Old password is incorrect", "icon": "warning"})
