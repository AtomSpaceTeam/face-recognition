from django.db import models

class Resident(models.Model):
    name = models.CharField(max_length=30)
    surname = models.CharField(max_length=30)
    age = models.IntegerField()
    # last_entry = models.DateTimeField(auto_now_add=True)
    # photo_2 = models.ImageField()
    # photo_3 = models.ImageField()
    # photo_4 = models.ImageField()
    
    def __str__(self):
        return self.name