from django.db import models

class User(models.Model):
    superuser = models.IntegerField(default=None)
    name = models.CharField(max_length=30)
    surname = models.CharField(max_length=30)
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=150)
    status = models.CharField(max_length=15)
    birth_date = models.DateTimeField()
    email = models.EmailField(max_length=30, null=True)
    specialization = models.CharField(max_length=30)
    team = models.CharField(max_length=50)
    project = models.CharField(max_length=50)
    last_seen = models.DateTimeField(auto_now=True)
    profile_photo = models.ImageField(upload_to='profile_photos')

    def __str__(self):
        return self.name

class Seen(models.Model):
    name = models.CharField(max_length=60)
    status = models.CharField(max_length=20)
    time = models.CharField(max_length=30)

class Event(models.Model):
    name = models.CharField(max_length=80)
    description = models.TextField()
    organizer = models.CharField(max_length=40)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    created_time = models.DateTimeField(auto_now=True)

class Guest(models.Model):
    name = models.CharField(max_length=40)
    surname = models.CharField(max_length=40)
    email = models.EmailField(max_length=60)
    event_id = models.IntegerField()
    photo = models.ImageField(upload_to='guest_photos')

class Todo(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()

    def __str__(self):
        return self.title