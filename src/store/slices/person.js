import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const initialState = {
	person: {},
	loading: false,
	hasErrors: false,
};

const personSlice = createSlice({
	name: "person",
	initialState,
	reducers: {
		getPerson: (state) => {
			state.loading = true;
		},
		getPersonSuccess: (state, {payload}) => {
			state.person = payload;
			state.loading = false;
			state.hasErrors = false;
		},
		getPersonFailure: (state) => {
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

export const personSelector = (state) => state.person;
export default personSlice.reducer;

export function fetchPerson(personId) {
	return async (dispatch) => {
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
