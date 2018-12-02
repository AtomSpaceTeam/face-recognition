from django.shortcuts import render, HttpResponseRedirect
from django.conf import settings
from django.contrib.auth.decorators import login_required
# import datetime
import os
from django.http import StreamingHttpResponse
from .models import Resident, Mentor, Owner
from .forms import ResidentForm, MentorForm, OwnerForm

@login_required
def index(request):
    if request.method == 'POST':
        resident_form = ResidentForm(request.POST, request.FILES)
        mentor_form = MentorForm(request.POST, request.FILES)
        owner_form = OwnerForm(request.POST, request.FILES)
        print(request.FILES)
        if resident_form.is_valid():
            post = Resident()
            post.name = request.POST['name']
            post.surname = request.POST['surname']
            post.age = request.POST['age']
            os.makedirs(f'residents/{post.surname}')
            post.save()
            return HttpResponseRedirect('/residents/')
        if mentor_form.is_valid():
            post = Mentor()
            post.name = request.POST['name']
            post.surname = request.POST['surname']
            post.age = request.POST['age']
            os.makedirs(f'mentors/{post.surname}')
            post.save()
            return HttpResponseRedirect('/mentors/')
        if owner_form.is_valid():
            post = Owner()
            post.name = request.POST['name']
            post.surname = request.POST['surname']
            post.age = request.POST['age']
            os.makedirs(f'owners/{post.surname}')
            post.save()
            return HttpResponseRedirect('/mentors/')
        # print(request.POST['name'])
    else:
        return render(request, 'home/index.html', {'form_resident': ResidentForm(), 'form_mentor': MentorForm(), 'form_owner': OwnerForm()})

@login_required
def list_residents(request):
    residents_list = Resident.objects.all()
    return render(request, 'residents/list-residents.html', {'list_residents': residents_list})

@login_required
def list_mentors(request):
    mentors_list = Mentor.objects.all()
    return render(request, 'mentors/list-mentors.html', {'list_mentors': mentors_list})

@login_required
def list_owners(request):
    owners_list = Owner.objects.all()
    return render(request, 'owners/list-owners.html', {'list_owners': owners_list})

@login_required
def online_camera(request):
    return render(request, 'camera/online-camera.html')
