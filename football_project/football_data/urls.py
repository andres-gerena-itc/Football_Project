from django.urls import path
from football_data.api import kpi_summary
from .views import (
    TeamListView, TeamCreateView,
    TeamUpdateView, TeamDeleteView,
    MatchListView, MatchCreateView,
    MatchUpdateView, MatchDeleteView,
    MatchListAnalystView, TeamListGuestView,
    CustomTokenObtainPairView, # ✅ Usamos esta personalizada
    graph_data_view, directed_graph_by_stage_plotly,
    total_goals_per_team_bar,
    team_kpis, goals_over_time
)
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    # KPIs
    path('api/kpis/', kpi_summary),

    # JWT personalizado (incluye grupos)
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # CRUD Team
    path('api/teams/', TeamListView.as_view(), name='team-list'),
    path('api/team/create/', TeamCreateView.as_view(), name='create_team'),
    path('api/teams/create/', TeamCreateView.as_view(), name='team-create'),
    path('api/teams/<int:id>/update/', TeamUpdateView.as_view(), name='team-update'),
    path('api/teams/<int:id>/delete/', TeamDeleteView.as_view(), name='team-delete'),
    path('api/teams/guest/', TeamListGuestView.as_view(), name='team-list-guest'),

    # CRUD Match
    path('api/matches/', MatchListView.as_view(), name='match-list'),
    path('api/matches/create/', MatchCreateView.as_view(), name='match-create'),
    path('api/matches/<int:id>/update/', MatchUpdateView.as_view(), name='match-update'),
    path('api/matches/<int:id>/delete/', MatchDeleteView.as_view(), name='match-delete'),
    path('api/matches/analyst/', MatchListAnalystView.as_view(), name='match-list-analyst'),

    #GRAFO
    path("api/graph-data/", graph_data_view),
    path('api/graph/by-stage/plotly/', directed_graph_by_stage_plotly),

    #GRAFICAS
    path('api/goals/total-bar/', total_goals_per_team_bar),
    path('api/teams/kpis/', team_kpis),
    path('api/teams/goals-over-time/', goals_over_time),
]
