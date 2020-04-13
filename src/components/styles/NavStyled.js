import styled from "styled-components";

const NavStyled = styled.nav`
	display: flex;
	background-color: #3f51b5;
	height: 60px;
	width: 100%;
	box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
		0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
	z-index: 5;

	.all-links {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100vw;

		h1 {
			font-size: 2.3rem;
		}

		li {
			list-style: none;
			font-size: 1.3rem;
		}
		a {
			text-decoration: none;
			color: #ffffff;

			&:hover {
				color: #11ee1c;
				text-decoration: underline;
			}
		}
		a.active {
			color: #11ee1c;
		}
	}
`;

export default NavStyled;
