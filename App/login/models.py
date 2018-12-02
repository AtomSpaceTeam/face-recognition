from django.db import models

class Resident(models.Model):
    name = models.CharField(max_length=30)
    surname = models.CharField(max_length=30)
    age = models.IntegerField()
    photo_1 = models.FileField(null=True, blank=True)
    photo_2 = models.FileField(null=True, blank=True)
    photo_3 = models.FileField(null=True, blank=True)
    photo_4 = models.FileField(null=True, blank=True)
    photo_5 = models.FileField(null=True, blank=True)
    
    def __str__(self):
        return self.name

class Mentor(models.Model):
    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    age = models.IntegerField()
    # last_entry = models.DateTimeField(auto_now_add=True)
    # photo_1 = models.ImageField()
    # photo_2 = models.ImageField()
    # photo_3 = models.ImageField()
    # photo_4 = models.ImageField()
    # photo_5 = models.ImageField()

    def __str__(self):
        return self.name

class Owner(models.Model):
    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    age = models.IntegerField()
    # last_entry = models.DateTimeField(auto_now_add=True)
    # photo_1 = models.ImageField()
    # photo_2 = models.ImageField()
    # photo_3 = models.ImageField()
    # photo_4 = models.ImageField()
    # photo_5 = models.ImageField()

    def __str__(self):
        return self.name
 