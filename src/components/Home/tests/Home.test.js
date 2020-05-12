import React from "react";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {shallow, configure} from "enzyme";
import toJSON from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import Home from "../Home";
import reducer, {
	initialState,
	getTrendingMovies,
	getTrendingMoviesSuccess,
	getTrendingMoviesFailure,
	trendingMoviesSelector,
	selectIsLoading,
	selectError,
	fetchMovies,
} from "../../../store/slices/trendingMovies";

configure({adapter: new Adapter()});

describe("Home", () => {
	const mockStore = configureStore();
	let store;
	it("should render correctly", () => {
		store = mockStore(initialState);
		const wrapper = shallow(
			<Provider store={store}>
				<Home />
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

	it("should properly set loading state when getTrendingMovies request is made", () => {
		// Act
		const nextState = reducer(initialState, getTrendingMovies());

		// Assert
		const rootState = {trendingMovies: nextState};
		expect(selectIsLoading(rootState)).toEqual(true);
	});

	it("should properly set loading, error and popular movies information when getTrendingMoviesSuccess succeeds", () => {
		// Arrange
		const payload = {title: "Test title", vote_count: 1000};
		// Act
		const nextState = reducer(initialState, getTrendingMoviesSuccess(payload));

		// Assert
		const rootState = {trendingMovies: nextState};
		expect(trendingMoviesSelector(rootState.trendingMovies)).toEqual(payload);

		expect(selectIsLoading(rootState)).toEqual(false);
		expect(selectError(rootState)).toEqual(false);
	});

	it("should properly set loading and error when get trending movies request fails", () => {
		// Act
		const nextState = reducer(initialState, getTrendingMoviesFailure());

		// Assert
		const rootState = {trendingMovies: nextState};
		expect(selectIsLoading(rootState)).toEqual(false);
		expect(selectError(rootState)).toEqual(true);
	});
});

describe("trending movies actions", () => {
	const mockStore = configureStore([thunk]);

	it("creates both getTrendingMovies and getTrendingMoviesSuccess when fetchPopularMovies succeeds", () => {
		const responsePayload = {title: "Test title", vote_count: 1000};
		const store = mockStore(initialState);
		const expectedActions = [
			getTrendingMovies(),
			getTrendingMoviesSuccess(responsePayload),
		];
		store
			.dispatch(fetchMovies())
			.then(() => expect(store.getActions()).toEqual(expectedActions));
	});

	it("creates both getTrendingMovies and getTrendingMoviesFailure when getTrendingMovies fails", () => {
		const store = mockStore(initialState);

		const expectedActions = [getTrendingMovies(), getTrendingMoviesFailure()];
		store
			.dispatch(fetchMovies())
			.then(() => expect(store.getActions()).toEqual(expectedActions));
	});
});
