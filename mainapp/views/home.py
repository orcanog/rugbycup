from django.views.generic import TemplateView

from mainapp.models import Event

class HomeView(TemplateView):
    template_name = "home.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["organisateur"] = "RTC Comitee"
        context["event"] = self.read_event()

        if "homemessage" in self.request.session:
            context["message"] = self.request.session["homemessage"]
            del self.request.session["homemessage"]

        return context

    def read_event(self):
        return Event.objects.all()[0]
