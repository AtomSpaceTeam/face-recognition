import os
import json
import shutil
import calendar
import datetime
import bcrypt
import requests

from django.conf import settings
from django.contrib.auth import logout as django_logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import HttpResponseRedirect, render
from django.http import  HttpResponse, JsonResponse
from django.core import serializers
from django.contrib import messages
from django.contrib.auth.hashers import BCryptSHA256PasswordHasher
from django import forms

from .forms import EditForm, UserForm, UserLogin, EventForm, EditEventForm, GuestForm
from .models import User, Seen, Event, Guest
from .loginUserDecorator import decorator

@csrf_exempt
def login_user_api(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        if User.objects.filter(username=data['username']).exists():
            user = User.objects.get(username=data['username'])
            bcr = BCryptSHA256PasswordHasher()
            if bcr.verify(data['password'], user.password) == True:
                hashed = bcr.encode(data['password'], bcr.salt())
                user_object = serializers.serialize('json', User.objects.filter(username=data['username']))
                if user.superuser == 1:
                    return JsonResponse({
                        'status': 200,
                        'user_id': 'admin-{}'.format(hashed),
                        'user': user_object
                    })
                else:
                    return JsonResponse({
                        'status': 200,
                        'user_id': 'user-{}'.format(hashed),
                        'user': user_object
                    })
            else:
                return JsonResponse({
                    'status': 412,
                    'message': 'Password not match'
                })
        else:
            return JsonResponse({
                'status': 412,
                'message': 'User not found'
            })
        # return JsonResponse({
        #     'status': 200,
        #     'user': user
        # })

def calculate_age(born):
    today = datetime.date.today()
    return today.year - born.year - ((today.month, today.day) < (born.month, born.day))


@login_required
def index(request):
    context = {
        'residents': User.objects.filter(status='resident').count(),
        'mentors': User.objects.filter(status='mentor').count(),
        'owners': User.objects.filter(status='owner').count(),
        'checker': Seen.objects.all(),
        'last_seen': Seen.objects.latest('id')
    }
    return render(request, 'home-admin/index.html', context)

@csrf_exempt
def api_attendance(request):
    data = json.loads(request.body.decode('utf-8'))
    if data['status'] == 'user':
        team_users = json.loads(serializers.serialize('json', User.objects.filter(team=data['team'])))
        team_names = []
        for i in team_users:
            team_names.append(f"{i['fields']['name']} {i['fields']['surname']}")
        users = json.loads(serializers.serialize("json", Seen.objects.all()))
        all_users = [x['fields']['name'] for x in users]
        once_users = list(dict.fromkeys(all_users))
        new_arr = []
        for i in team_names:
            if i in once_users:
                new_arr.append(i)
        obj = {}
        for i in new_arr:
            obj.update({f'{i}': all_users.count(i)})
        return JsonResponse(obj)
    else:
        users = json.loads(serializers.serialize("json", Seen.objects.all()))
        all_users = [x['fields']['name'].split(' ')[1] for x in users]
        once_users = list(dict.fromkeys(all_users))
        obj = {}
        for i in once_users:
            obj.update({f'{i}': all_users.count(i)})
        return JsonResponse(obj)

@csrf_exempt
def count(request):
    teams = json.loads(serializers.serialize("json", User.objects.all(), fields='team'))
    arr = [x['fields']['team'] for x in teams]
    count_teams = len(list(dict.fromkeys(arr)))
    projects = json.loads(serializers.serialize('json', User.objects.all(), fields='project'))
    arr_1 = [x['fields']['project'] for x in projects]
    count_projects = len(list(dict.fromkeys(arr_1)))
    count_residents = User.objects.filter(status='resident').count()
    count_mentors = User.objects.filter(status='mentor').count()
    return JsonResponse({
        'teams': count_teams,
        'projects': count_projects,
        'residents': count_residents,
        'mentors': count_mentors
    })

@csrf_exempt
def user_info(request):
    req = json.loads(request.body.decode('utf-8'))
    user = serializers.serialize('json', User.objects.filter(name=req['name']))
    return HttpResponse(user)

@csrf_exempt
def users(request):
    users = serializers.serialize('json', User.objects.all(), fields=('name', 'surname', 'status', 'team', 'project'))
    return HttpResponse(users)

@csrf_exempt
def events(request):
    events = serializers.serialize('json', Event.objects.all())
    return HttpResponse(events)

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


def event(request, pk):
    event = Event.objects.get(id=pk)
    guests = Guest.objects.filter(event_id=event.id)
    context = {
        'event': event,
        'guests': guests
    }
    return render(request, 'event/index.html', context)

def edit_event(request, pk):
    if request.method == 'GET':
        context = {
            'form': EditEventForm()
        }
        return render(request, 'edit-event/index.html', context)
    if request.method == 'POST':
        f = EditEventForm(request.POST)
        if f.is_valid():
            event = Event.objects.filter(id=pk)
            arr = request.POST['description'].split("\r\n")
            event.update(
                name = request.POST['name'],
                description = ' '.join(arr),
                organizer = request.POST['organizer'],
                start_time = datetime.datetime.strptime('{} {}'.format(request.POST['start_date'], request.POST['start_time']), '%Y-%m-%d %H:%M'),
                end_time = datetime.datetime.strptime('{} {}'.format(request.POST['end_date'], request.POST['end_time']), '%Y-%m-%d %H:%M')
            )
            return HttpResponseRedirect('/events')

def delete_event(request, pk):
    event = Event.objects.get(id=pk)
    event.delete()
    return HttpResponseRedirect('/events')

@login_required
def create_guest(request):
    if request.method == 'GET':
        context = {
            'form': GuestForm()
        }
        return render(request, 'create_guest/index.html', context)
    if request.method == 'POST':
        f = GuestForm(request.POST, request.FILES)
        if f.is_valid():
            guest = Guest()
            guest.name = request.POST['name']
            guest.surname = request.POST['surname']
            guest.email = request.POST['email']
            event_id = Event.objects.get(name=request.POST['event']).id
            guest.event_id = event_id
            guest.photo = request.FILES['photo']
            guest.save()
            return HttpResponseRedirect('/event/{}'.format(guest.event_id))

@login_required
def list_events(request):
    events = Event.objects.all()
    context = {
        'events': events
    }
    return render(request, 'events/index.html', context)

@login_required
def create_event(request):
    if request.method == 'POST':
        form = EventForm(request.POST)
        if form.is_valid():
            start1 = request.POST['start_date']
            start2 = request.POST['start_time']
            end1 = request.POST['end_date']
            end2 = request.POST['end_time']
            event = Event()
            event.name = request.POST['name']
            arr = request.POST['description'].split("\r\n")
            event.description = ' '.join(arr)
            event.organizer = request.POST['organizer']
            event.start_time = datetime.datetime.strptime('{} {}'.format(start1, start2), '%Y-%m-%d %H:%M')
            event.end_time = datetime.datetime.strptime('{} {}'.format(end1, end2), '%Y-%m-%d %H:%M')
            event.save()
            return HttpResponseRedirect('/events')

    if request.method == 'GET':
        residents = User.objects.filter(status='resident').count()
        mentors = User.objects.filter(status='mentor').count()
        owners = User.objects.filter(status='owner').count()
        form = EventForm()
        return render(request, 'create_event/index.html', {'residents': residents,'mentors': mentors,'owners': owners, 'form': form})

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
            user.superuser = 0
            user.name = request.POST['name']
            user.surname = request.POST['surname']
            user.username = request.POST['username']
            bcr = BCryptSHA256PasswordHasher()
            hashed = bcr.encode(request.POST['password'], bcr.salt())
            user.password = hashed
            user.status = request.POST['status']
            date = datetime.datetime.strptime(request.POST['date'], '%Y-%m-%d')
            user.birth_date = date
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
            date = datetime.datetime.strptime(request.POST['date'], '%Y-%m-%d')
            p.update(
                name = request.POST['name'],
                surname = request.POST['surname'],
                age = request.POST['age'],
                status = request.POST['status'],
                birth_date = date,
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
    if os.path.isfile('{}/{}'.format(settings.MEDIA_ROOT, p.profile_photo)):
        os.remove('{}/{}'.format(settings.MEDIA_ROOT, p.profile_photo))
    p.delete()
    return HttpResponseRedirect('/')

@csrf_exempt
def recognised(request):
    if request.method == 'POST':
        obj = json.loads(request.body.decode('utf-8'))
        name = obj['name']
        time = obj['time']
        users = User.objects.values('surname')
        for user in users:
            if BCryptSHA256PasswordHasher().verify(user['surname'], name):
                if name == Seen.name:
                    pass
                else:
                    user = User.objects.get(surname=user['surname'])
                    seen = SeenToday()
                    seen.name = '{} {}'.format(user.name,user.surname)
                    seen.status = user.status
                    seen.time = time
                    seen.save()
                    print('saved!')
                    return HttpResponse('Saved!')
            else:
                print(False)
        # try:
        #     if User.objects.filter(surname=name).exists():
        #         user = User.objects.get(surname=name)
        #         seen = Seen()
        #         seen.name = '{} {}'.format(user.name, user.surname)
        #         seen.status = user.status
        #         seen.time = time
        #         print('{} {} has entered recently'.format(user.name, user.surname))
        #         seen.save()
        #         return HttpResponse('I feel good')
        # except:
        #     return HttpResponse('All is not so good')
    return HttpResponse('All is not so good')

def telegram_login(request):
    print(request.POST)
    if User.objects.filter(username = request.POST['username']).exists():
        request.session['user'] = request.POST['username']
        request.session.modified = True
        print(request.session['user'])
        return HttpResponseRedirect('/users')
    else:
        messages.error(request, 'User not found')
        return HttpResponseRedirect('/login-user')

def UpdateBase(request):
    delay = 86400
    seenall = Seen()
    while True:
        time.sleep(delay)
        thread = threading.Thread(target=UpdateBase)
        for name in SeenToday():
            seenall.name = Seen.name
            seenall.status = Seen.status
            seenall.time = Seen.time
            seenall.save()
        thread.start()
