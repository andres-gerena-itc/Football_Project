from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Team
from .models import Match

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['id', 'name']

class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = [
            'id', 'date', 'home_team', 'away_team',
            'home_score', 'away_score', 'competition', 'stage'
        ]

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data["groups"] = [group.name for group in self.user.groups.all()]
        return data


class MatchSerializer(serializers.ModelSerializer):
    home_team_name = serializers.CharField(source='home_team.name', read_only=True)
    away_team_name = serializers.CharField(source='away_team.name', read_only=True)

    class Meta:
        model = Match
        fields = [
            'id', 'date', 'home_score', 'away_score',
            'competition', 'stage',
            'home_team_name', 'away_team_name'  # 👈 Agregamos estos
        ]
