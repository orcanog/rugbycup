from django.urls import path
# Import des URLs de l'interface d'administration
from django.contrib import admin
# Import des vues qui sont déclarées dans leur propre module (dossier)
from .views import HomeView, StadiumsView, TeamsView, NewsletterView, UpdateView, MoreView, stadium_list, stadium_detail, event_list, event_detail, team_list, team_detail, ticket_detail
urlpatterns = (
    path("", HomeView.as_view(), name="home"),
    path("stadiums", StadiumsView.as_view(), name="stadiums"),
    path("teams", TeamsView.as_view(), name="teams"),
    path("newsletter", NewsletterView.as_view(), name="newsletter"),
    path("update", UpdateView.as_view(), name="update"),
    path("more", MoreView.as_view(), name="more"),
    path("api/stadiums", stadium_list, name="stadiums_list"),
    path("api/stadiums/<int:pk>/", stadium_detail, name="stadium_detail"),
    path("api/events", event_list, name="event_list"),
    path("api/events/<int:pk>/", event_detail, name="event_detail"),
    path("api/teams", team_list, name="team_list"),
    path("api/teams/<int:pk>/", team_detail, name="team_detail"),
    path("api/ticket/<pk>", ticket_detail, name="ticket_detail"),
    # Dans un cadre de projet réel, il serait préférable d'utiliser une URL moins prévisible que "admin"
    path("admin", admin.site.urls),
)
