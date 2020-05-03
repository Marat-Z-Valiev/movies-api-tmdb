import React from "react";
import ResultItem from "../ResultItem/ResultItem";
import ResultsContainerStyled from "./ResultsContainerStyled";
import PropTypes from "prop-types";

const Results = ({totalResults, results}) => {
	const sortedArray = results
		.slice(0, results.length)
		.sort((a, b) =>
			a.release_date && b.release_date
				? b.release_date.split("-")[0] - a.release_date.split("-")[0]
				: ""
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
				{Object.keys(sortedArray).map((key) => (
					<ResultItem className="result-tile" key={key} result={results[key]} />
				))}
			</ResultsContainerStyled>
		</>
	);
};

Results.propTypes = {
	totalResults: PropTypes.number,
	results: PropTypes.array.isRequired,
};

export default Results;
