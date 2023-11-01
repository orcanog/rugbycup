from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from mainapp.models import Stadium, Event, Team, Ticket

def stadium_list(request):
    MAX_OBJECTS = 20
    stadiums = Stadium.objects.all()[:MAX_OBJECTS]
    data = {"stadiums": list(stadiums.values("name", "location", "latitude", "longitude"))}
    return JsonResponse(data)


def stadium_detail(request, pk):
    stadium = get_object_or_404(Stadium, pk=pk)
    data = {"stadium": {
        "name": stadium.name,
        "location": stadium.location,
        "latitude": stadium.latitude,
        "longitude": stadium.longitude,
    }}
    return JsonResponse(data)


def event_list(request):
    MAX_OBJECTS = 20
    events = Event.objects.all()[:MAX_OBJECTS]
    data = {"events": list(events.values("stadium", "team_home", "team_away", "start"))}
    return JsonResponse(data)

def event_detail(request, pk):
    event = get_object_or_404(Event, pk=pk)
    data = {"event": {
        "stadium": event.stadium,
        "team_home": event.team_home,
        "team_away": event.team_away,
        "start": event.start,
    }}
    return JsonResponse(data)


def team_list(request):
    MAX_OBJECTS = 20
    teams = Team.objects.all()[:MAX_OBJECTS]
    data = {"teams": list(teams.values("country", "country_alpha2", "nickname", "color_first", "color_second"))}
    return JsonResponse(data)

def team_detail(request, pk):
    team = get_object_or_404(Team, pk=pk)
    data = {"team": {
        "country": team.country,
        "country_alpha2": team.country_alpha2,
        "nickname": team.nickname,
        "color_first": team.color_first,
        "color_second": team.color_second,
    }}
    return JsonResponse(data)

def ticket_detail(request, pk):
    ticket = get_object_or_404(Ticket, pk=pk)
    data = {"ticket": {
        "id" : ticket.id,
        "event" : {
            "stadium" : ticket.event.stadium.name,
            "team_home" : ticket.event.team_home.country,
            "team_away" : ticket.event.team_away.country,
            "start" : ticket.event.start,
        },
        "category": ticket.category,
        "seat": ticket.seat,
        "price": ticket.price,
        "currency": ticket.currency,
    }}
    return JsonResponse(data)