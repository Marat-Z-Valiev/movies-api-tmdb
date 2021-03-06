import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {PopularMovies} from "../../types";
import {AppDispatch} from "../../index";

export const initialState: PopularMovies = {
	popularMovies: [],
	loading: false,
	hasErrors: false,
};

const popularMoviesSlice = createSlice({
	name: "popularMovies",
	initialState,
	reducers: {
		getPopularMovies: (state: any) => {
			state.loading = true;
		},
		getPopularMoviesSuccess: (state: any, {payload}: any) => {
			state.popularMovies = payload;
			state.loading = false;
			state.hasErrors = false;
		},
		getPopularMoviesFailure: (state: any) => {
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

export const popularMoviesSelector = (state: any) => state.popularMovies;
export const selectIsLoading = (state: any) => state.popularMovies.loading;
export const selectError = (state: any) => state.popularMovies.hasErrors;
export default popularMoviesSlice.reducer;

export function fetchPopularMovies() {
	return async (dispatch: AppDispatch) => {
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
