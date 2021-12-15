from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ProfileViewSet, LanguageViewSet, UserViewSet

r = DefaultRouter()


r.register(r'profile', ProfileViewSet, basename='profile')
r.register(r'language', LanguageViewSet, basename='language')
r.register(r'user', UserViewSet, basename='user')

urlpatterns = r.urls