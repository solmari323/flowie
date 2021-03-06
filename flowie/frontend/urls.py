from django.urls import path
from .views import index

# May or may not need
# app_name = 'frontend'

urlpatterns = [
    # Sign In Page
    path('', index, name=''),
    # Sign Up Page
    path('signUp', index),
    # Home Page of User
    path('<str:userId>', index),
]