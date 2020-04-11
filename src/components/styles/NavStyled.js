import styled from "styled-components";

const NavStyled = styled.nav`
	display: flex;
	background-color: #3f51b5;
	height: 60px;
	z-index: 200;
	width: 100%;

	.all-links {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100vw;

		* {
			color: #ffffff;
		}

		h1 {
			font-size: 2.3rem;
		}

		li {
			list-style: none;
			font-size: 1.3rem;
		}
		a {
			text-decoration: none;

			&:hover {
				color: #ffffff;
				text-decoration: underline;
			}
		}
	}
`;

export default NavStyled;
