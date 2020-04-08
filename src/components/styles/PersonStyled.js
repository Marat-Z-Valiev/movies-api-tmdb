import styled from "styled-components";

const PersonStyled = styled.div`
	display: flex;
	flex-direction: row;

	.info {
		text-align: left;
		margin-left: 10px;
		padding-left: 15px;

		p {
			font-size: 1.2rem;
		}
	}

	.fas {
		margin-right: 10px;
	}
`;

export default PersonStyled;
