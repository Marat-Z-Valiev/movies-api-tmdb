import React, {useState, useEffect} from "react";
import axios from "axios";
import PropTypes from "prop-types";
import PersonStyled from "./PersonStyled";
import Results from "../Results/Results";
import noImage from "../../images/no-image-available.jpg";
import Spinner from "../Spinner/Spinner";

const Person = ({match}) => {
	const personId = match.params.id;
	let [personInfo, setPersonInfo] = useState({});
	let [movieCredits, setMovieCredits] = useState([]);
	let [isLoading, setIsLoading] = useState(true);

	const getPersonInfo = async () => {
		await axios
			.get(
				`https://api.themoviedb.org/3/person/${personId}?api_key=${process.env.API_KEY}&language=en-US`
			)
			.then((response) => {
				setPersonInfo((personInfo = response.data));
				setIsLoading((isLoading = false));
			})
			.catch((err) => console.log(`this is error ${err}`));
	};

	const getMovieCreidts = async () => {
		axios
			.get(
				`https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=${process.env.API_KEY}&language=en-US`
			)
			.then((response) => {
				setMovieCredits((movieCredits = response.data.cast));
			})
			.catch((err) => console.log(`this is error ${err}`));
	};

	useEffect(() => {
		getPersonInfo();
	}, []);

	useEffect(() => {
		getMovieCreidts();
	}, []);

	const {profile_path, name, birthday, biography, gender} = personInfo;

	return (
		<>
			{isLoading ? (
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
									alt={name}
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