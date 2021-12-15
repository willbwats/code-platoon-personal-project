from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    '''
    Make a profile when you make a user
    '''

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    friends = models.ManyToManyField(Profile, related_name="friends", blank=True)

    native_language = models.ForeignKey(Language, related_name="natives", blank=True)
    second_native_language = models.ForeignKey(Language, related_name="second_language_natives", blank=True)

    language_learning = models.ForeignKey(Language, related_name="learners")

    discord_name = models.CharField(max_length=255, blank=True)


class Language(models.Model):
    name = models.CharField(max_length=255)