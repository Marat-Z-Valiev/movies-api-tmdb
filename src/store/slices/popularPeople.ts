import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {PopularPeople} from "../../types";
import {AppDispatch} from "../../index";

export const initialState: PopularPeople = {
	popularPeople: [],
	loading: false,
	hasErrors: false,
};

const popularPeopleSlice = createSlice({
	name: "popularPeople",
	initialState,
	reducers: {
		getPopularPeople: (state: any) => {
			state.loading = true;
		},
		getPopularPeopleSuccess: (state: any, {payload}: any) => {
			state.popularPeople = payload;
			state.loading = false;
			state.hasErrors = false;
		},
		getPopularPeopleFailure: (state: any) => {
			state.loading = false;
			state.hasErrors = true;
		},
	},
});

export const {
	getPopularPeople,
	getPopularPeopleSuccess,
	getPopularPeopleFailure,
} = popularPeopleSlice.actions;

export const popularPeopleSelector = (state: any) => state.popularPeople;
export const selectIsLoading = (state: any) => state.popularPeople.loading;
export const selectError = (state: any) => state.popularPeople.hasErrors;
export default popularPeopleSlice.reducer;

export function fetchPopularPeople() {
	return async (dispatch: AppDispatch) => {
		dispatch(getPopularPeople());
		await axios
			.get(
				`https://api.themoviedb.org/3/person/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
			)
			.then((response) => {
				dispatch(getPopularPeopleSuccess(response.data.results));
			})
			.catch(() => dispatch(getPopularPeopleFailure()));
	};
}
