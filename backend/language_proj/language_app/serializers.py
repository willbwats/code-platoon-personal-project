from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
from .models import Language, Profile

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class ProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'user', 'friends', 'creation_date', 'native_language', 'language_learning', 'discord_name']

class LanguageSerializer(ModelSerializer):
    class Meta:
        model = Language
        fields = ['id', 'name']