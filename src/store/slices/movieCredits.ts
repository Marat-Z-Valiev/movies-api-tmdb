import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {MovieCredits} from "../../types";
import {AppDispatch} from "../../index";

export const initialState: MovieCredits = {
	movieCredits: [],
	loading: false,
	hasErrors: false,
};

const movieCreditsSlice = createSlice({
	name: "movieCredits",
	initialState,
	reducers: {
		getMovieCredits: (state: any) => {
			state.loading = true;
		},
		getMovieCreditsSuccess: (state: any, {payload}: any) => {
			state.movieCredits = payload;
			state.loading = false;
			state.hasErrors = false;
		},
		getMovieCreditsFailure: (state: any) => {
			state.loading = false;
			state.hasErrors = true;
		},
	},
});

export const {
	getMovieCredits,
	getMovieCreditsSuccess,
	getMovieCreditsFailure,
} = movieCreditsSlice.actions;

export const movieCreditsSelector = (state: any) => state.movieCredits;
export const selectIsLoading = (state: any) => state.movieCredits.loading;
export const selectError = (state: any) => state.movieCredits.hasErrors;
export default movieCreditsSlice.reducer;

export function fetchMovieCredits(personId: string) {
	return async (dispatch: AppDispatch) => {
		dispatch(getMovieCredits());
		await axios
			.get(
				`https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=${process.env.API_KEY}&language=en-US`
			)
			.then((response) => {
				dispatch(getMovieCreditsSuccess(response.data.cast));
			})
			.catch(() => dispatch(getMovieCreditsFailure()));
	};
}
