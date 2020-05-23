import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {Movie} from "../../types";
import {AppDispatch} from "../../index";

export const initialState: Movie = {
	movie: {},
	loading: false,
	hasErrors: false,
};

const movieSlice = createSlice({
	name: "movie",
	initialState,
	reducers: {
		getMovie: (state: any) => {
			state.loading = true;
		},
		getMovieSuccess: (state: any, {payload}: any) => {
			state.movie = payload;
			state.loading = false;
			state.hasErrors = false;
		},
		getMovieFailure: (state: any) => {
			state.loading = false;
			state.hasErrors = true;
		},
	},
});

export const {getMovie, getMovieSuccess, getMovieFailure} = movieSlice.actions;

export const movieSelector = (state: any) => state.movie;
export const selectIsLoading = (state: any) => state.movie.loading;
export const selectError = (state: any) => state.movie.hasErrors;

export default movieSlice.reducer;

export function fetchMovie(movieId: string) {
	return async (dispatch: AppDispatch) => {
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
