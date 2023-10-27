from django.db import models

class Team(models.Model):
    country = models.CharField(max_length=100)
    # Code du pays au format ISO 3166-1 alpha-2
    country_alpha2 = models.CharField(max_length=2)
    nickname = models.CharField(max_length=100)
    # Couleurs stockées au format hexadécimal
    color_first = models.CharField(max_length=6)
    color_second = models.CharField(max_length=6)

    def __str__(self):
        return self.country

    @property
    def flag(self):
        return f"flags/{self.country_alpha2}.svg"
