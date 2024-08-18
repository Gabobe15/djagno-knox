from django.contrib.auth import get_user_model
User = get_user_model

class EmailAuthBackend:
    # this function is use to compare email and password in the database with email and password provided 
    def authenticate(self, request, email=None, password=None):
        try:
            user = User.objects.get(email=email)
            if user.check_password(password):
                return user
        except User.DoesNotExist:
            return None
        
    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist: 
            return None