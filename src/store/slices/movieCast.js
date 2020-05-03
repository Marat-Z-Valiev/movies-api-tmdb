import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const initialState = {
	loading: false,
	hasErrors: false,
	cast: [],
};

const castSlice = createSlice({
	name: "cast",
	initialState,
	reducers: {
		getCast: (state) => {
			state.loading = true;
		},
		getCastSuccess: (state, {payload}) => {
			state.cast = payload;
			state.loading = false;
			state.hasErrors = false;
		},
		getCastFailure: (state) => {
			state.loading = false;
			state.hasErrors = true;
		},
	},
});

export const {getCast, getCastSuccess, getCastFailure} = castSlice.actions;

export const castSelector = (state) => state.cast;
export default castSlice.reducer;

export function fetchMovieCast(movieId) {
	return async (dispatch) => {
		dispatch(getCast());
		await axios
			.get(
				`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.API_KEY}`
			)
			.then((response) => {
				dispatch(getCastSuccess(response.data.cast));
			})
			.catch(() => dispatch(getCastFailure()));
	};
}
