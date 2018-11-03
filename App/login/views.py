from django.shortcuts import render
from django.http import StreamingHttpResponse

def index(request):
    return render(request, 'login/index.html')

def list(request):
    return render(request, 'residents/list.html')
