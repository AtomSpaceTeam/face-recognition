from django.shortcuts import render, HttpResponseRedirect
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout as django_logout
# import datetime
import os
from .models import User
from .forms import UserForm

@login_required
def index(request):
    # if request.method == 'POST':
    #     resident_form = ResidentForm(request.POST, request.FILES)
    #     mentor_form = MentorForm(request.POST, request.FILES)
    #     owner_form = OwnerForm(request.POST, request.FILES)
    #     print(request.FILES)
    #     if resident_form.is_valid():
    #         post = Resident()
    #         post.name = request.POST['name']
    #         post.surname = request.POST['surname']
    #         post.age = request.POST['age']
    #         post.photo_1 = request.FILES['photo_1']
    #         post.photo_2 = request.FILES['photo_2']
    #         post.photo_3 = request.FILES['photo_3']
    #         post.photo_4 = request.FILES['photo_4']
    #         post.photo_5 = request.FILES['photo_5']
    #         settings.MEDIA_ROOT = os.path.join(settings.BASE_DIR, f'media/residents/{post.name} {post.surname}')
    #         post.save()
    #         return HttpResponseRedirect('/residents/')
    #     if mentor_form.is_valid():
    #         post = Mentor()
    #         post.name = request.POST['name']
    #         post.surname = request.POST['surname']
    #         post.age = request.POST['age']
    #         post.photo_1 = request.FILES['photo_1']
    #         post.photo_2 = request.FILES['photo_2']
    #         post.photo_3 = request.FILES['photo_3']
    #         post.photo_4 = request.FILES['photo_4']
    #         post.photo_5 = request.FILES['photo_5']
    #         settings.MEDIA_ROOT = os.path.join(settings.BASE_DIR, f'media/mentors/{post.name} {post.surname}')
    #         post.save()
    #         return HttpResponseRedirect('/mentors/')
    #     if owner_form.is_valid():
    #         post = Owner()
    #         post.name = request.POST['name']
    #         post.surname = request.POST['surname']
    #         post.age = request.POST['age']
    #         post.photo_1 = request.FILES['photo_1']
    #         post.photo_2 = request.FILES['photo_2']
    #         post.photo_3 = request.FILES['photo_3']
    #         post.photo_4 = request.FILES['photo_4']
    #         post.photo_5 = request.FILES['photo_5']
    #         settings.MEDIA_ROOT = os.path.join(settings.BASE_DIR, f'media/owners/{post.name} {post.surname}')
    #         post.save()
    #         return HttpResponseRedirect('/owners/')
        return render(request, 'home/index.html')

def test(request):
    if request.method == 'GET':
        return render(request, 'test/index.html', {'form_resident': ResidentForm()})
    if request.method == 'POST':
        f = ResidentForm(request.POST, request.FILES)
        if f.is_valid():
            resident = Resident()
            resident.name = request.POST['name']
            resident.surname = request.POST['surname']
            resident.age = request.POST['age']
            resident.photo_1 = request.FILES['photo_1']
            resident.photo_2 = request.FILES['photo_2']
            resident.photo_3 = request.FILES['photo_3']
            resident.photo_4 = request.FILES['photo_4']
            resident.photo_5 = request.FILES['photo_5']
            settings.MEDIA_ROOT = os.path.join(settings.BASE_DIR, f'media/residents/{resident.name} {resident.surname}')
            resident.save()
            settings.MEDIA_ROOT = os.path.join(settings.BASE_DIR, 'media')
        return HttpResponseRedirect('/test')

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
            settings.MEDIA_ROOT = os.path.join(settings.BASE_DIR, f'media/{user.status}s/{user.name} {user.surname}')
            user.save()
            settings.MEDIA_ROOT = os.path.join(settings.BASE_DIR, 'media')
        return HttpResponseRedirect(f'/{user.status}s')

@login_required
def logout(request):
    django_logout(request)
    return  HttpResponseRedirect('/login')