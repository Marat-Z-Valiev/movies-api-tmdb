import React, {useState, useEffect} from "react";
import axios from "axios";
import PeopleContainer from "./PeopleContainer";
import Spinner from "./Spinner";

const PeoplePage = () => {
	let [popularPeople, setPopularPeople] = useState([]);
	let [isLoading, setIsLoading] = useState(true);

	const getPopularPeople = async () => {
		await axios
			.get(
				"https://api.themoviedb.org/3/person/popular?api_key=f8efee7e451d2ca98ae50114ad74aeeb&language=en-US&page=1"
			)
			.then((response) => {
				setPopularPeople((popularPeople = response.data.results));
				setIsLoading((isLoading = false));
			})
			.catch((err) => console.log(`this is error ${err}`));
	};

	useEffect(() => {
		getPopularPeople();
	}, []);

	return (
		<>
			<h1 style={{textAlign: "center", color: "#ffffff"}}>People</h1>
			{isLoading ? <Spinner /> : <PeopleContainer people={popularPeople} />}
		</>
	);
};

export default PeoplePage;
