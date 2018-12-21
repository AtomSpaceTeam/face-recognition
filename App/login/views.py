import os
import shutil
import calendar
import datetime
from datetime import date
import json

from django.conf import settings
from django.contrib.auth import logout as django_logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import HttpResponseRedirect, render
from django.http import JsonResponse
from django.core import serializers

from .forms import EditForm, UserForm
from .models import User


def calculate_age(born):
    today = date.today()
    return today.year - born.year - ((today.month, today.day) < (born.month, born.day))

@login_required
def index(request):
    residents = User.objects.filter(status='resident').count()
    mentors = User.objects.filter(status='mentor').count()
    owners = User.objects.filter(status='owner').count()
    return render(request, 'home/index.html', {'residents': residents,'mentors': mentors,'owners': owners})

@login_required
def api(request):
    database = serializers.serialize("json", User.objects.all(), fields=('attendance'))
    data = json.dumps(database)
    return JsonResponse(data, safe=False)

@login_required
def list_residents(request):
    residents_list = User.objects.filter(status='resident')
    return render(request, 'users/index.html', {'list_residents': residents_list})

@login_required
def list_mentors(request):
    mentors_list = User.objects.filter(status='mentor')
    return render(request, 'users/index.html', {'list_mentors': mentors_list})

@login_required
def list_owners(request):
    owners_list = User.objects.filter(status='owner')
    return render(request, 'users/index.html', {'list_owners': owners_list})

@login_required
def list_users(request):
    users_list = User.objects.all()
    return render(request, 'users/index.html', {'list_users': users_list})

@login_required
def list_events(request):
    month = date.today().month
    year = date.today().year
    days = calendar.monthcalendar(year, month)
    month = calendar.month_name[month]
    context = {
        'month': month,
        'year': year,
        'days': days
    }
    return render(request, 'events/index.html', context)

@login_required
def create_event(request):
    return render(request, 'create_event/index.html')

@login_required
def register(request):
    if request.method == 'GET':
        return render(request, 'create_user/index.html', {'user_form': UserForm()})
    if request.method == 'POST':
        f = UserForm(request.POST, request.FILES)
        if f.is_valid():
            user = User()
            user.attendance = 0
            user.name = request.POST['name']
            user.surname = request.POST['surname']
            user.username = request.POST['username']
            user.status = request.POST['status']
            date = calendar.month_abbr[int(request.POST['date_month'])]+' '+request.POST['date_day']+' '+request.POST['date_year']
            datetime_object = datetime.datetime.strptime(date, '%b %d %Y')
            user.birth_date = datetime_object
            user.email = request.POST['email']
            user.specialization = request.POST['specialization']
            user.team = request.POST['team']
            user.project = request.POST['project']
            user.profile_photo = request.FILES['profile_photo']
            user.save()
        return HttpResponseRedirect('/{}s'.format(user.status))

@login_required
def user_profile(request, pk):
    profile = User.objects.get(id=pk)
    age = calculate_age(profile.birth_date)
    birthday = datetime.datetime.strftime(profile.birth_date, '%d %b %Y')
    context = {
        'profile': profile,
        'profile_photo': 'http://localhost:8000/media/{}'.format(profile.profile_photo),
        'age': age,
        'birthday': birthday
    }
    return render(request, 'profile/index.html', context)

@login_required
def logout(request):
    django_logout(request)
    return  HttpResponseRedirect('/login')

@login_required
def edit_profile(request, pk):
    if request.method == 'POST':
        f = EditForm(request.POST)
        if f.is_valid():
            p = User.objects.filter(id=pk)
            birth = '{}/{}/{}'.format(request.POST['date_day'],
                                      request.POST['date_month'],
                                      request.POST['date_year'])
            p.update(
                name = request.POST['name'],
                surname = request.POST['surname'],
                age = request.POST['age'],
                status = request.POST['status'],
                birth_date = birth,
                email = request.POST['email'],
            )
            return HttpResponseRedirect('/')
    
    if request.method == 'GET':
        context = {
            'edit_form': EditForm()
        }
        return render(request, 'edit/index.html', context)

@login_required
def delete_profile(request, pk):
    p = User.objects.get(id=pk)
    if os.path.isfile('{}/{}'.format(settings.MEDIA_ROOT, p.photo_1)):
        os.remove('{}/{}'.format(settings.MEDIA_ROOT, p.photo_1))
    if os.path.isfile('{}/{}'.format(settings.MEDIA_ROOT, p.photo_2)):
        os.remove('{}/{}'.format(settings.MEDIA_ROOT, p.photo_2))
    if os.path.isfile('{}/{}'.format(settings.MEDIA_ROOT, p.photo_3)):
        os.remove('{}/{}'.format(settings.MEDIA_ROOT, p.photo_3))
    if os.path.isfile('{}/{}'.format(settings.MEDIA_ROOT, p.photo_4)):
        os.remove('{}/{}'.format(settings.MEDIA_ROOT, p.photo_4))
    if os.path.isfile('{}/{}'.format(settings.MEDIA_ROOT, p.photo_5)):
        os.remove('{}/{}'.format(settings.MEDIA_ROOT, p.photo_5))
    if os.path.isfile('{}/{}'.format(settings.MEDIA_ROOT, p.profile_photo)):
        os.remove('{}/{}'.format(settings.MEDIA_ROOT, p.profile_photo))
    p.delete()
    return HttpResponseRedirect('/')