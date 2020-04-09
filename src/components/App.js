import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Navigation from "./Navigation";
import Home from "./Home";
import Movie from "./Movie";
import Person from "./Person";
import ResultsPage from "./ResultsPage";
import {createGlobalStyle} from "styled-components";

const App = () => {
	const GlobalStyle = createGlobalStyle`
	body {
	font-family: "Baloo Chettan 2", cursive;
	background-color: #0c6cb4;
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
					<Route path="/movieId=:id" component={Movie} />
					<Route path="/personId=:id" component={Person} />
					<Route path="/search=:searchQuery" component={ResultsPage} />
				</Switch>
			</BrowserRouter>
		</>
	);
};

export default App;
