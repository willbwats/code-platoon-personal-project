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
    friends = models.ManyToManyField(User, related_name="friends", blank=True)
    creation_date = models.DateField(auto_now=True)
    native_language = models.ForeignKey(Language, related_name="natives", on_delete=models.DO_NOTHING)
    language_learning = models.ForeignKey(Language, related_name="learners", on_delete=models.DO_NOTHING)

    discord_name = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.user.first_name

