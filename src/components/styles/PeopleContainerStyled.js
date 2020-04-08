import styled from "styled-components";

const PeopleContainerStyled = styled.div`
	display: grid;
	margin: 0 auto;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 20px;
	justify-content: center;
	justify-items: center;
	width: 80%;
	min-width: 500px;

	.person {
		text-align: center;
		padding: 0;
		border: 1px solid #ddd;

		img {
			width: 80%;
			padding: 20px;

			&:hover {
				box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
			}
		}
	}
`;

export default PeopleContainerStyled;
