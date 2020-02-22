import numpy as np
import pandas as pd
import sklearn
import pickle
from pandas import Series, DataFrame
from sklearn import preprocessing
from sklearn.linear_model import LogisticRegression
from sklearn.cross_validation import train_test_split
from sklearn import metrics 
from sklearn.metrics import classification_report
from flask import Flask
from flask_cors import CORS, cross_origin
from flask import Flask, render_template, request, jsonify
import json
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
@cross_origin()
def hello_world():
    return 'Hello from Flask!'
@app.route('/process', methods=['POST','GET'])
@cross_origin()
def process():
    print(request.data)
    
    Pregnancies = int(request.form['Pregnancies'])
    Glucose = int(request.form['Glucose'])
    BloodPressure = int(request.form['BloodPressure'])
    SkinThickness = int(request.form['SkinThickness'])
    Insulin = int(request.form['Insulin'])
    BMI = float(request.form['BMI'])
    Dpf = float(request.form['Dpf'])
    Age = int(request.form['Age'])
    filename = 'finalized_model.sav'
    loaded_model = pickle.load(open(filename, 'rb'))
    result = loaded_model.predict([[Pregnancies,Glucose,BloodPressure,SkinThickness,Insulin,BMI,Dpf,Age]])
    res=str(result[0])
    return jsonify('{"Outcome": '+res+'}')
if __name__ == '__main__':
    app.debug=True
    app.run(host = '0.0.0.0',port=5000)
