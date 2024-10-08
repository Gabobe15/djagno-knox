from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

# reset imports 
from django_rest_passwordreset.signals import reset_password_token_created
from django.dispatch import receiver
from django.urls import reverse
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives
from django.utils.html import strip_tags


Role = (
    ('student', 'Student'), #key value pair
    ('teacher', 'Teacher'),
    ('admin', 'Admin'),
)

SEX_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
    ]


# Create your models here.
class CustomUserManager(BaseUserManager):
    def create_user(self, email,password=None, **extra_field):
        if not email:
            raise ValueError('Email is a required field')
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_field)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None, **extra_field):
        extra_field.setdefault('is_staff', True)
        extra_field.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_field)
        

class CustomUser(AbstractUser):
    first_name = models.CharField(max_length=256, blank=True, null=True)
    last_name = models.CharField(max_length=256, blank=True, null=True)
    username = models.CharField(max_length=256, blank=True, null=True)
    email = models.EmailField(max_length=200, unique=True)
    sex = models.CharField(max_length=10, choices=SEX_CHOICES)
    tel_no = models.CharField(max_length=256, blank=True, null=True)
    country = models.CharField(max_length=256, blank=True, null=True)
    role = models.CharField(max_length=20, choices=Role, default='student')
    created_at = models.DateTimeField(auto_now_add=True)
    
    objects = CustomUserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
   

@receiver(reset_password_token_created)
def password_reset_token_created(reset_password_token, *args, **kwargs):
    sitelink = 'http://localhost:5173/'
    token = '{}'.format(reset_password_token.key)
    full_link = str(sitelink)+str('password-reset/')+str(token)
    
    context = {
        'full_link': full_link,
        'email_address': reset_password_token.user.email
    }
    
    html_message = render_to_string("backend/email.html", context=context)
    plain_message = strip_tags(html_message)
    
    msg = EmailMultiAlternatives(
        subject = "Request for resetting password for {title}".format(title=reset_password_token.user.email),
        body=plain_message,
        from_email = 'sender@example.com',
        to=[reset_password_token.user.email]
    )
    
    msg.attach_alternative(html_message, "text/html")
    msg.send()
    