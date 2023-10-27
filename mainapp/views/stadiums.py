from django.views.generic import TemplateView

from mainapp.models import Stadium

class StadiumsView(TemplateView):
    template_name = "stadiums.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context["stadiums"] = self.read_stadiums()
        return context
    
    def read_stadiums(self):
        return Stadium.objects.all()

