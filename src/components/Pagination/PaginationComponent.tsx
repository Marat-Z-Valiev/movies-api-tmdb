import React from "react";
import Pagination from "react-js-pagination";
import {PaginationStyled, PaginationBlockStyled} from "./PaginationStyled";
import PropTypes from "prop-types";

interface PaginationProps {
	currentPage: number;
	resultsPerPage: number;
	totalResults: any;
	handlePageChange: any;
}

const PaginationComponent: React.FC<PaginationProps> = ({
	currentPage,
	resultsPerPage,
	totalResults,
	handlePageChange,
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
	totalResults: PropTypes.string.isRequired,
	handlePageChange: PropTypes.func.isRequired,
};

export default PaginationComponent;
