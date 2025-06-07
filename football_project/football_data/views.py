from django.shortcuts import render

# Create your views here.

from rest_framework import generics, permissions
from .models import Team
from .models import Match
from .serializers import TeamSerializer,  MatchSerializer
from .permissions import IsAdminUser

# Lista todos los equipos
class TeamListView(generics.ListAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [permissions.IsAuthenticated]

# Crear equipo
class TeamCreateView(generics.CreateAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminUser]

# Editar un equipo
class TeamUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminUser]
    lookup_field = 'id'

# Eliminar un equipo
class TeamDeleteView(generics.DestroyAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminUser]
    lookup_field = 'id'




# Listar todos los partidos
class MatchListView(generics.ListAPIView):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer
    permission_classes = [permissions.IsAuthenticated]

# Crear partido
class MatchCreateView(generics.CreateAPIView):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminUser]

# Actualizar partido
class MatchUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminUser]
    lookup_field = 'id'

# Eliminar partido
class MatchDeleteView(generics.DestroyAPIView):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminUser]
    lookup_field = 'id'