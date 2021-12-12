from flask import Flask
import RPi.GPIO as GPIO
import json

app = Flask(__name__)
GPIO.setmode(GPIO.BCM)
PIN_NUMBER = 18
GPIO.setwarnings(False)
GPIO.setup(PIN_NUMBER, GPIO.OUT)


@app.route("/toggle")
def toggle():
    try:
        if GPIO.input(PIN_NUMBER) == GPIO.HIGH:
            GPIO.output(PIN_NUMBER, False)
        else:
            GPIO.output(PIN_NUMBER, True)
        return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}
    except Exception as ex:
        print(ex)
        return json.dumps({'success': False}), 400, {'ContentType': 'application/json'}


@app.route("/status")
def status():
    try:
        if GPIO.input(PIN_NUMBER) == GPIO.HIGH:
            return json.dumps({'on': True}), 200, {'ContentType': 'application/json'}
        else:
            return json.dumps({'on': False}), 200, {'ContentType': 'application/json'}
    except Exception as ex:
        print(ex)
        return json.dumps({'success': False}), 400, {'ContentType': 'application/json'}


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
