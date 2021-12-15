from django.shortcuts import render
from .serializers import UserSerializer, ProfileSerializer, LanguageSerializer
from .models import Profile, Language
from django.contrib.auth.models import User
from rest_framework.viewsets import ModelViewSet


class ProfileViewSet(ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class LanguageViewSet(ModelViewSet):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer
