from rest_framework import serializers
from .models import Users, Session, UserSession


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        dpeth = 1
        fields = ('user_id', 'user_name', 'password', 'optimal_session')


class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = ('session_id', 'session_rating','session_data')


class OptimalSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        # depth = 1
        fields = ('optimal_session')


