import styled from "styled-components";

const PersonStyled = styled.div`
	display: flex;
	flex-direction: row;

	@media (min-width: 320px) and (max-width: 425px) {
		flex-direction: column;
	}

	img {
		margin-left: 40px;
	}

	.info {
		text-align: left;
		margin-left: 10px;
		padding-left: 15px;

		@media (min-width: 320px) and (max-width: 425px) {
			text-align: center;
		}

		p {
			font-size: 1.2rem;

			@media (min-width: 320px) and (max-width: 425px) {
				padding: 10px;
			}
		}
	}

	.fas {
		margin-right: 10px;
	}
`;

export default PersonStyled;
