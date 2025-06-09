from rest_framework import serializers
from rest_framework.permissions import BasePermission
from .models import Team

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['id', 'name']

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data["groups"] = [group.name for group in self.user.groups.all()]
        return data
