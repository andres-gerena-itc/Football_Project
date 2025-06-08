import csv
from django.core.management.base import BaseCommand
from football_data.models import Match

class Command(BaseCommand):
    help = "Exporta partidos a CSV para grafo dirigido"

    def handle(self, *args, **kwargs):
        with open("matches_data.csv", mode="w", newline='', encoding="utf-8") as file:
            writer = csv.writer(file)
            writer.writerow([
                "source_team", "target_team", "goles_local", "goles_visita", "resultado", "stage", "fecha"
            ])

            for match in Match.objects.all():
                home = match.home_team.name
                away = match.away_team.name
                home_score = match.home_score or 0
                away_score = match.away_score or 0

                # Relación dirigida desde el ganador hacia el perdedor
                if home_score > away_score:
                    source = home
                    target = away
                    result = "win"
                elif away_score > home_score:
                    source = away
                    target = home
                    result = "loss"
                else:
                    source = home
                    target = away
                    result = "draw"

                writer.writerow([
                    source, target, home_score, away_score,
                    result, match.stage, match.date.strftime("%Y-%m-%d")
                ])

        self.stdout.write(self.style.SUCCESS("Archivo matches_data.csv exportado correctamente."))
