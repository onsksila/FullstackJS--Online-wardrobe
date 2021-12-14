import os

import flask_cors
from flask import Flask, flash, request, redirect, url_for, session, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
from PIL import Image
import base64
from io import BytesIO
import json

import logging
import numpy as np

from tensorflow import keras

from tensorflow.keras.preprocessing.image import load_img

from tensorflow.keras.applications.xception import preprocess_input

from Algomeasure import get_shoulder, get_ceinture_volume, get_max_dist_left_leg, get_max_dist_right_leg, \
    get_max_dist_right_hand, get_max_dist_left_hand

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')


app = Flask(__name__)

labels = {
    0: 'dress',
    1: 'hat',
    2: 'longsleeve',
    3: 'outwear',
    4: 'pants',
    5: 'shirt',
    6: 'shoes',
    7: 'shorts',
    8: 'skirt',
    9: 't-shirt'
}
#size of image
image_size = (299, 299)
#load model
model = keras.models.load_model('xception_v4_large_08_0.894.h5')

#dossier ciblé
UPLOAD_FOLDER = 'uploads'

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS = (['png', 'jpg', 'jpeg'])

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

#verification ext
def is_allowed_filename(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def hello_world():
    return 'hello'

@cross_origin()
@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        image = json.dumps(request.get_json())
        im = Image.open(BytesIO(base64.b64decode(image.split(',')[1])))
        img = load_img(im, target_size=(image_size))
        x = np.array(img)
        X = np.array([x])
        X = preprocess_input(X)
        pred = model.predict(X)
        print('eeeeeeeeeeeeeeeee', labels[pred[0].argmax()])
        return {"predictedVal":labels[pred[0].argmax()]}
    file = request.files['file']
    if file.filename == '':
        resp = jsonify({'message': 'No file selected for uploading'})
        resp.status_code = 400
        return resp
    if file and is_allowed_filename(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        path = UPLOAD_FOLDER + '/' + filename
        img = load_img(path, target_size=(image_size))
        resp = predict(img)
        resp.status_code = 201
        return resp
    else:
        resp = jsonify({'message': 'Allowed file types are png, jpg, jpeg'})
        resp.status_code = 400
        return resp

@cross_origin()
def predict(img_path):
    x = np.array(img_path)
    X = np.array([x])
    X = preprocess_input(X)
    pred = model.predict(X)
    return {"predictedVal":labels[pred[0].argmax()]}




def set_default(obj):
    if isinstance(obj, set):
        return list(obj)
    raise TypeError

@cross_origin()
@app.route("/api/get-body-measure", methods=["POST"])
def do_something():
    data = request.get_json()
    result = {}
    data['height']=int(data['height'])
    result['shoulder'] = round(get_shoulder(data['face'], data['height']), 2)
    result['volume'] = round(get_ceinture_volume(data['face'], data['profile'], data['height']))
    result['right_leg'] = round(get_max_dist_right_leg(data['face'], data['height']), 2)
    result['left_leg'] = round(get_max_dist_left_leg(data['face'], data['height']), 2)
    result['right_hand'] = round(get_max_dist_right_hand(data['face'], data['height']), 2)
    result['left_hand'] = round(get_max_dist_left_hand(data['face'], data['height']), 2)
    print(result)
    return json.loads(json.dumps(result, default=set_default))










"""
retour de val de prediction en local
@app.route('/predict')
@cross_origin()
def clothes_prediction():
    path = 'b.jpg'
    img = load_img(path, target_size=(image_size))
    x = np.array(img)
    X = np.array([x])
    X = preprocess_input(X)
    pred = model.predict(X)
    pred[0]
    pred[0].argmax()
    return labels[pred[0].argmax()]
"""



"""
upload de test sans condiction sur la validitation du fichier avec retour de val vers react
@cross_origin()
@app.route('/uploaad', methods=['POST'])
def upload():

    file = request.files['file']

    if file and is_allowed_filename(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        path = UPLOAD_FOLDER + '/' + filename
        img = load_img(path, target_size=(image_size))
        x = np.array(img)
        X = np.array([x])
        X = preprocess_input(X)
        pred = model.predict(X)
        print('eeeeeeeeeeeeeeeee',labels[pred[0].argmax()])
        return  {"predictedVal": labels[pred[0].argmax()]}

"""



if __name__ == '__main__':
    app.run()

flask_cors.CORS(app, expose_headers='Authorization')