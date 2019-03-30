import requests
import time
import json
import bcrypt
import hashlib 
from django.contrib.auth.hashers import BCryptSHA256PasswordHasher

def sendRequest(name):
    URL = 'http://d6c7f838.ngrok.io/recognised'
    name = BCryptSHA256PasswordHasher().encode(name, BCryptSHA256PasswordHasher().salt())

    post_fields = json.dumps({'name': str(name), 'time':str(time.time()) })  
    requests.post(URL, data=post_fields)
