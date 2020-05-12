import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const initialState = {
	popularMovies: [],
	loading: false,
	hasErrors: false,
};

const popularMoviesSlice = createSlice({
	name: "popularMovies",
	initialState,
	reducers: {
		getPopularMovies: (state) => {
			state.loading = true;
		},
		getPopularMoviesSuccess: (state, {payload}) => {
			state.popularMovies = payload;
			state.loading = false;
			state.hasErrors = false;
		},
		getPopularMoviesFailure: (state) => {
			state.loading = false;
			state.hasErrors = true;
		},
	},
});

export const {
	getPopularMovies,
	getPopularMoviesSuccess,
	getPopularMoviesFailure,
} = popularMoviesSlice.actions;

export const popularMoviesSelector = (state) => state.popularMovies;
export const selectIsLoading = (state) => state.popularMovies.loading;
export const selectError = (state) => state.popularMovies.hasErrors;
export default popularMoviesSlice.reducer;

export function fetchPopularMovies() {
	return async (dispatch) => {
		dispatch(getPopularMovies());
		await axios
			.get(
				`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
			)
			.then((response) => {
				dispatch(getPopularMoviesSuccess(response.data.results));
			})
			.catch(() => dispatch(getPopularMoviesFailure()));
	};
}
