from django.contrib import admin
from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register('register', RegisterViewset, basename='register')
router.register('login', LoginViewset, basename='login')
router.register('users', UserViewset, basename='users')
router.register('user', SingleUserViewset, basename='user')
router.register('change-password', ChangePasswordViewSet, basename='change-password')
urlpatterns = router.urls


