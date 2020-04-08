import styled from "styled-components";

const MovieStyled = styled.div`
	display: grid;
	grid-template-columns: 30% 70%;

	img {
		margin-left: 35px;
	}

	.movie-details {
		display: grid;
		grid-template-columns: repeat(3, 33%);
		grid-template-rows: 30% 70%;

		h2 {
			text-align: center;
		}

		.far,
		.fas {
			margin-right: 10px;
		}
	}
	.overview {
		grid-column-start: 1;
		grid-column-end: 4;
		justify-self: center;
		font-size: 1.5rem;
	}
`;

export default MovieStyled;
