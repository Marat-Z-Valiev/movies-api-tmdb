import React, {useEffect} from "react";
import {Link, NavLink} from "react-router-dom";
import Search from "./Search";
import NavStyled from "./styles/NavStyled";

const Navigation = () => {
	useEffect(() => {
		document.getElementById("app").style.marginTop = `${
			document.querySelector(".menu").offsetHeight + 40
		}px`;
	}, []);

	const stickyStyle = {
		position: "fixed",
		top: "0",
		left: "auto",
		right: "0",
		width: "100%",
	};

	const toggleMenu = () => {
		const liElements = document.querySelectorAll(".item");
		liElements.forEach((element) => {
			element.classList.toggle("open");
		});
		const search = document.querySelector(".search");
		search.classList.toggle("open");
	};

	const closeMenu = () => {
		document.querySelector(".hamburger-button").click();
	};

	const closeMenuAfterClick = () => {
		const liElements = document.querySelectorAll(".item");
		liElements.forEach((element) => {
			element.addEventListener("click", closeMenu);
		});
	};

	useEffect(() => {
		closeMenuAfterClick();
	}, []);

	return (
		<NavStyled>
			<ul className="menu" style={stickyStyle}>
				<li className="logo">
					<Link to={"/"}>
						<h1>Movies</h1>
					</Link>
				</li>
				<li className="item">
					<NavLink to={"/popular"}>Popular</NavLink>
				</li>
				<li className="item">
					<NavLink to="./people">People</NavLink>
				</li>
				<li className="search">
					<Search closeMenu={closeMenu} />
				</li>
				<li className="toggle">
					<button
						type="button"
						className="hamburger-button"
						onClick={toggleMenu}
					>
						<i className="fas fa-bars fa-3x"></i>
					</button>
				</li>
			</ul>
		</NavStyled>
	);
};

export default Navigation;
