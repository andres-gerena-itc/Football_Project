from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Team
from .models import Match

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['id', 'name']

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data["groups"] = [group.name for group in self.user.groups.all()]
        return data
    
class IsGuestUser(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.groups.filter(name='invitado').exists()
