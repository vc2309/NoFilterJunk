from flask import Flask
import requests
app = Flask(__name__)

@app.route('/word/<words>')
def get_words(words):
	if words:
		print(words)



