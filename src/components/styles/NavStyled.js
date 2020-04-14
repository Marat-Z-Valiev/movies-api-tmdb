import styled from "styled-components";

const NavStyled = styled.nav`
	.menu {
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: #3f51b5;
		width: 100vw;
		height: 60px;
		width: 100%;
		box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
			0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
		z-index: 5;
		margin-top: 0;

		.toggle {
			display: none;
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
			color: #ffffff;

			&:hover {
				color: #11ee1c;
				text-decoration: underline;
			}
		}
		a.active {
			color: #11ee1c;
		}

		@media (min-width: 320px) and (max-width: 425px) {
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
			width: 100%;
			z-index: 5;
			height: 115px;
			box-shadow: none;

			.logo {
				margin-left: 20px;
			}

			.toggle {
				display: block;
				order: 1;

				button {
					background: transparent;
					border: none;
					color: #ffffff;
					margin-right: 20px;
				}
			}

			.item,
			.search {
				/* display: none; */
				width: 100%;
				text-align: center;
				order: 2;
				padding: 15px 5px;
				transform: translateX(-100%);
				transition: transform 0.5s ease-out;
				background-color: #3f51b5;
			}
			.open {
				display: block;
				transform: translateY(0);
			}
		}
	}
`;

export default NavStyled;
