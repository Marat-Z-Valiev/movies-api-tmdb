import React, {useEffect} from "react";
import {Link, NavLink} from "react-router-dom";
import Search from "./Search";
import NavStyled from "./styles/NavStyled";

const Navigation = () => {
	useEffect(() => {
		document.getElementById("app").style.marginTop = `${document.querySelector(
			".navbar"
		).offsetHeight + 40}px`;
	}, []);

	const stickyStyle = {
		position: "fixed",
		top: "0",
		left: "auto",
		right: "0",
		width: "100%"
	};

	return (
		<NavStyled className="navbar" style={stickyStyle}>
			<ul className="all-links">
				<Link to={"/"}>
					<li>
						<h1>Movies</h1>
					</li>
				</Link>
				<NavLink to={"/popular"}>
					<li>Popular</li>
				</NavLink>
				<NavLink to="./people">
					<li>People</li>
				</NavLink>
				<li className="search">
					<Search />
				</li>
			</ul>
		</NavStyled>
	);
};

export default Navigation;
