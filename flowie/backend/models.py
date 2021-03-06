from django.db import models
import uuid
from django.core.validators import MinValueValidator, MaxValueValidator

    
class Session(models.Model):
    session_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    # User can skip rating/questions -> so allowed to be blank
    session_rating = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)], blank=True)
    session_data = models.JSONField(blank=True)


class Users(models.Model):
    # user_id = models.CharField(max_length=8, default=uuid.uuid4, unique=True, primary_key=True)
    user_id = models.CharField(max_length=8, primary_key=True, default=uuid.uuid4, editable=False)

    user_name = models.CharField(max_length=15, default=uuid.uuid4)
    # user_name = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)

    email = models.EmailField(max_length=20, null=True)
    password = models.CharField(max_length=15, blank=False)
    optimal_session = models.ForeignKey(Session, on_delete=models.CASCADE, null=True)


class UserSession(models.Model):
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    session_id = models.ForeignKey(Session, on_delete=models.CASCADE)



