import styled from "styled-components";

const ButtonStyled = styled.button`
	display: inline-block;
	font-family: "Baloo Chettan 2", cursive;
	font-size: 1rem;
	padding: 0.3em;
	margin: 0 0.3em 0.3em 0;
	border-radius: 0.4em;
	box-sizing: border-box;
	font-weight: 400;
	color: #ffffff;
	background-color: #751aff;
	box-shadow: inset 0 -0.6em 1em -0.35em rgba(0, 0, 0, 0.17),
		inset 0 0.6em 2em -0.3em rgba(255, 255, 255, 0.15),
		inset 0 0 0em 0.05em rgba(255, 255, 255, 0.12);
	text-align: center;
	position: relative;

	&:hover {
		cursor: pointer;
	}

	:disabled {
		opacity: 0.5;
		cursor: no-drop;
	}
`;

export default ButtonStyled;
