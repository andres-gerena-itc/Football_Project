from django.core.management.base import BaseCommand
from football_data.models import Team, Match
from football_data.services.football_api import fetch_champions_league_matches

class Command(BaseCommand):
    help = 'Carga partidos de Champions League por temporadas'

    def handle(self, *args, **kwargs):
        seasons = [2023]
        for season in seasons:
            self.stdout.write(f"Descargando temporada {season}...")
            matches = fetch_champions_league_matches(season)
            for match in matches:
                home_team, _ = Team.objects.get_or_create(name=match['homeTeam']['name'])
                away_team, _ = Team.objects.get_or_create(name=match['awayTeam']['name'])

                Match.objects.get_or_create(
                    home_team=home_team,
                    away_team=away_team,
                    date=match['utcDate'],
                    home_score=match['score']['fullTime']['home'],
                    away_score=match['score']['fullTime']['away'],
                    competition=match['competition']['name'] if 'competition' in match else None,
                    stage=match['stage'] if 'stage' in match else None,
                )
        self.stdout.write(self.style.SUCCESS('Todos los partidos cargados exitosamente.'))
