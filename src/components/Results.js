import React from "react";
import ResultItem from "./ResultItem";
import ResultsContainerStyled from "./styles/ResultsContainerStyled";

const Results = ({totalResults, results}) => {
	const sortedArray = results.sort((a, b) => b.Year - a.Year);
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
				{Object.keys(sortedArray).map(key =>
					results[key].Poster === "N/A" ? (
						""
					) : (
						<ResultItem
							className="result-tile"
							key={key}
							result={results[key]}
						/>
					)
				)}
			</ResultsContainerStyled>
		</>
	);
};

export default Results;
