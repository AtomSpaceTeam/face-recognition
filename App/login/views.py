import os
import shutil
import calendar
import datetime
from datetime import date
import json
import bcrypt
import requests

from django.conf import settings
from django.contrib.auth import logout as django_logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import HttpResponseRedirect, render
from django.http import JsonResponse, HttpResponse
from django.core import serializers
from django.contrib import messages
from django.contrib.auth.hashers import BCryptSHA256PasswordHasher 

from .forms import EditForm, UserForm, UserLogin
from .models import User, Seen


def calculate_age(born):
    today = date.today()
    return today.year - born.year - ((today.month, today.day) < (born.month, born.day))


@login_required
def index(request):
    residents = User.objects.filter(status='resident').count()
    mentors = User.objects.filter(status='mentor').count()
    owners = User.objects.filter(status='owner').count()
    return render(request, 'home-admin/index.html', {'residents': residents,'mentors': mentors,'owners': owners})

@login_required
def api_attendance(request):
    database = serializers.serialize("json", User.objects.all(), fields=('attendance', 'name', 'surname'))
    return HttpResponse(database)

@login_required
def api_face(request):
    res = requests.get('http://dry-dragon-9.localtunnel.me/last_seen/')
    person = res.json()
    print(person['lastSeenInfo']['data'][0]['last_seen'])

    return HttpResponse(person['lastSeenInfo'])

@login_required
def list_residents(request):
    residents = User.objects.filter(status='resident').count()
    mentors = User.objects.filter(status='mentor').count()
    owners = User.objects.filter(status='owner').count()
    residents_list = User.objects.filter(status='resident')
    return render(request, 'users/index.html', {'list_residents': residents_list,'residents': residents,'mentors': mentors,'owners': owners})

@login_required
def list_mentors(request):
    residents = User.objects.filter(status='resident').count()
    mentors = User.objects.filter(status='mentor').count()
    owners = User.objects.filter(status='owner').count()
    mentors_list = User.objects.filter(status='mentor')
    return render(request, 'users/index.html', {'list_mentors': mentors_list,'residents': residents,'mentors': mentors,'owners': owners})

@login_required
def list_owners(request):
    residents = User.objects.filter(status='resident').count()
    mentors = User.objects.filter(status='mentor').count()
    owners = User.objects.filter(status='owner').count()
    owners_list = User.objects.filter(status='owner')
    return render(request, 'users/index.html', {'list_owners': owners_list,'residents': residents,'mentors': mentors,'owners': owners})

@login_required
def list_users(request):
    residents = User.objects.filter(status='resident').count()
    mentors = User.objects.filter(status='mentor').count()
    owners = User.objects.filter(status='owner').count()
    users_list = User.objects.all()
    return render(request, 'users/index.html', {'list_users': users_list,'residents': residents,'mentors': mentors,'owners': owners})

def list_users_user(request):
    residents = User.objects.filter(status='resident').count()
    mentors = User.objects.filter(status='mentor').count()
    owners = User.objects.filter(status='owner').count()
    users_list = User.objects.all()
    return render(request, 'users-user/index.html', {'list_users': users_list,'residents': residents,'mentors': mentors,'owners': owners})

def profile_user(request, pk):
    profile = User.objects.get(id=pk)
    age = calculate_age(profile.birth_date)
    birthday = datetime.datetime.strftime(profile.birth_date, '%d %b %Y')
    context = {
        'profile': profile,
        'profile_photo': 'http://localhost:8000/media/{}'.format(profile.profile_photo),
        'age': age,
        'birthday': birthday
    }
    return render(request, 'profile-user/index.html', context)

def technical_support(request):
    return(render, 'support-user/index.html')

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
    residents = User.objects.filter(status='resident').count()
    mentors = User.objects.filter(status='mentor').count()
    owners = User.objects.filter(status='owner').count()
    return render(request, 'create_event/index.html', {'residents': residents,'mentors': mentors,'owners': owners})

@login_required
def register(request):
    if request.method == 'GET':
        residents = User.objects.filter(status='resident').count()
        mentors = User.objects.filter(status='mentor').count()
        owners = User.objects.filter(status='owner').count()
        return render(request, 'register_user/index.html', {'user_form': UserForm(),'residents': residents,'mentors': mentors,'owners': owners})
    if request.method == 'POST':
        f = UserForm(request.POST, request.FILES)
        if request.POST['password'] != request.POST['password_1']:
            messages.error(request, 'Passwords are not the same')
            return HttpResponseRedirect('#')
        if f.is_valid():
            user = User()
            user.attendance = 0
            user.name = request.POST['name']
            user.surname = request.POST['surname']
            user.username = request.POST['username']
            bcr = BCryptSHA256PasswordHasher()
            hashed = bcr.encode(request.POST['password'], bcr.salt())
            user.password = hashed
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
        'birthday': birthday,
        'seen': Seen.objects.all()
    }
    return render(request, 'profile/index.html', context)

@csrf_exempt
def login_user(request):
    if request.method == 'POST':
        form = UserLogin(request.POST)
        if form.is_valid():
            if User.objects.filter(username=request.POST['username']).exists():
                user = User.objects.get(username=request.POST['username'])
                # print(user.password.encode('ascii').decode())
                # # print(bcrypt.checkpw(request.POST['password'].encode('utf-8').decode(), user.password))
                bcr = BCryptSHA256PasswordHasher()
                if bcr.verify(request.POST['password'], user.password) == True:
                    request.session['user'] = user.username
                    request.session.modified = True
                    print(request.session['user'])
                    return HttpResponseRedirect('/user/{}'.format(user.id))
                else:
                    messages.error(request, 'Incorrect password')
                    return HttpResponseRedirect('#')
            else:
                messages.error(request, 'User not found')
                return HttpResponseRedirect('#')
            return HttpResponseRedirect('#')
    if request.method == 'GET':
        return render(request, 'login-user/index.html', {'form': UserLogin()})

def home_user(request):
    return render(request, 'home-user/index.html')

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

@csrf_exempt
def recognised(request):
    if request.method == 'POST':
        name = json.dumps(request.POST['name'])
        time = json.dumps(request.POST['time'])
        print(request.POST)
        if User.objects.filter(surname=name).exists():
            user = User.objects.get(surname=name)
            seen = Seen()
            seen.name = '{} {}'.format(user.name, user.surname)
            seen.status = user.status
            seen.time = time
            print('{} {} has entered recently'.format(seen.name, seen.surname))
            seen.save()
            return HttpResponse(0)
    return HttpResponse(0)