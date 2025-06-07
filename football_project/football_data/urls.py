from django.urls import path
from football_data.api import kpi_summary
from .views import (
    TeamListView, TeamCreateView,
    TeamUpdateView, TeamDeleteView
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('api/kpis/', kpi_summary),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/team/create/', TeamCreateView.as_view(), name='create_team'),
    path('api/teams/', TeamListView.as_view(), name='team-list'),
    path('api/teams/create/', TeamCreateView.as_view(), name='team-create'),
    path('api/teams/<int:id>/update/', TeamUpdateView.as_view(), name='team-update'),
    path('api/teams/<int:id>/delete/', TeamDeleteView.as_view(), name='team-delete'),
]
