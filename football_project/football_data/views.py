from django.shortcuts import render

# Create your views here.

from rest_framework import generics, permissions
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Team
from .models import Match
from .serializers import TeamSerializer,  MatchSerializer, CustomTokenObtainPairSerializer
from .permissions import IsAdminUser, IsAnalystUser, IsGuestUser
import networkx as nx
import plotly.graph_objects as go
from django.http import JsonResponse




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



#Restriccion para que analistas puedan ver el los partidos

class MatchListAnalystView(generics.ListAPIView):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer
    permission_classes = [permissions.IsAuthenticated, IsAnalystUser]


#Invitado que vea solo los equipos

class TeamListGuestView(generics.ListAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [permissions.IsAuthenticated, IsGuestUser]


#VISTA PERSONALIZADA ACCESO LOGIN

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer





#Generacion tabla partidos

class MatchListView(generics.ListAPIView):
    queryset = Match.objects.all().order_by('date')
    serializer_class = MatchSerializer




#GENERAR GRAFO DIRIGIDO

def graph_data_view(request):
    G = nx.DiGraph()

    for match in Match.objects.all():
        if match.home_score is None or match.away_score is None:
            continue
        if match.home_score > match.away_score:
            G.add_edge(match.home_team.name, match.away_team.name)
        elif match.away_score > match.home_score:
            G.add_edge(match.away_team.name, match.home_team.name)
        else:
            G.add_edge(match.home_team.name, match.away_team.name)
            G.add_edge(match.away_team.name, match.home_team.name)

    pos = nx.spring_layout(G, seed=42)

    edge_x, edge_y = [], []
    for src, dst in G.edges():
        x0, y0 = pos[src]
        x1, y1 = pos[dst]
        edge_x += [x0, x1, None]
        edge_y += [y0, y1, None]

    node_x, node_y, node_text = [], [], []
    for node in G.nodes():
        x, y = pos[node]
        node_x.append(x)
        node_y.append(y)
        node_text.append(f"{node} ({G.degree[node]})")

    edge_trace = dict(
        x=edge_x, y=edge_y,
        mode='lines',
        line=dict(width=1, color='#888'),
        hoverinfo='none',
        type='scatter'
    )

    node_trace = dict(
        x=node_x, y=node_y,
        mode='markers+text',
        text=node_text,
        hoverinfo='text',
        marker=dict(color='royalblue', size=12, line=dict(width=2)),
        type='scatter'
    )

    layout = dict(
        title="Grafo de Partidos",
        showlegend=False,
        margin=dict(b=20, l=5, r=5, t=40),
        xaxis=dict(showgrid=False, zeroline=False),
        yaxis=dict(showgrid=False, zeroline=False)
    )

    return JsonResponse({"data": [edge_trace, node_trace], "layout": layout})
