from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Match, Team

@api_view(['GET'])
def kpi_summary(request):
    matches = Match.objects.all()
    total_matches = matches.count()
    total_goals = sum([m.home_score + m.away_score for m in matches])
    avg_goals = round(total_goals / total_matches, 2) if total_matches >= 0 else 0

    data = {
        'total_matches': total_matches,
        'total_goals': total_goals,
        'avg_goals_per_match': avg_goals,
    }
    return Response(data)
