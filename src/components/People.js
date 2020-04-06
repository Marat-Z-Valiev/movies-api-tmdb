import React, {useState, useEffect} from "react";
import axios from "axios";
import Person from "./Person";
import PeopleContainerStyled from "./styles/PeopleContainerStyled";

const People = ({movieId}) => {
	let [actors, setActors] = useState([]);

	const getActors = async () => {
		await axios
			.get(
				`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=f8efee7e451d2ca98ae50114ad74aeeb`
			)
			.then(response => {
				setActors((actors = response.data.cast));
			})
			.catch(err => console.log(`this is error ${err}`));
	};

	useEffect(() => {
		getActors();
	}, []);

	return (
		<PeopleContainerStyled>
			{Object.keys(actors.slice(0, 6)).map(key => (
				<Person key={actors[key].id} actor={actors[key]} />
			))}
		</PeopleContainerStyled>
	);
};

export default People;
