from rest_framework import serializers
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
