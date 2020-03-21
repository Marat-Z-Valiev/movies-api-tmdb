import React from "react";
import ResultItemStyled from "./styles/ResultItemStyled";

const ResultItem = ({result}) => {
	const {Title, Year, Poster} = result;
	return (
		<ResultItemStyled className="result-tile">
			<h2>{Title}</h2>
			<h3>{Year}</h3>
			{Poster === "N/A" ? "" : <img src={Poster} alt={Title} />}
		</ResultItemStyled>
	);
};

export default ResultItem;
