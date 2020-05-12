import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchPerson, personSelector} from "../../store/slices/person";
import {
	fetchMovieCredits,
	movieCreditsSelector,
} from "../../store/slices/movieCredits";
import PropTypes from "prop-types";
import PersonStyled from "./PersonStyled";
import Results from "../Results/Results";
import noImage from "../../images/no-image-available.jpg";
import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";

const Person = ({match}) => {
	const personId = match.params.id;
	const dispatch = useDispatch();
	const {loading, person, hasErrors} = useSelector(personSelector);
	const {movieCredits} = useSelector(movieCreditsSelector);

	useEffect(() => {
		dispatch(fetchPerson(personId));
	}, [dispatch]);

	useEffect(() => {
		dispatch(fetchMovieCredits(personId));
	}, [dispatch]);

	const {profile_path, name, birthday, biography, gender} = person;

	return (
		<>
			{hasErrors ? <Error /> : ""}
			{loading ? (
				<Spinner />
			) : (
				<>
					<h1 style={{textAlign: "center"}}>
						{gender === 1 ? "Actress" : "Actor"} page
					</h1>
					<PersonStyled>
						<div>
							{profile_path == null ? (
								<img
									className="no-image"
									src={noImage}
									alt="no image available"
								/>
							) : (
								<img
									src={`https://image.tmdb.org/t/p/w342/${profile_path}`}
									alt=""
								/>
							)}
						</div>
						<div className="info">
							<h2>{name}</h2>
							{birthday ? (
								<h2>
									<i
										style={{color: "#ffffff"}}
										className="fas fa-birthday-cake"
									></i>
									{birthday}
								</h2>
							) : (
								""
							)}
							<p>{biography}</p>
						</div>
					</PersonStyled>
					<h2 style={{textAlign: "center", fontSize: "1.8rem"}}>
						Cast In Movies
					</h2>
					<Results results={movieCredits.slice(0, 6)}></Results>
				</>
			)}
		</>
	);
};

Person.propTypes = {
	match: PropTypes.object.isRequired,
};

export default Person;
