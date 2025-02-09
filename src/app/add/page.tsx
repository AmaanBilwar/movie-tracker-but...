'use client'
import React, { useState } from 'react';

const Page = () => {
  const [movies, setMovies] = useState([]);

  function viewAllMovies() {
    fetch('http://localhost:5000/get_movies', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Fetched movies:', data);
        setMovies(data.data); // Assuming the backend returns { data: [...] }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function addMovie() {
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
        console.log('Movie added successfully:', data);
        // Optionally, you can call viewAllMovies() here to refresh the list after adding a movie
        viewAllMovies();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <>
      <div>
        <h1>Add a movie on this Page</h1>
        <form action="post">
          <label>Movie Name</label>
          <input type="text" name="movie-name" />
          <label>Movie Year</label>
          <input type="text" name="movie-year" />
          <label>Movie Description</label>
          <input type="text" name="movie-description" />
        </form>
        <button type='button' onClick={addMovie}>Add</button>
        <button type='button' onClick={viewAllMovies}>View All Movies</button>
        <div id="movies-list">
          {movies.length > 0 ? (
            <ul>
              {movies.map((movie) => (
                <li key={movie.id}>
                  {movie.movie_name} ({movie.movie_year}) - {movie.movie_description}
                </li>
              ))}
            </ul>
          ) : (
            <p>No movies found</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Page;
