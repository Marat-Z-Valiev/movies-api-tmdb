import React, { useState } from "react";
import axios from "axios";
import InputContainer from "./InputContainer";
import Results from "./Results";
import PaginationComponent from "./PaginationComponent";

const baseUrl = "https://movie-database-imdb-alternative.p.rapidapi.com";

class App extends React.Component {

	state = {
		searchQuery: "",
		results: [],
		totalResults: "",
		isError: false,
		errorMessage: "",
		isLoading: false,
		isDisabled: true,
		selectedCategory: "movie",
		showPagination: false,
		currentPage: 1,
		resultsPerPage: 10
	};

	// Handle onChange event on the input
	handleChange = event => {
		const { value } = event.currentTarget;
		if (!value) {
			this.setState({ isDisabled: true, isLoading: false });
		} else {
			this.setState({ isDisabled: false });
		}
		this.setState({ searchQuery: value });
	};

	handleSelect = selectedOption => {
		this.setState({
			selectedCategory: selectedOption.value
		});
	};

	async getResults(searchQuery, currentPage) {
		const { selectedCategory } = this.state;
		if (!searchQuery) {
			this.setState({ isLoading: false });
			return;
		}
		await axios({
			url: `${baseUrl}/?page=${currentPage}&r=json&type=${selectedCategory}&s=${searchQuery}`,
			method: "get",
			headers: {
				"x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
				"x-rapidapi-key": "a63832b8aamsh7a85645505609ddp1be412jsn1bc17d796591"
			}
		})
			.then(response => {
				if (response.data.Search) {
					this.setState({
						isError: false,
						results: response.data.Search,
						totalResults: response.data.totalResults,
						isLoading: false,
						showPagination: true
					});
				} else {
					this.setState({
						isError: true,
						errorMessage: response.data.Error,
						isLoading: false,
						showPagination: false
					});
				}
			})
			.catch(err => console.log(`this is error ${err}`));
	}

	handleClick = () => {
		const { searchQuery, currentPage: activePage } = this.state;
		if (!searchQuery) {
			this.setState({ isLoading: false });
			return;
		}
		this.getResults(searchQuery, activePage);
		this.setState({ isLoading: true });
	};

	handlePageChange = pageNumber => {
		this.setState({ currentPage: pageNumber });
		const { searchQuery } = this.state;
		this.getResults(searchQuery, pageNumber);
	};

	render() {
		const {
			results,
			currentPage,
			totalResults,
			isLoading,
			isDisabled,
			isError,
			errorMessage,
			showPagination,
			resultsPerPage
		} = this.state;
		return (
			<>
				<InputContainer
					handleChange={this.handleChange}
					handleClick={this.handleClick}
					handleSelect={this.handleSelect}
					isLoading={isLoading}
					isDisabled={isDisabled}
				/>
				{totalResults ? <h3>Total results is {totalResults}</h3> : ""}
				{showPagination ? (
					<PaginationComponent
						currentPage={currentPage}
						handlePageChange={this.handlePageChange}
						resultsPerPage={resultsPerPage}
						totalResults={totalResults}
					/>
				) : (
						""
					)}
				{isError ? <p>{errorMessage}</p> : <Results results={results} />}
			</>
		);
	}
}

export default App;
