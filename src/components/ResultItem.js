import React from "react";
import ResultItemStyled from "./styles/ResultItemStyled";
import PropTypes from "prop-types";

const ResultItem = ({result}) => {
	const {vote_average, poster_path, original_title, release_date} = result;
	return (
		<ResultItemStyled>
			<h2>{vote_average == 0 ? "" : `Popularity ${vote_average} / 10`}</h2>
			<h2>{original_title}</h2>
			<h3>{release_date.split("-")[0]}</h3>
			{poster_path === null ? (
				<img src="../images/no-image-available.jpg" alt="no image available" />
			) : (
				<img
					src={`https://image.tmdb.org/t/p/w342/${poster_path}`}
					alt={original_title}
				/>
			)}
		</ResultItemStyled>
	);
};

ResultItem.propTypes = {
	result: PropTypes.object.isRequired
};

export default ResultItem;
