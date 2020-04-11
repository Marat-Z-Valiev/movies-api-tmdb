import React from "react";
import {Link} from "react-router-dom";
import Search from "./Search";
import NavStyled from "./styles/NavStyled";

const Navigation = () => {
	return (
		<NavStyled>
			<ul className="all-links">
				<li>
					<Link to={"/"}>
						<h1>Movies</h1>
					</Link>
				</li>
				<Link to={"/popular"}>
					<li>Popular</li>
				</Link>
				<Link to="./people">
					<li>People</li>
				</Link>
				<li className="search">
					<Search />
				</li>
			</ul>
		</NavStyled>
	);
};

export default Navigation;
