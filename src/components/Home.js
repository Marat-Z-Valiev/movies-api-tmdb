import React, {useState, useEffect} from "react";
import axios from "axios";
import Results from "./Results";
import Spinner from "./Spinner";

const Home = () => {
	let [returnedResults, setResult] = useState([]);
	let [isLoading, setIsLoading] = useState(true);

	const fetchTrending = async () => {
		await axios
			.get(
				"https://api.themoviedb.org/3/trending/movie/week?api_key=f8efee7e451d2ca98ae50114ad74aeeb"
			)
			.then(response => {
				setResult((returnedResults = response.data.results));
				setIsLoading((isLoading = false));
			})
			.catch(err => console.log(`this is error ${err}`));
	};

	useEffect(() => {
		fetchTrending();
	}, []);

	return <>{isLoading ? <Spinner /> : <Results results={returnedResults} />}</>;
};

export default Home;
