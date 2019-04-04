from imutils.video import VideoStream
from imutils import face_utils
import datetime
import argparse
import imutils
import time
import dlib
import cv2
from scipy.spatial import distance
import pickle
from data_request import sendRequest
import requests

ap = argparse.ArgumentParser()
ap.add_argument("-r", "--picamera", type=int, default=-1,
	help="whether or not the Raspberry Pi camera should be used")
args = vars(ap.parse_args())

try: 
    with open('data.pickle', 'rb') as handle:
        data = pickle.load(handle)
except FileNotFoundError:
    print('Data.pickle file is missing')

dataKeys = data.keys()

def realTimeCamera():
    print("[INFO] loading facial landmark predictor...")
    detector = dlib.get_frontal_face_detector()
    predictor = dlib.shape_predictor('assets/shape_predictor_68_face_landmarks.dat')
    facerec = dlib.face_recognition_model_v1('assets/dlib_face_recognition_resnet_model_v1.dat')

    print("[INFO] camera sensor warming up...")
    vs = VideoStream(usePiCamera=args["picamera"] > 0).start()
    time.sleep(2.0)

    while True:
        frame = vs.read()
        frame = imutils.resize(frame, width=800)
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        rects = detector(gray, 0)
        
        for rect in rects:
            shape = predictor(gray, rect)

            face_descriptor = facerec.compute_face_descriptor(frame, shape)
            for name in dataKeys:
                answer = distance.euclidean(face_descriptor, data[name])
                if answer < 0.499:
                    a = name.split('.')[0]
                    try:
                        sendRequest(a)
                        time.sleep(0.5)
                    except requests.exceptions.HTTPError as httpErr: 
                        print ("Http Error:",httpErr) 
                    except requests.exceptions.ConnectionError as connErr: 
                        print ("Error Connecting:",connErr) 
                    except requests.exceptions.Timeout as timeOutErr: 
                        print (f'Timeout Error:{timeOutErr} Server is busy. Please, check URL or trн again') 
                    except requests.exceptions.RequestException as reqErr: 
                        print ("Something Else:",reqErr) 

            shape = face_utils.shape_to_np(shape)
            
            for (x, y) in shape:
                cv2.circle(frame, (x, y), 1, (0, 0, 255), -1)
        
        cv2.imshow("Frame", frame)
        key = cv2.waitKey(1) & 0xFF
    
        # if the `q` key was pressed, break from the loop
        if key == ord("q"):
            print('Bye bye')
            break

    cv2.destroyAllWindows()
    vs.stop()

realTimeCamera()