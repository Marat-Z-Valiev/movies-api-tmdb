import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import ResultItemStyled from "./styles/ResultItemStyled";
import noImage from "../images/no-image-available.jpg";

const ResultItem = ({result}) => {
	const {id, vote_average, title, release_date, poster_path} = result;

	return (
		<ResultItemStyled>
			<h2>{vote_average == 0 ? "" : `Popularity ${vote_average} / 10`}</h2>
			<h2>{title}</h2>
			<h3>{release_date}</h3>
			<Link to={`/movieId=${id}`}>
				{poster_path === null ? (
					<img className="no-image" src={noImage} alt="no image available" />
				) : (
					<img
						src={`https://image.tmdb.org/t/p/w342/${poster_path}`}
						alt={title}
					/>
				)}
			</Link>
		</ResultItemStyled>
	);
};

ResultItem.propTypes = {
	result: PropTypes.object.isRequired
};

export default ResultItem;
