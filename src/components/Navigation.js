import React from "react";
import {Link} from "react-router-dom";
import Search from "./Search";

const Navigation = () => {
	return (
		<nav>
			<h1 style={{textAlign: "center", color: "#ffffff"}}>Movies API</h1>
			<ul>
				<Link to={"/"}>
					<li>Home</li>
				</Link>
				<li>People</li>
				<li>Trending</li>
				<li>
					<Search />
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
