import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Results from "../Results/Results";
import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";
import {
	fetchPopularMovies,
	popularMoviesSelector,
} from "../../store/slices/popularMovies";

const PopularMovies = () => {
	const dispatch = useDispatch();
	const {loading, popularMovies, hasErrors} = useSelector(
		popularMoviesSelector
	);

	useEffect(() => {
		dispatch(fetchPopularMovies());
	}, [dispatch]);

	return (
		<>
			{hasErrors ? <Error /> : ""}
			{loading ? (
				<Spinner />
			) : (
				<>
					<h1 style={{textAlign: "center", color: "#ffffff"}}>
						Popular Movies
					</h1>
					<Results results={popularMovies} />
				</>
			)}
		</>
	);
};

export default PopularMovies;
