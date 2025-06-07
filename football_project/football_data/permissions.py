from rest_framework.permissions import BasePermission

class IsAdminUser(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.groups.filter(name='admin').exists()

class IsAnalystUser(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.groups.filter(name='analista').exists()

class IsGuestUser(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.groups.filter(name='invitado').exists()
