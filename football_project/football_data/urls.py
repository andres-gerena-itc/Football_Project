from django.urls import path
from football_data.api import kpi_summary

urlpatterns = [
    path('api/kpis/', kpi_summary),
]
