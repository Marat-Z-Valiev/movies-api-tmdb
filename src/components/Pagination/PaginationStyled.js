import styled from "styled-components";

export const PaginationBlockStyled = styled.div`
	display: flex;
	justify-content: center;

	@media (min-width: 320px) and (max-width: 425px) {
		font-size: 0.5rem;
	}
`;

export const PaginationStyled = styled.div`
	.pagination {
		display: flex;
		flex-direction: row;
		border-color: #ddd;
		border-radius: 8px;
		background-color: #ffffff;
		padding-left: 0;
	}

	li {
		list-style: none;
		margin: 0;
	}

	.pagination li.active {
		background-color: #4285f4;
		color: white;
	}

	.pagination li:hover:not(.active) {
		background-color: #ddd;
	}

	.pagination a {
		color: #00000b;
		font-size: 1.2rem;
		float: left;
		padding: 8px 16px;
		text-decoration: none;
	}
`;
