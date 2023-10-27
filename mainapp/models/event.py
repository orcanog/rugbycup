from django.db import models

class Event(models.Model):
    stadium = models.ForeignKey("Stadium", on_delete=models.PROTECT)
    team_home = models.ForeignKey("Team", on_delete=models.PROTECT, null=True, related_name="events_as_home")
    team_away = models.ForeignKey("Team", on_delete=models.PROTECT, null=True, related_name="events_as_away")
    start = models.DateTimeField()

    def __str__(self):
        return f"{self.start} au {self.stadium}"
