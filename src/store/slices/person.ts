import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {Person} from "../../types";
import {AppDispatch} from "../../index";

export const initialState: Person = {
	person: {},
	loading: false,
	hasErrors: false,
};

const personSlice = createSlice({
	name: "person",
	initialState,
	reducers: {
		getPerson: (state: any) => {
			state.loading = true;
		},
		getPersonSuccess: (state: any, {payload}: any) => {
			state.person = payload;
			state.loading = false;
			state.hasErrors = false;
		},
		getPersonFailure: (state: any) => {
			state.loading = false;
			state.hasErrors = true;
		},
	},
});

export const {
	getPerson,
	getPersonSuccess,
	getPersonFailure,
} = personSlice.actions;

export const personSelector = (state: any) => state.person;
export const selectIsLoading = (state: any) => state.person.loading;
export const selectError = (state: any) => state.person.hasErrors;
export default personSlice.reducer;

export function fetchPerson(personId: string) {
	return async (dispatch: AppDispatch) => {
		dispatch(getPerson());
		await axios
			.get(
				`https://api.themoviedb.org/3/person/${personId}?api_key=${process.env.API_KEY}&language=en-US`
			)
			.then((response) => {
				dispatch(getPersonSuccess(response.data));
			})
			.catch(() => dispatch(getPersonFailure()));
	};
}
