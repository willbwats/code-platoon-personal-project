# Generated by Django 3.2.9 on 2021-12-29 18:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('language_app', '0002_profile_creation_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='language_learning',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='profile',
            name='native_language',
            field=models.CharField(max_length=255),
        ),
    ]