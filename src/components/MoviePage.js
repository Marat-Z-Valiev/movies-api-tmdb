import React, {useState, useEffect} from "react";
import axios from "axios";
import PropTypes from "prop-types";
import MovieStyled from "./styles/MovieStyled";
import PeopleContainer from "./PeopleContainer";
import Video from "./Video";
import Spinner from "./Spinner";

const MoviePage = ({match}) => {
	const movieId = match.params.id;
	let [movie, setMovie] = useState({});
	let [people, setPeople] = useState([]);
	let [isLoading, setIsLoading] = useState(true);

	const getMovie = async () => {
		await axios
			.get(
				`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}&language=en-US`
			)
			.then((response) => {
				setMovie((movie = response.data));
				setIsLoading((isLoading = false));
			})
			.catch((err) => console.log(`this is error ${err}`));
	};

	const getActors = async () => {
		await axios
			.get(
				`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.API_KEY}`
			)
			.then((response) => {
				setPeople((people = response.data.cast));
				setIsLoading((isLoading = false));
			})
			.catch((err) => console.log(`this is error ${err}`));
	};

	useEffect(() => {
		getMovie();
	}, []);

	useEffect(() => {
		getActors();
	}, []);

	const {
		title,
		poster_path,
		vote_average,
		release_date,
		runtime,
		overview,
	} = movie;

	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				<>
					<h1 style={{textAlign: "center"}}>{title}</h1>
					<MovieStyled>
						<img
							src={`https://image.tmdb.org/t/p/w342/${poster_path}`}
							alt={title}
						/>
						<div className="movie-details">
							<div className="movie-stats">
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
							</div>
							<div className="overview">
								<p>{overview}</p>
							</div>
						</div>
					</MovieStyled>
					{people.length ? (
						<>
							<h1 style={{textAlign: "center"}}>Cast</h1>
							<PeopleContainer
								people={people.slice(0, 6)}
								isLoading={isLoading}
							/>
						</>
					) : (
						""
					)}
					<Video movieId={movieId}></Video>
				</>
			)}
		</>
	);
};

MoviePage.propTypes = {
	match: PropTypes.object.isRequired,
};

export default MoviePage;
