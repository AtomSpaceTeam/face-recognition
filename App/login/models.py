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
    status = models.CharField(max_length=15, choices=status)
    birth_date = models.CharField(max_length=20)
    email = models.EmailField(max_length=30, null=True)
    last_seen = models.DateTimeField(auto_now=True)
    profile_photo = models.ImageField(upload_to='profile_photos')
    photo_1 = models.ImageField()
    photo_2 = models.ImageField()
    photo_3 = models.ImageField()
    photo_4 = models.ImageField()
    photo_5 = models.ImageField()

    def __str__(self):
        return self.name 