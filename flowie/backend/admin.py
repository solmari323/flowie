from django.contrib import admin
from .models import Users, Session, UserSession


admin.site.register(Users)
admin.site.register(Session)
admin.site.register(UserSession)
