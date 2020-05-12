import React from "react";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {shallow, configure} from "enzyme";
import toJSON from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import PopularMovies from "../PopularMovies";
import reducer, {
	initialState,
	getPopularMovies,
	getPopularMoviesSuccess,
	getPopularMoviesFailure,
	popularMoviesSelector,
	selectIsLoading,
	selectError,
	fetchPopularMovies,
} from "../../../store/slices/popularMovies";

configure({adapter: new Adapter()});

describe("PopularMovies", () => {
	const mockStore = configureStore();
	let store;
	it("should render correctly", () => {
		store = mockStore(initialState);
		const wrapper = shallow(
			<Provider store={store}>
				<PopularMovies />
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

	it("should properly set loading state when getPopularMovies request is made", () => {
		// Act
		const nextState = reducer(initialState, getPopularMovies());

		// Assert
		const rootState = {popularMovies: nextState};
		expect(selectIsLoading(rootState)).toEqual(true);
	});

	it("should properly set loading, error and popular movies information when getPopularMoviesSuccess succeeds", () => {
		// Arrange
		const payload = {popularity: 500, vote_count: 1000};
		// Act
		const nextState = reducer(initialState, getPopularMoviesSuccess(payload));

		// Assert
		const rootState = {popularMovies: nextState};
		expect(popularMoviesSelector(rootState.popularMovies)).toEqual(payload);

		expect(selectIsLoading(rootState)).toEqual(false);
		expect(selectError(rootState)).toEqual(false);
	});

	it("should properly set loading and error when get video request fails", () => {
		// Act
		const nextState = reducer(initialState, getPopularMoviesFailure());

		// Assert
		const rootState = {popularMovies: nextState};
		expect(selectIsLoading(rootState)).toEqual(false);
		expect(selectError(rootState)).toEqual(true);
	});
});

describe("popular movies actions", () => {
	const mockStore = configureStore([thunk]);

	it("creates both getPopularMovies and getPopularMoviesSuccess when fetchPopularMovies succeeds", () => {
		const responsePayload = {popularity: 500, vote_count: 1000};
		const store = mockStore(initialState);
		const expectedActions = [
			getPopularMovies(),
			getPopularMoviesSuccess(responsePayload),
		];
		store
			.dispatch(fetchPopularMovies())
			.then(() => expect(store.getActions()).toEqual(expectedActions));
	});

	it("creates both getPopularMovies and getPopularMoviesFailure when fetchPopularMovies fails", () => {
		const store = mockStore(initialState);

		const expectedActions = [getPopularMovies(), getPopularMoviesFailure()];
		store
			.dispatch(fetchPopularMovies())
			.then(() => expect(store.getActions()).toEqual(expectedActions));
	});
});
