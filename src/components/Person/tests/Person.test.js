import React from "react";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {shallow, configure} from "enzyme";
import toJSON from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import Person from "../Person";
import reducer, {
	initialState,
	getPerson,
	getPersonSuccess,
	getPersonFailure,
	personSelector,
	selectIsLoading,
	selectError,
	fetchPerson,
} from "../../../store/slices/person";

configure({adapter: new Adapter()});

describe("Person", () => {
	const initialState = {person: {}, loading: false, hasErrors: false};
	const mockStore = configureStore();
	let store;
	it("should render correctly", () => {
		store = mockStore(initialState);
		const props = {
			match: {
				params: {
					id: 1,
				},
			},
		};
		const wrapper = shallow(
			<Provider store={store}>
				<Person {...props} />
			</Provider>
		);

		expect(toJSON(wrapper)).toMatchSnapshot();
	});

	it("should return the initial state on first run", () => {
		// Arrange
		const nextState = initialState;

		// Act
		const result = reducer(undefined, {});

		// Assert
		expect(result).toEqual(nextState);
	});

	it("should properly set loading state when get person request is made", () => {
		// Act
		const nextState = reducer(initialState, getPerson());

		// Assert
		const rootState = {person: nextState};
		expect(selectIsLoading(rootState)).toEqual(true);
	});

	it("should properly set loading, error and person information when get person request succeeds", () => {
		// Arrange
		const payload = {birthday: "1971-03-31", name: "Ewan McGregor"};
		// Act
		const nextState = reducer(initialState, getPersonSuccess(payload));

		// Assert
		const rootState = {person: nextState};
		expect(personSelector(rootState.person)).toEqual(payload);

		expect(selectIsLoading(rootState)).toEqual(false);
		expect(selectError(rootState)).toEqual(false);
	});

	it("should properly set loading and error when get person request fails", () => {
		// Act
		const nextState = reducer(initialState, getPersonFailure());

		// Assert
		const rootState = {person: nextState};
		expect(selectIsLoading(rootState)).toEqual(false);
		expect(selectError(rootState)).toEqual(true);
	});

	describe("person actions", () => {
		const mockStore = configureStore([thunk]);

		it("creates both getPerson and getPersonSuccess when fetchPerson succeeds", () => {
			const personId = "3061";
			const responsePayload = {birthday: "1971-03-31", name: "Ewan McGregor"};
			const store = mockStore(initialState);
			const expectedActions = [getPerson(), getPersonSuccess(responsePayload)];
			store
				.dispatch(fetchPerson(personId))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});

		it("creates both getPerson and getPersonFailure when fetchPerson fails", () => {
			const movieId = "333";
			const store = mockStore(initialState);

			const expectedActions = [getPerson(), getPersonFailure()];
			store
				.dispatch(fetchPerson(movieId))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});
	});
});
