import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const initialState = {
	trendingMovies: [],
	loading: false,
	hasErrors: false,
};

const trendingMoviesSlice = createSlice({
	name: "trendingMovies",
	initialState,
	reducers: {
		getTrendingMovies: (state) => {
			state.loading = true;
		},
		getTrendingMoviesSuccess: (state, {payload}) => {
			state.trendingMovies = payload;
			state.loading = false;
			state.hasErrors = false;
		},
		getTrendingMoviesFailure: (state) => {
			state.loading = false;
			state.hasErrors = true;
		},
	},
});

export const {
	getTrendingMovies,
	getTrendingMoviesSuccess,
	getTrendingMoviesFailure,
} = trendingMoviesSlice.actions;

export const trendingMoviesSelector = (state) => state.trendingMovies;
export const selectIsLoading = (state) => state.trendingMovies.loading;
export const selectError = (state) => state.trendingMovies.hasErrors;
export default trendingMoviesSlice.reducer;

export function fetchMovies() {
	return async (dispatch) => {
		dispatch(getTrendingMovies());
		await axios
			.get(
				`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.API_KEY}`
			)
			.then((response) => {
				dispatch(getTrendingMoviesSuccess(response.data.results));
			})
			.catch(() => dispatch(getTrendingMoviesFailure()));
	};
}
