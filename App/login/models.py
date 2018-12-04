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

class Owner(models.Model):
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

status = (
    ('resident', 'resident'),
    ('mentor', 'mentor'),
    ('owner', 'owner')
)

class User(models.Model):
    name = models.CharField(max_length=30)
    surname = models.CharField(max_length=30)
    age = models.IntegerField()
    status = models.CharField(max_length=15, choices=status, default=None)
    photo_1 = models.FileField(null=True, blank=True)
    photo_2 = models.FileField(null=True, blank=True)
    photo_3 = models.FileField(null=True, blank=True)
    photo_4 = models.FileField(null=True, blank=True)
    photo_5 = models.FileField(null=True, blank=True)

    def __str__(self):
        return self.name 