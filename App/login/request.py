from flask import Flask, request

app = Flask(__name__)

@app.route('/recognise', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        print(request.data)
    return "HI MARK"

@app.route('/')
def home():
    return "Hello World!"

if __name__ == '__main__':
    app.run()