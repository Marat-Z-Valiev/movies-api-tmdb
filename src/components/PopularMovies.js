import React, {useState, useEffect} from "react";
import axios from "axios";
import Results from "./Results";
import Spinner from "./Spinner";

const PopularMovies = () => {
	let [popularMovies, setPopularMovies] = useState([]);
	let [isLoading, setIsLoading] = useState(true);

	const getPopular = async () => {
		await axios
			.get(
				`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
			)
			.then((response) => {
				setPopularMovies((popularMovies = response.data.results));
				setIsLoading((isLoading = false));
			})
			.catch((err) => console.log(`this is error ${err}`));
	};

	useEffect(() => {
		getPopular();
	}, []);

	return (
		<>
			{isLoading ? (
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
