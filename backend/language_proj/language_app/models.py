from django.db import models
from django.contrib.auth.models import User


class Language(models.Model):
    name = models.CharField(max_length=255)
    def __str__(self):
        return self.name

class Profile(models.Model):
    '''
    Don't forget: make a profile immediately when you make a user
    '''

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255, blank=True)
    friends = models.ManyToManyField(User, related_name="friends", blank=True)
    creation_date = models.DateField(auto_now=True)
    native_language = models.CharField(max_length=255)
    language_learning = models.CharField(max_length=255)
    biography = models.TextField(max_length=2000, blank=True)
    discord_name = models.CharField(max_length=255, blank=True)
    image = models.ImageField(upload_to="media", blank=True)


    def __str__(self):
        return f'{self.user.first_name} {self.native_language}'

