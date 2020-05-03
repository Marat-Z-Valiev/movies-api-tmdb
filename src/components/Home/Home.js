import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
	fetchMovies,
	trendingMoviesSelector,
} from "../../store/slices/trendingMovies";
import Results from "../Results/Results";
import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";

const Home = () => {
	const dispatch = useDispatch();
	const {loading, trendingMovies, hasErrors} = useSelector(
		trendingMoviesSelector
	);
	useEffect(() => {
		dispatch(fetchMovies());
	}, [dispatch]);

	return (
		<>
			{hasErrors ? <Error /> : ""}
			{loading ? <Spinner /> : <Results results={trendingMovies} />}
		</>
	);
};

export default Home;
