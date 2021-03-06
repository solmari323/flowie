from django.urls import path
from .views import index, signUp, signIn, activeSession, saveSession, getOptimalSession

urlpatterns = [
    path('', index.as_view()),
    path('signUp', signUp.as_view()),
    path('signIn', signIn.as_view()),
    path('activeSession', activeSession.as_view()),
    path('addSession', saveSession.as_view()),
    path('getOptimalSession', getOptimalSession.as_view()),
]
