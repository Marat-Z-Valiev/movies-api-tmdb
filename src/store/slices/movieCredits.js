import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const initialState = {
	movieCredits: [],
	loading: false,
	hasErrors: false,
};

const movieCreditsSlice = createSlice({
	name: "movieCredits",
	initialState,
	reducers: {
		getMovieCredits: (state) => {
			state.loading = true;
		},
		getMovieCreditsSuccess: (state, {payload}) => {
			state.movieCredits = payload;
			state.loading = false;
			state.hasErrors = false;
		},
		getMovieCreditsFailure: (state) => {
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

export const movieCreditsSelector = (state) => state.movieCredits;
export default movieCreditsSlice.reducer;

export function fetchMovieCredits(personId) {
	return async (dispatch) => {
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
