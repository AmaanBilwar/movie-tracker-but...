from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import os
from dotenv import load_dotenv
load_dotenv()

DATABASE_NAME = os.environ.get('DATABASE_NAME')
HOST=os.environ.get('HOST')
USER=os.environ.get('USER')
PASSWORD=os.environ.get('PASSWORD')
PORT=os.environ.get('PORT')


conn = psycopg2.connect(
    database=DATABASE_NAME,
    host=HOST,
    user=USER,
    password=PASSWORD,
    port=PORT,
)


cursor = conn.cursor()
print('Connected to the database')

app = Flask(__name__)
CORS(app)


@app.route('/', methods=['GET','POST'])
def index():
    return jsonify({'data': 'go to `/api` route to use the api'})


@app.route('/get_movies', methods=['GET'])
def get_movies():
    cursor.execute('SELECT * FROM movies')
    movies = cursor.fetchall()
    return jsonify({'data': movies})    
    

if __name__ == '__main__':
    app.run(debug=True)