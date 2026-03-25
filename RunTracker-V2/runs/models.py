from django.db import models

# Create your models here.


class Run(models.Model):
    distance_miles = models.FloatField()
    pace = models.CharField(max_length=20)
    run_date = models.DateField()

    def __str__(self):
        return f"{self.distance_miles} miles on {self.run_date}"



