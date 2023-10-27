from django.views.generic import TemplateView

from mainapp.models import Team

class TeamsView(TemplateView):
    template_name = "teams.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["teams"] = Team.objects.all()
        return context
