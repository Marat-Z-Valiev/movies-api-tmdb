import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Navigation from "./Navigation/Navigation";
import Home from "./Home/Home";
import MoviePage from "./MoviePage/MoviePage";
import Person from "./Person/Person";
import ResultsPage from "./ResultsPage/ResultsPage";
import PopularMovies from "./PopularMovies/PopularMovies";
import PeoplePage from "./PeoplePage/PeoplePage";
import {createGlobalStyle} from "styled-components";

const App = () => {
	const GlobalStyle = createGlobalStyle`
	body {
	font-family: "Baloo Chettan 2", cursive;
	background-color: #0c6cb4;
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	}

	.error-message{
		text-align: center;
		color: #ffffff;
		font-size: 1.3rem;
	}
	`;

	return (
		<>
			<GlobalStyle />
			<BrowserRouter>
				<Navigation></Navigation>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/movieId=:id" component={MoviePage} />
					<Route path="/personId=:id" component={Person} />
					<Route path="/search=:searchQuery" component={ResultsPage} />
					<Route path="/popular" component={PopularMovies}></Route>
					<Route path="/people" component={PeoplePage}></Route>
				</Switch>
			</BrowserRouter>
		</>
	);
};

export default App;
