from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import generics, status

from .models import Users, Session, UserSession
from .serializers import UserSerializer, SessionSerializer, OptimalSessionSerializer


class index(generics.ListAPIView):
    queryset = Users.objects.all()
    serializer_class = UserSerializer


class signUp(APIView):
    serializer_class = UserSerializer
    lookup_url_kwarg_user_name = 'user_name'
    lookup_url_kwarg_password = 'password'
    lookup_url_kwarg_email = 'email'

    def post(self, request, format=None):
        # If they don't have an active session -> create one
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create() 

        user_name = request.data.get(self.lookup_url_kwarg_user_name)
        password = request.data.get(self.lookup_url_kwarg_password)
        email = request.data.get(self.lookup_url_kwarg_email)

        if user_name != None and password != None and email != None:
            user = Users(user_name=user_name, password=password, email=email)
            user.save()

            self.request.session['user_id'] = user.user_id

            return Response(UserSerializer(user).data, status=status.HTTP_200_OK)

        return Response({"Bad Request": "user_name and/or password not found in request"}, status=status.HTTP_400_BAD_REQUEST)


class signIn(APIView):
    serializer_class = UserSerializer
    lookup_url_kwarg_user_name = 'user_name'
    lookup_url_kwarg_password = 'password'

    def post(self, request, format=None):
        # If they don't have an active session -> create one
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create() 

        user_name = request.data.get(self.lookup_url_kwarg_user_name)
        password = request.data.get(self.lookup_url_kwarg_password)

        if user_name != None and password != None:
            user_query = Users.objects.filter(user_name=user_name, password=password)

            if user_query.exists():
                user = user_query[0]
                self.request.session['user_id'] = user.user_id

                return Response(UserSerializer(user).data, status=status.HTTP_200_OK)

            return Response({"Bad Request": "user-name and/or password was invalid"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"Bad Request": "user-name and/or password not found in request"}, status=status.HTTP_400_BAD_REQUEST)


class activeSession(APIView):
    def get(self, request, format=None):
        # If they don't have a session -> create one
        if not self.request.session.exists(self.request.session.session_key):   
            self.request.session.create()
        
        data = {
            'user_id': self.request.session.get('user_id')
        }
        
        return JsonResponse(data, status=status.HTTP_200_OK)


class saveSession(APIView):
    serializer_class = UserSerializer
    lookup_url_kwarg_session_rating = 'session_rating'
    lookup_url_kwarg_session_data = 'session_data'

    def post(self, request, format=None):
        # If they don't have an active session -> create one
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create() 

        session_rating = request.data.get(self.lookup_url_kwarg_session_rating)
        session_data = request.data.get(self.lookup_url_kwarg_session_data)

        if session_rating != None and session_data != None:
            session = Session(session_rating=session_rating, session_data=session_data)
            session.save()

            return Response(SessionSerializer(session).data, status=status.HTTP_200_OK)

        return Response({"Bad Request": "session_rating and/or session_data not found in request"}, status=status.HTTP_400_BAD_REQUEST)


# class (APIView):
#     serializer_class = UserSerializer
#     lookup_url_kwarg = ''

#     def (self, request, format=None):
#         # If they don't have an active session -> create one
#         if not self.request.session.exists(self.request.session.session_key):
#             self.request.session.create() 

#          = request.data.get(self.lookup_url_kwarg)

#         if  != None:
#             ..
#         return Response(Serializer().data, status=status.HTTP_200_OK)        
#         return Response({"": ""}, status=status.HTTP_400_BAD_REQUEST)


class getOptimalSession(APIView):
    serializer_class = SessionSerializer
    lookup_url_kwarg_user_id = 'user_id'

    def post(self, request, format=None):
        # If they don't have an active session -> create one
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create() 

        user_id = request.data.get(self.lookup_url_kwarg_user_id)

        if user_id != None:
            user_query = Users.objects.filter(user_id=user_id)

            if user_query.exists():
                optimal_session = user_query[0].optimal_session
                
                return Response(OptimalSessionSerializer(optimal_session).data, status=status.HTTP_200_OK)    

        return Response({"Bad Request": "user_id not found in request"}, status=status.HTTP_400_BAD_REQUEST)



