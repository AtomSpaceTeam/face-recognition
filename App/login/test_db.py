from django.conf import settings

settings.configure(DEBUG=True)
from models import Resident

resident = Resident(name='Misha',surname='Budish',age=15)
resident.save()