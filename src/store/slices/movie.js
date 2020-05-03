import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const initialState = {
	loading: false,
	hasErrors: false,
	movie: {},
};

const movieSlice = createSlice({
	name: "movie",
	initialState,
	reducers: {
		getMovie: (state) => {
			state.loading = true;
		},
		getMovieSuccess: (state, {payload}) => {
			state.movie = payload;
			state.loading = false;
			state.hasErrors = false;
		},
		getMovieFailure: (state) => {
			state.loading = false;
			state.hasErrors = true;
		},
	},
});

export const {getMovie, getMovieSuccess, getMovieFailure} = movieSlice.actions;

export const movieSelector = (state) => state.movie;
export default movieSlice.reducer;

export function fetchMovie(movieId) {
	return async (dispatch) => {
		dispatch(getMovie());
		await axios
			.get(
				`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}&language=en-US`
			)
			.then((response) => {
				dispatch(getMovieSuccess(response.data));
			})
			.catch(() => dispatch(getMovieFailure()));
	};
}
