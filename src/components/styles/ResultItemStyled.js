import styled from "styled-components";

const ResultItemStyled = styled.div`
	display: grid;

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
