from django.shortcuts import render
from django.http import StreamingHttpResponse
from . import camera

def index(request):
<<<<<<< HEAD
    return render(request, 'login/index.html')

def list(request):
    return render(request, 'residents/list.html')
=======
    return render(request, 'login/index.html', {'camera': StreamingHttpResponse(camera.gen(camera.VideoCamera()))})
>>>>>>> 79cf8ae2fd1690cffb2bd402669371293af55470
