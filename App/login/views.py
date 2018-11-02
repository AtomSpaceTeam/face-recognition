from django.shortcuts import render
from django.http import StreamingHttpResponse
# from . import camera
import cv2
vc = cv2.VideoCapture(0)

def video_feed():
    """Video streaming route. Put this in the src attribute of an img tag."""
    return StreamingHttpResponse(gen(), content_type='multipart/x-mixed-replace; boundary=frame')

def gen():
    """Video streaming generator function."""
    while True:
        rval, frame = vc.read()
        cv2.imwrite('t.jpg', frame)
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + open('t.jpg', 'rb').read() + b'\r\n')

def index(request):
    return render(request, 'login/index.html', {'camera': video_feed()})