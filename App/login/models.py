from django.db import models
 
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
    date = models.CharField(max_length=20, default=None)
    email = models.EmailField(max_length=30, default=None)
    last_seen = models.DateTimeField(auto_now=True)
    profile_photo = models.FileField(null=True, blank=True)
    photo_1 = models.FileField(null=True, blank=True)
    photo_2 = models.FileField(null=True, blank=True)
    photo_3 = models.FileField(null=True, blank=True)
    photo_4 = models.FileField(null=True, blank=True)
    photo_5 = models.FileField(null=True, blank=True)

    def __str__(self):
        return self.name 