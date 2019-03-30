import dlib
from skimage import io
from scipy.spatial import distance
import os
from PIL import Image
import pickle

def training():
    name = {}
    sp = dlib.shape_predictor('assets/shape_predictor_68_face_landmarks.dat')
    facerec = dlib.face_recognition_model_v1('assets/dlib_face_recognition_resnet_model_v1.dat')
    detector = dlib.get_frontal_face_detector()

    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    dataset = [x for x in os.listdir(BASE_DIR+'/dataset') if x.endswith('.jpg') or x.endswith('.png')]
    assert len(dataset) != 0, 'No data to train'

    for image in dataset:
        origin = io.imread(f'dataset/{image}')    
        dets = detector(origin, 1)
            
        for _, d in enumerate(dets):
            print("Detection")

        shape = sp(origin, d)
        face_descriptor = facerec.compute_face_descriptor(origin, shape)

        name.update({str(image):face_descriptor})

    return name


with open('data.pickle', 'wb') as handle:
    pickle.dump(training(), handle, protocol=pickle.HIGHEST_PROTOCOL)