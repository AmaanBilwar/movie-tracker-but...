'use client'
import React from 'react'

const page = () => {

    function viewAllMovies(){
        fetch('http://localhost:5000/get_movies', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    function addMovie(){
        const movieName = (document.querySelector('input[name="movie-name"]') as HTMLInputElement).value;
        const movieYear = (document.querySelector('input[name="movie-year"]') as HTMLInputElement).value;
        const movieDescription = (document.querySelector('input[name="movie-description"]') as HTMLInputElement).value;


        fetch('http://localhost:5000/add_movie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ movieName: movieName, movieYear: movieYear, movieDescription: movieDescription }), // Ensure keys match backend expectations
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

  return (
    <>
      <div>
          add a movie on this Page
      </div>
      <form action="post">
        <label>movie name</label>
        <input type="text" name="movie-name" />
        <label>movie year</label>
        <input type="text" name="movie-year" />
        <label>movie description</label>
        <input type="text" name="movie-description" />
      </form>
      <button type='submit' onClick={addMovie}>Add</button>
      <button type='submit' onClick={viewAllMovies}>View All movies</button>
    </>
  )
}

export default page
