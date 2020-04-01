import React from "react";
import ResultItem from "./ResultItem";
import ResultsContainerStyled from "./styles/ResultsContainerStyled";
import PropTypes from "prop-types";

const Results = ({totalResults, results}) => {
	// const modifiedReleaseDate = results.map(result => {
	// 	result.release_date.split("-")[0];
	// });
	const sortedArray = results.sort(
		(a, b) => b.release_date.split("-")[0] - a.release_date.split("-")[0]
	);
	return (
		<>
			{totalResults ? (
				<p style={{textAlign: "center", color: "#ffffff", fontSize: "1.5rem"}}>
					Total results is {totalResults}
				</p>
			) : (
				""
			)}
			<ResultsContainerStyled>
				{Object.keys(sortedArray).map(key => (
					<ResultItem className="result-tile" key={key} result={results[key]} />
				))}
			</ResultsContainerStyled>
		</>
	);
};

Results.propTypes = {
	totalResults: PropTypes.number,
	results: PropTypes.array.isRequired
};

export default Results;
