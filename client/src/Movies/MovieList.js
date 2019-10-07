import React, { useState, useEffect, componentDidMount } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Movie from './Movie';

const MovieList = props => {
  const [movies, setMovies] = useState([])
  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies')
        .then(response => {
          setMovies(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    
    getMovies();
  }, []);
  
  return (
    <div className="movie-list">
      <p>lol</p> 
       {movies.length > 0 && movies.map(movie => (
        <MovieDetails key={movie.id} movies={movie} />
       ))}} 
    </div> 
  );
}

function MovieDetails(props) {
 // const { title, director, metascore, stars } = movie;
  return (
    <Link to={`movies/${props.movies["id"]}`}>
    <div className="movie-card">
      <h2>{props.movies["title"]}</h2>
      <div className="movie-director">
        Director: <em>{props.movies["director"]}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{props.movies["metascore"]}</strong>
      </div>
      <h3>Actors</h3>

      {props.movies["stars"].map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
    </div>
    </Link>
  );
}

export default MovieList;
