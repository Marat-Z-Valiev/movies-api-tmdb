import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import MovieStyled from "./MovieStyled";
import PeopleContainer from "../PeopleContainer/PeopleContainer";
import Video from "../Video/Video";
import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";
import {fetchMovie, movieSelector} from "../../store/slices/movie";
import {fetchMovieCast, castSelector} from "../../store/slices/movieCast";

const MoviePage = ({match}: any) => {
	const movieId = match.params.id;
	const dispatch = useDispatch();
	const {loading, movie, hasErrors} = useSelector(movieSelector);
	const {cast} = useSelector(castSelector);
	useEffect(() => {
		dispatch(fetchMovie(movieId));
	}, [dispatch]);

	useEffect(() => {
		dispatch(fetchMovieCast(movieId));
	}, [dispatch]);

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
			{hasErrors ? <Error /> : ""}
			{loading ? (
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
					{cast.length ? (
						<>
							<h1 style={{textAlign: "center"}}>Cast</h1>
							<PeopleContainer people={cast.slice(0, 6)} isLoading={loading} />
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
