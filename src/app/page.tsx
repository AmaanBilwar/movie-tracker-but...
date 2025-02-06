'use client'
import React, { useEffect, useState } from 'react';
import { Input, Button } from "@chakra-ui/react";

interface Movie {
  id: number;
  title: string;
}

const api_link = "http://www.localhost:5000";

const Page = () => {
  const [movies, setMovies] = useState<Movie[]>([]);



  useEffect(() => {
    fetch(`${api_link}/get_movies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setMovies(data);
        
      })
      .catch((err) => {
        console.log("Fetch error:", err);
        
      });
  }, []);

  return (
    <>
      <div>
        <h1>
          {movies.map((movie) => (
            <div key={movie.id}>{movie.title}</div>
          ))}
        </h1>
        <h1 className="text-4xl text-center">
          welcome to Amaan's movie tracker
        </h1>
        <div className="flex font-sans justify-center my-4">
          <Input className="w-1/4 text-center" placeholder="search for a movie..."/>
          <Button className="p-2 shadow-none hover:shadow-lg" variant='surface'>Search</Button>
        </div>
      </div>
    </>
  );
};

export default Page;
