from django.db import models

class Team(models.Model):
    name = models.CharField(max_length=255)
    country = models.CharField(max_length=255, null=False, blank=False)

class Match(models.Model):
    home_team = models.ForeignKey(Team, related_name='home_matches', on_delete=models.CASCADE)
    away_team = models.ForeignKey(Team, related_name='away_matches', on_delete=models.CASCADE)
    date = models.DateTimeField()
    home_score = models.IntegerField(null=False, blank=False)
    away_score = models.IntegerField(null=False, blank=False)
    competition = models.CharField(max_length=100, null=False, blank=False)
    stage = models.CharField(max_length=100, null=False, blank=False)
