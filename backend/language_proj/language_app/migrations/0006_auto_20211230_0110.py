# Generated by Django 3.2.9 on 2021-12-30 01:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('language_app', '0005_profile_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='first_name',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='profile',
            name='last_name',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]