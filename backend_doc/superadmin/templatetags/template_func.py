from django import template
from django.contrib.sessions.models import Session

register = template.Library()


@register.filter
def permission_text(value):
    return value.split('_', 1)[0]

@register.filter
def get_session_permission(codename, request):
    print(codename)
    return next((sub for sub in request.session['role_permissions'] if sub['permission__codename'] in codename), None)
