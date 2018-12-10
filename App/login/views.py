from django.shortcuts import render, HttpResponseRedirect
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout as django_logout
import os, shutil
from .models import User
from .forms import UserForm, EditForm

@login_required
def index(request):
        residents = User.objects.filter(status='resident').count()
        mentors = User.objects.filter(status='mentor').count()
        owners = User.objects.filter(status='owner').count()
        return render(request, 'home/index.html', {'residents': residents,'mentors': mentors,'owners': owners})

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
def online_camera(request):
    return render(request, 'camera/index.html')

@login_required
def create_user(request):
    if request.method == 'GET':
        return render(request, 'create_user/index.html', {'user_form': UserForm()})
    if request.method == 'POST':
        f = UserForm(request.POST, request.FILES)
        if f.is_valid():
            user = User()
            user.name = request.POST['name']
            user.surname = request.POST['surname']
            user.age = request.POST['age']
            user.status = request.POST['status']
            user.photo_1 = request.FILES['photo_1']
            user.photo_2 = request.FILES['photo_2']
            user.photo_3 = request.FILES['photo_3']
            user.photo_4 = request.FILES['photo_4']
            user.photo_5 = request.FILES['photo_5']
            user.profile_photo = request.FILES['profile_photo']
            settings.MEDIA_ROOT = os.path.join(settings.BASE_DIR, 'media/{}s/{} {}'.format(user.status, user.name, user.surname))
            user.save()
            settings.MEDIA_ROOT = os.path.join(settings.BASE_DIR, 'media')
        return HttpResponseRedirect('/{}s'.format(user.status))

@login_required
def user_profile(request, pk):
    profile = User.objects.get(id=pk)
    profile_photo = 'http://localhost:8000/media/{}s/{}%20{}/{}'.format(profile.status, profile.name, profile.surname, profile.profile_photo)
    return render(request, 'profile/index.html', {'profile': profile, 'photo': profile_photo})

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
            os.rename(
                '{}/{}s/{} {}'.format(settings.MEDIA_ROOT, p[0].status, p[0].name, p[0].surname),
                '{}/{}s/{} {}'.format(settings.MEDIA_ROOT, p[0].status, request.POST['name'], request.POST['surname'])
            )
            p.update(
                name = request.POST['name'],
                surname = request.POST['surname'],
                age = request.POST['age'],
                status = request.POST['status']
            )
            return HttpResponseRedirect('/')
    
    if request.method == 'GET':
        context = {
            'edit_form': UserForm()
        }
        return render(request, 'edit/index.html', context)

@login_required
def delete_profile(request, pk):
    p = User.objects.get(id=pk)
    shutil.rmtree('{}/{}s/{} {}'.format(settings.MEDIA_ROOT, p.status, p.name, p.surname), ignore_errors=True)
    p.delete()
    return HttpResponseRedirect('/')