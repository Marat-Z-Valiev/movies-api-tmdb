import React, {useState, useEffect} from "react";
import axios from "axios";
import InputContainer from "./InputContainer";
import Results from "./Results";

const Home = () => {
	let [searchQuery, setSearchQuery] = useState("");
	let [results, setResults] = useState([]);
	let [totalResults, setTotalResults] = useState(0);
	let [isError, setIsError] = useState(false);
	let [isLoading, setIsLoading] = useState(false);
	let [isDisabled, setIsDisabled] = useState(true);
	let [selectedCategory, setSelectedCategory] = useState("movie");
	let [showPagination, setShowPagination] = useState(false);
	let [currentPage, setCurrentPage] = useState(1);
	const [resultsPerPage] = useState(10);

	// Handle onChange event on the input
	const handleChange = event => {
		const {value} = event.currentTarget;
		if (!value) {
			setIsDisabled((isDisabled = true));
			setIsLoading((isLoading = false));
		} else {
			setIsDisabled((isDisabled = false));
		}
		setSearchQuery((searchQuery = value));
	};

	const handleSelect = selectedOption => {
		setSelectedCategory((selectedCategory = selectedOption.value));
	};

	const getResults = async (searchQuery, currentPage) => {
		if (!searchQuery) {
			setIsLoading((isLoading = false));
			return;
		}
		await axios({
			url: `${baseUrl}${apiKey}&language=en-US&query=${searchQuery}&page=${currentPage}`,
			method: "get"
		})
			.then(response => {
				if (response.data.results.length) {
					setIsError((isError = false));
					setResults((results = response.data.results));
					setTotalResults((totalResults = response.data.total_results));
					setIsLoading((isLoading = false));
					setShowPagination((showPagination = true));
				} else {
					setIsError((isError = true));
					setIsLoading((isLoading = false));
					setShowPagination((showPagination = false));
				}
			})
			.catch(err => console.log(`this is error ${err}`));
	};

	const handleClick = () => {
		if (!searchQuery) {
			setIsLoading((isLoading = false));
			return;
		}
		setCurrentPage((currentPage = 1));
		getResults(searchQuery, currentPage);
		setIsLoading((isLoading = true));
	};

	const handlePageChange = pageNumber => {
		setCurrentPage((currentPage = pageNumber));
		getResults(searchQuery, pageNumber);
	};

	let [returnedResults, setResult] = useState([]);

	const fetchTrending = async () => {
		await axios
			.get(
				"https://api.themoviedb.org/3/trending/movie/week?api_key=f8efee7e451d2ca98ae50114ad74aeeb"
			)
			.then(response => {
				setResult((returnedResults = response.data.results));
			})
			.catch(err => console.log(`this is error ${err}`));
	};

	useEffect(() => {
		fetchTrending();
	}, []);

	return (
		<>
			<h1 style={{textAlign: "center", color: "#ffffff"}}>Movies API</h1>
			<InputContainer
				handleChange={handleChange}
				handleClick={handleClick}
				handleSelect={handleSelect}
				isLoading={isLoading}
				isDisabled={isDisabled}
			/>
			<Results results={returnedResults}></Results>
		</>
	);
};

export default Home;
