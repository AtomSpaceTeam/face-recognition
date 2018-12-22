from django.db import models
 
status = (
    ('resident', 'resident'),
    ('mentor', 'mentor'),
    ('owner', 'owner')
)

spec = (
    ('Software Developer', 'Software Developer'),
    ('Designer', 'Designer'),
    ('Front End', 'Front End'),
    ('Back End', 'Back End'),
    ('Other', 'Other')
)

class User(models.Model):
    attendance = models.IntegerField(default=None)
    name = models.CharField(max_length=30)
    surname = models.CharField(max_length=30)
    username = models.CharField(max_length=30)
    status = models.CharField(max_length=15, choices=status)
    birth_date = models.DateTimeField()
    email = models.EmailField(max_length=30, null=True)
    specialization = models.CharField(max_length=30, choices=spec)
    team = models.CharField(max_length=50)
    project = models.CharField(max_length=50)
    last_seen = models.DateTimeField(auto_now=True)
    profile_photo = models.ImageField(upload_to='profile_photos')

    def __str__(self):
        return self.name 