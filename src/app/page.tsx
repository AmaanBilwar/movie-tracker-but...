'use client'
import React, { useState } from 'react';
import { Input, Button } from "@chakra-ui/react";
import { auth, currentUser } from '@clerk/nextjs/server'
 
interface Movie {
  id: string;
  movie_name: string;
  movie_year: string;
  movie_description: string;
}

const Page = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [watchlist, setWatchlist] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);

  function addToWatchlist(){

    fetch('http://localhost:5000/add_to_watchlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ watchlist: watchlist }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Search results:', data);
        setMovies(data.data); // Assuming the backend returns { data: [...] }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  
  }


  function searchFunction(e: React.FormEvent) {
    e.preventDefault();
    console.log('searching for movie...', searchTerm);

    fetch('http://localhost:5000/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ searchTerm: searchTerm }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Search results:', data);
        setMovies(data.data); // Assuming the backend returns { data: [...] }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <>
      <div>
        <h1 className="text-4xl text-center">
          welcome to Amaan's movie tracker
        </h1>
        <div className="flex font-sans justify-center my-4">
          <form onSubmit={searchFunction}>
            <Input
              className="w-1/4 text-center"
              name='searchTerm'
              placeholder="search for a movie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              type='submit'
              className="p-2 shadow-none hover:shadow-lg"
              variant='surface'
            >
              Search
            </Button>
            <Button>
              <a href="http://localhost:3000/add">add a movie</a>
            </Button>
          </form>
        </div>
        <div>
          {movies.length > 0 ? (
            <ul>
              {movies.map((movie) => (
                <li key={movie.id}>
                  {movie.movie_name} ({movie.movie_year}) description: {movie.movie_description}
                  <button onClick={addToWatchlist}>add to watch list</button>
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
};

export default Page;
