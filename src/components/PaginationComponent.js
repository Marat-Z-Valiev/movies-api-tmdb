import React from "react";
import Pagination from "react-js-pagination";
import {
	PaginationStyled,
	PaginationBlockStyled
} from "./styles/PaginationStyled";

const PaginationComponent = ({
	currentPage,
	resultsPerPage,
	totalResults,
	handlePageChange
}) => {
	let windowWidth = window.innerWidth;
	return (
		<PaginationBlockStyled>
			<PaginationStyled>
				<Pagination
					activeClass="active"
					pageRangeDisplayed={windowWidth > 425 ? 10 : 5}
					activePage={currentPage}
					itemsCountPerPage={resultsPerPage}
					totalItemsCount={parseInt(totalResults)}
					onChange={handlePageChange}
				/>
			</PaginationStyled>
		</PaginationBlockStyled>
	);
};

export default PaginationComponent;
