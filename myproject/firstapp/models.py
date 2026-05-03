from django.db import models

class Task(models.Model):
    title=models.CharField(max_length=200)
    completed= models.BooleanField(default=False)
    date=models.DateField(auto_now_add=True)
    planned_date=models.DateField()
    start_time= models.TimeField()
    end_time=models.TimeField()
    
    def __str__(self):
        return self.title
    