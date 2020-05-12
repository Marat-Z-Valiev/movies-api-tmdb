import React from "react";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {shallow, configure} from "enzyme";
import toJSON from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import PeoplePage from "../PeoplePage";
import reducer, {
	initialState,
	getPopularPeople,
	getPopularPeopleSuccess,
	getPopularPeopleFailure,
	popularPeopleSelector,
	selectIsLoading,
	selectError,
	fetchPopularPeople,
} from "../../../store/slices/popularPeople";

configure({adapter: new Adapter()});

describe("PeoplePage", () => {
	const mockStore = configureStore();
	let store;
	it("should render correctly", () => {
		store = mockStore(initialState);
		const wrapper = shallow(
			<Provider store={store}>
				<PeoplePage />
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

	it("should properly set loading state when getPopularPeople request is made", () => {
		// Act
		const nextState = reducer(initialState, getPopularPeople());

		// Assert
		const rootState = {popularPeople: nextState};
		expect(selectIsLoading(rootState)).toEqual(true);
	});

	it("should properly set loading, error and popular people information when getPopularPeople succeeds", () => {
		// Arrange
		const payload = {popularity: 500, name: "John Doe"};
		// Act
		const nextState = reducer(initialState, getPopularPeopleSuccess(payload));

		// Assert
		const rootState = {popularPeople: nextState};
		expect(popularPeopleSelector(rootState.popularPeople)).toEqual(payload);

		expect(selectIsLoading(rootState)).toEqual(false);
		expect(selectError(rootState)).toEqual(false);
	});

	it("should properly set loading and error when getPopularPeople request fails", () => {
		// Act
		const nextState = reducer(initialState, getPopularPeopleFailure());

		// Assert
		const rootState = {popularPeople: nextState};
		expect(selectIsLoading(rootState)).toEqual(false);
		expect(selectError(rootState)).toEqual(true);
	});
});

describe("popular people actions", () => {
	const mockStore = configureStore([thunk]);

	it("creates both getPopularMovies and getPopularMoviesSuccess when fetchPopularMovies succeeds", () => {
		const responsePayload = {popularity: 500, name: "John Doe"};
		const store = mockStore(initialState);
		const expectedActions = [
			getPopularPeople(),
			getPopularPeopleSuccess(responsePayload),
		];
		store
			.dispatch(fetchPopularPeople())
			.then(() => expect(store.getActions()).toEqual(expectedActions));
	});

	it("creates both getPopularMovies and getPopularMoviesFailure when fetchPopularMovies fails", () => {
		const store = mockStore(initialState);

		const expectedActions = [getPopularPeople(), getPopularPeopleFailure()];
		store
			.dispatch(fetchPopularPeople())
			.then(() => expect(store.getActions()).toEqual(expectedActions));
	});
});
