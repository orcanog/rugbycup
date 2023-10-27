from django.db import models

class Newsletter(models.Model):
    email = models.EmailField(max_length=100, primary_key=True)
    name = models.CharField(max_length=100)
    consent = models.BooleanField()

    def __str__(self):
        return self.email
