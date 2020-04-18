import styled from "styled-components";

const MovieStyled = styled.div`
	display: grid;
	grid-template-columns: 30% 70%;

	@media (min-width: 768px) and (max-width: 1024px) {
		grid-template-columns: 1fr;
	}

	@media (min-width: 320px) and (max-width: 425px) {
		grid-template-columns: 1fr;
		justify-content: center;
	}

	img {
		margin-left: 35px;

		@media (min-width: 768px) and (max-width: 1024px) {
			margin: 0 auto;
		}
	}

	.movie-stats {
		display: flex;
		justify-content: space-around;

		@media (min-width: 768px) and (max-width: 1024px) {
			margin-top: 30px;
		}

		@media (min-width: 320px) and (max-width: 425px) {
			flex-direction: column;
			margin-top: 30px;
		}
	}

	@media (min-width: 320px) and (max-width: 425px) {
		grid-template-columns: 1fr;
	}

	h2 {
		text-align: center;
	}

	.far,
	.fas {
		margin-right: 10px;
	}
	.overview {
		grid-column-start: 1;
		grid-column-end: 4;
		justify-self: center;
		font-size: 1.5rem;

		@media (min-width: 768px) and (max-width: 1024px) {
			padding: 20px;
		}

		@media (min-width: 320px) and (max-width: 425px) {
			padding: 20px;
			text-align: center;
		}
	}
`;

export default MovieStyled;
