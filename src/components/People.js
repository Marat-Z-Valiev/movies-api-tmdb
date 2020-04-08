import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import GridLoader from "react-spinners/GridLoader";
import PeopleContainerStyled from "./styles/PeopleContainerStyled";
import noImage from "../images/no-image-available.jpg";

const SpinnerStyled = styled.div`
	div:nth-child(1) {
		margin: 0 auto;
	}
`;

const People = ({movieId}) => {
	let [people, setPeople] = useState([]);
	let [isLoading, setIsLoading] = useState(true);

	const getActors = async () => {
		await axios
			.get(
				`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=f8efee7e451d2ca98ae50114ad74aeeb`
			)
			.then(response => {
				setPeople((people = response.data.cast));
				setIsLoading((isLoading = false));
			})
			.catch(err => console.log(`this is error ${err}`));
	};

	useEffect(() => {
		getActors();
	}, []);

	return (
		<>
			{isLoading ? (
				<SpinnerStyled>
					<GridLoader />
				</SpinnerStyled>
			) : (
				<PeopleContainerStyled>
					{Object.keys(people.slice(0, 6)).map(key => (
						<div key={people[key].id} className="person">
							<Link to={`/personId=${people[key].id}`}>
								{people[key].profile_path == null ? (
									<img
										className="no-image"
										src={noImage}
										alt="no image available"
									/>
								) : (
									<img
										src={`https://image.tmdb.org/t/p/w342/${people[key].profile_path}`}
										alt={people[key].name}
									/>
								)}
							</Link>
							<h2>{people[key].name}</h2>
						</div>
					))}
				</PeopleContainerStyled>
			)}
		</>
	);
};

export default People;
