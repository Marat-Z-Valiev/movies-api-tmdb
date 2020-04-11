import React, {useState, useEffect} from "react";
import axios from "axios";
import PersonStyled from "./styles/PersonStyled";
import Results from "./Results";
import noImage from "../images/no-image-available.jpg";
import Spinner from "./Spinner";

const Person = ({match}) => {
	const personId = match.params.id;
	let [personInfo, setPersonInfo] = useState({});
	let [movieCredits, setMovieCredits] = useState([]);
	let [isLoading, setIsLoading] = useState(true);

	const getPersonInfo = async () => {
		await axios
			.get(
				`https://api.themoviedb.org/3/person/${personId}?api_key=f8efee7e451d2ca98ae50114ad74aeeb&language=en-US`
			)
			.then(response => {
				setPersonInfo((personInfo = response.data));
				setIsLoading((isLoading = false));
			})
			.catch(err => console.log(`this is error ${err}`));
	};

	const getMovieCreidts = async () => {
		axios
			.get(
				`https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=f8efee7e451d2ca98ae50114ad74aeeb&language=en-US`
			)
			.then(response => {
				setMovieCredits((movieCredits = response.data.cast));
			})
			.catch(err => console.log(`this is error ${err}`));
	};

	useEffect(() => {
		getPersonInfo();
	}, []);

	useEffect(() => {
		getMovieCreidts();
	}, []);

	const {profile_path, name, birthday, biography} = personInfo;

	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				<>
					<h1 style={{textAlign: "center"}}>Person page</h1>
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
					<Results results={movieCredits.slice(0, 6)}></Results>
				</>
			)}
		</>
	);
};

export default Person;
