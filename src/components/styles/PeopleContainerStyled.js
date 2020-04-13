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
		display: grid;
		text-align: center;
		padding: 0;
		border: 1px solid #ddd;
		max-width: 80%;
		background-color: #ffffff;
		border-radius: 15px;
		opacity: 1;
		transition: opacity 0.25s ease-in-out;

		&:hover {
			opacity: 0.7;
		}

		img {
			margin: 0;
			width: 100%;
			border-radius: 15px 15px 0 0;
		}
		.name {
			padding: 0;
			align-self: flex-end;
		}
	}
`;

export default PeopleContainerStyled;
