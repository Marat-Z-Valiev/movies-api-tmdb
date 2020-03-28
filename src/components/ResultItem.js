import React from "react";
import ResultItemStyled from "./styles/ResultItemStyled";
import PropTypes from "prop-types";

const ResultItem = ({result}) => {
	const {Title, Year, Poster} = result;
	return (
		<ResultItemStyled>
			<h2>{Title}</h2>
			<h3>{Year}</h3>
			{Poster === "N/A" ? "" : <img src={Poster} alt={Title} />}
		</ResultItemStyled>
	);
};

ResultItem.propTypes = {
	result: PropTypes.object.isRequired
};

export default ResultItem;
