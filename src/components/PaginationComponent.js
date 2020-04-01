import React from "react";
import Pagination from "react-js-pagination";
import {
	PaginationStyled,
	PaginationBlockStyled
} from "./styles/PaginationStyled";
import PropTypes from "prop-types";

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

PaginationComponent.propTypes = {
	currentPage: PropTypes.number.isRequired,
	resultsPerPage: PropTypes.number.isRequired,
	totalResults: PropTypes.number.isRequired,
	handlePageChange: PropTypes.func.isRequired
};

export default PaginationComponent;
