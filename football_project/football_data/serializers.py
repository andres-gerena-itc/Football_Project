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

        # Añadir grupo al payload
        user = self.user
        groups = list(user.groups.values_list('name', flat=True))
        data['groups'] = groups

        return data
