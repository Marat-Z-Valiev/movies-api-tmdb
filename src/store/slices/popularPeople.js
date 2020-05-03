import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const initialState = {
	popularPeople: [],
	loading: false,
	hasErrors: false,
};

const popularPeopleSlice = createSlice({
	name: "popularPeople",
	initialState,
	reducers: {
		getPopularPeople: (state) => {
			state.loading = true;
		},
		getPopularPeopleSuccess: (state, {payload}) => {
			state.popularPeople = payload;
			state.loading = false;
			state.hasErrors = false;
		},
		getPopularPeopleFailure: (state) => {
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

export const popularPeopleSelector = (state) => state.popularPeople;
export default popularPeopleSlice.reducer;

export function fetchPopularPeople() {
	return async (dispatch) => {
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
