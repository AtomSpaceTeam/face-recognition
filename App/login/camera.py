import cv2
from django.http import StreamingHttpResponse

class VideoCamera(object):
	def __init__(self):
		self.video = cv2.VideoCapture(0)
		(self.grabbed, self.frame) = self.video.read()

	def __del__(self):
		self.video.release()

	def get_frame(self):
		image = self.frame
		ret, jpeg = cv2.imencode('.jpg', image)
		return jpeg.tobytes()

	def update(self):
		while True:
			(self.grabbed, self.frame) = self.video.read()

def gen(camera):
	while True:
		frame = camera.get_frame()
		yield(b'--frame\r\n'
        b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')


# import numpy as np
# import cv2
# from django.http import StreamingHttpResponse

# cap = cv2.VideoCapture(0)

# def get_video():
# 	while(True):
# 		# Capture frame-by-frame
# 		_, frame = cap.read()
# 		return cv2.imshow('video', frame)