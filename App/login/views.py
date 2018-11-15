from django.shortcuts import render, HttpResponseRedirect
# import datetime
import os
from django.http import StreamingHttpResponse
from .models import Resident
from .forms import ResidentForm

# from . import camera

def index(request):
    if request.method == 'POST':
        form = ResidentForm(request.POST, request.FILES)
        print(request.FILES)
        if form.is_valid():
            post = Resident()
            post.name = request.POST['name']
            post.surname = request.POST['surname']
            post.age = request.POST['age']
            os.makedirs('residents/{}'.format(post.surname))
            post.save()
            return HttpResponseRedirect('/residents/')
        # print(request.POST['name'])
    else:
        return render(request, 'login/index.html', {'form': ResidentForm()})

def list(request):
    residents_list = Resident.objects.all()
    return render(request, 'residents/list.html', {'list': residents_list})
