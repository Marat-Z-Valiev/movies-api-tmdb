import React, {useState, useEffect} from "react";
import axios from "axios";
import MovieStyled from "./styles/MovieStyled";
import People from "./People";

const Movie = ({match}) => {
	const movieId = match.params.id;
	let [movie, setMovie] = useState({});

	const getMovie = async () => {
		await axios
			.get(
				`https://api.themoviedb.org/3/movie/${movieId}?api_key=f8efee7e451d2ca98ae50114ad74aeeb&language=en-US`
			)
			.then(response => {
				setMovie((movie = response.data));
			})
			.catch(err => console.log(`this is error ${err}`));
	};

	useEffect(() => {
		getMovie();
	}, []);

	const {
		title,
		poster_path,
		vote_average,
		release_date,
		runtime,
		overview
	} = movie;

	return (
		<>
			<h1 style={{textAlign: "center"}}>{title}</h1>
			<MovieStyled>
				<img
					src={`https://image.tmdb.org/t/p/w342/${poster_path}`}
					alt={title}
				/>
				<div className="movie-details">
					<h2>
						<i className="far fa-calendar-alt fa-lg" />
						{release_date}
					</h2>
					<h2>
						<i className="fas fa-star fa-lg" />
						{vote_average == 0 ? "" : `Popularity ${vote_average} / 10`}
					</h2>
					<h2>
						<i className="far fa-clock fa-lg" />
						{runtime} mins
					</h2>
					<div className="overview">
						<p>{overview}</p>
					</div>
				</div>
			</MovieStyled>
			<h2 style={{textAlign: "center"}}>Cast</h2>
			<People movieId={movieId}></People>
		</>
	);
};

export default Movie;
