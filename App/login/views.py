from django.shortcuts import render
from django.http import StreamingHttpResponse
from .forms import ResidentForm

# from . import camera

def index(request):
    return render(request, 'login/index.html', {'form': ResidentForm()})

def list(request):
    return render(request, 'residents/list.html')
