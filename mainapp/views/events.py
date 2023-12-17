from django.views.generic import TemplateView

from mainapp.models import Event

class EventsView(TemplateView):
    template_name = "mobile.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context["events"] = self.read_events()
        return context
    
    def read_events(self):
        return Event.objects.all()