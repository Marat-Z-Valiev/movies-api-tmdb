import React from "react";
import axios from "axios";
// import ParcelLogo from "../img/parcel-logo.svg";

class Header extends React.Component {
	getData() {
		fetch(
			"https://movie-database-imdb-alternative.p.rapidapi.com/?page=1&r=json&s=Avengers%20Endgame",
			{
				method: "GET",
				headers: {
					"x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
					"x-rapidapi-key": "a63832b8aamsh7a85645505609ddp1be412jsn1bc17d796591"
				}
			}
		)
			.then(response => {
				console.log(response);
			})
			.catch(err => {
				console.log(err);
			});
	}
	render() {
		return (
			<header>
				<nav className="navbar" role="navigation" aria-label="main navigation">
					<div className="navbar-brand">
						<a className="navbar-item" href="/">
							<p>This is text</p>
							{/* <img width="120" src={ParcelLogo} alt="" /> */}
						</a>
					</div>
				</nav>
				<button type="button" onClick={this.getData}>
					Click Here
				</button>
			</header>
		);
	}
}

export default Header;
