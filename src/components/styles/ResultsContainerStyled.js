import styled from "styled-components";

const ResultsContainerStyled = styled.div`
	display: grid;
	justify-content: center;
	grid-template-columns: repeat(auto-fill, minmax(333px, 1fr));
	grid-gap: 40px 20px;
	padding: 30px;
	grid-template-rows: 1fr min-content;

	.result-tile:last-child {
		grid-column: 2;
	}

	@media (min-width: 320px) and (max-width: 425px) {
		display: block;
	}
`;

export default ResultsContainerStyled;
