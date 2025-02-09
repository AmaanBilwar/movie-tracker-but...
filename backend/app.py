from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
load_dotenv()
import os
import pymongo

MONGODB_CONNECTION_STRING = os.getenv('MONGODB_CONNECTION_STRING')

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins

@app.route('/', methods=['GET','POST'])
def index():
    return jsonify({'data': 'go to `/api` route to use the api'})

@app.route('/search', methods=['POST'])
def find_movie():
    my_client = pymongo.MongoClient(MONGODB_CONNECTION_STRING)
    my_db = my_client['test']
    my_col = my_db['movies']
    movie_search_term = request.json['searchTerm']
    movies = my_col.find({'movie_name': {'$regex': movie_search_term}})
    if movies: 
        movie_list = [{'id': str(movie['_id']), 'movie_name': movie['movie_name'], 'movie_year': movie['movie_year'], 'movie_description': movie['movie_description']} for movie in movies]
        return jsonify({'data': movie_list})


@app.route('/add_movie', methods=['POST'])
def add_movies():
    my_client = pymongo.MongoClient(MONGODB_CONNECTION_STRING)
    my_db = my_client['test']
    my_col = my_db['movies']
    movie_name = request.json['movieName']
    movie_year = request.json['movieYear']
    movie_description = request.json['movieDescription']

    movie = {
        'movie_name': movie_name,
        'movie_year': movie_year,
        'movie_description': movie_description
    }
    result = my_col.insert_one(movie)
    if result.inserted_id:
        return jsonify({'message': 'Movie added successfully', 'id': str(result.inserted_id)})
    else:
        return jsonify({'message': 'Failed to add movie'}), 500

@app.route('/add_to_watchlist', methods=['POST'])
def add_to_watchlist():
    pass

@app.route('/get_movies', methods=['GET'])
def get_movies():
    my_client = pymongo.MongoClient(MONGODB_CONNECTION_STRING)
    my_db = my_client['test']
    my_col = my_db['movies']
    movies = my_col.find()
    movie_list = [{'id': str(movie['_id']), 'movie_name': movie['movie_name'], 'movie_year': movie['movie_year'], 'movie_description': movie.get('movie_description', '')} for movie in movies]
    return jsonify({'data': movie_list})

if __name__ == '__main__':
    app.run(debug=True)