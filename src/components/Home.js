import React, {useState, useEffect} from "react";
import axios from "axios";
import Results from "./Results";

const Home = () => {
	let [returnedResults, setResult] = useState([]);

	const fetchTrending = async () => {
		await axios
			.get(
				"https://api.themoviedb.org/3/trending/movie/week?api_key=f8efee7e451d2ca98ae50114ad74aeeb"
			)
			.then(response => {
				setResult((returnedResults = response.data.results));
			})
			.catch(err => console.log(`this is error ${err}`));
	};

	useEffect(() => {
		fetchTrending();
	}, []);

	return (
		<>
			<h1 style={{textAlign: "center", color: "#ffffff"}}>Movies API</h1>
			<Results results={returnedResults}></Results>
		</>
	);
};

export default Home;
