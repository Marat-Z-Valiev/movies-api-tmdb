import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {Cast} from "../../types";
import {AppDispatch} from "../../index";

export const initialState: Cast = {
	loading: false,
	hasErrors: false,
	cast: [],
};

const castSlice = createSlice({
	name: "cast",
	initialState,
	reducers: {
		getCast: (state: any) => {
			state.loading = true;
		},
		getCastSuccess: (state: any, {payload}: any) => {
			state.cast = payload;
			state.loading = false;
			state.hasErrors = false;
		},
		getCastFailure: (state: any) => {
			state.loading = false;
			state.hasErrors = true;
		},
	},
});

export const {getCast, getCastSuccess, getCastFailure} = castSlice.actions;

export const castSelector = (state: any) => state.cast;
export const selectIsLoading = (state: any) => state.cast.loading;
export const selectError = (state: any) => state.cast.hasErrors;
export default castSlice.reducer;

export function fetchMovieCast(movieId: string) {
	return async (dispatch: AppDispatch) => {
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
