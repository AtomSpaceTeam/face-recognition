from django.shortcuts import render

def index(request):
    return render(request, 'login/index.html')

def list(request):
    return render(request, 'residents/list.html')
