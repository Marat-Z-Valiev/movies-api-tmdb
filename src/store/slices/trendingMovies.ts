import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {TrendingMovies} from "../../types";
import {AppDispatch} from "../../index";

export const initialState: TrendingMovies = {
	trendingMovies: [],
	loading: false,
	hasErrors: false,
};

const trendingMoviesSlice = createSlice({
	name: "trendingMovies",
	initialState,
	reducers: {
		getTrendingMovies: (state: any) => {
			state.loading = true;
		},
		getTrendingMoviesSuccess: (state: any, {payload}: any) => {
			state.trendingMovies = payload;
			state.loading = false;
			state.hasErrors = false;
		},
		getTrendingMoviesFailure: (state: any) => {
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

export const trendingMoviesSelector = (state: any) => state.trendingMovies;
export const selectIsLoading = (state: any) => state.trendingMovies.loading;
export const selectError = (state: any) => state.trendingMovies.hasErrors;
export default trendingMoviesSlice.reducer;

export function fetchMovies() {
	return async (dispatch: AppDispatch) => {
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
