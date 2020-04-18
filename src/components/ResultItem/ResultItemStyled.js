import styled from "styled-components";

const ResultItemStyled = styled.div`
	display: grid;
	justify-items: center;

	h2,
	h3 {
		text-align: center;
		margin: 0;
	}

	h3 {
		margin-bottom: 15px;
	}

	img {
		border: 2px solid black;
		justify-self: center;
		opacity: 1;
		transition: opacity 0.25s ease-in-out;

		&:hover {
			opacity: 0.7;
		}
	}
	}

	.no-image {
		width: 346px;
		height: 517px;
	}

	@media (min-width: 320px) and (max-width: 425px) {
		h3 {
			margin-bottom: 20px;
		}
		img {
			margin-bottom: 20px;
		}
	}
`;

export default ResultItemStyled;
