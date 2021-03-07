from django.db import models
import random
import string
from django.core.validators import MinValueValidator, MaxValueValidator


def generate_unique_user_code():
    length = 6
    while True:
        # Generates random string consisting only of ASCII Upper-Case letters
        user_id = ''.join(random.choices(string.ascii_uppercase, k=length))
        if (Users.objects.filter(user_id=user_id)).count() == 0:
            break
    return user_id


def generate_unique_session_code():
    length = 6
    while True:
        # Generates random string consisting only of ASCII Upper-Case letters
        session_id = ''.join(random.choices(string.ascii_uppercase, k=length))
        if (Session.objects.filter(session_id=session_id)).count() == 0:
            break
    return session_id


class Session(models.Model):
    session_id = models.CharField(max_length=8 ,default=generate_unique_session_code, unique=True, editable=False)
    session_rating = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)], blank=True)
    session_data = models.JSONField(null=True, blank=True)


class Users(models.Model):
    user_id = models.CharField(max_length=8, primary_key=True, default=generate_unique_user_code, editable=False)
    user_name = models.CharField(max_length=15)
    email = models.EmailField(max_length=20, null=True)
    password = models.CharField(max_length=15, blank=False)
    optimal_session = models.ForeignKey(Session, on_delete=models.CASCADE, null=True, blank=True)


class UserSession(models.Model):
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    session_id = models.ForeignKey(Session, on_delete=models.CASCADE)

