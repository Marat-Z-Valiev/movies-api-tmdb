import React from "react";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {shallow, configure} from "enzyme";
import toJSON from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import MoviePage from "../MoviePage";
import reducer, {
	initialState,
	getMovie,
	getMovieSuccess,
	getMovieFailure,
	fetchMovie,
	selectMovie,
	movieSelector,
	selectIsLoading,
	selectError,
} from "../../../store/slices/movie";

configure({adapter: new Adapter()});
jest.mock("axios");
describe("MoviePage", () => {
	const mockStore = configureStore();
	let store;

	it("should render corretly", () => {
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
				<MoviePage {...props} />
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

	it("should properly set loading state when get video request is made", () => {
		// Act
		const nextState = reducer(initialState, getMovie());

		// Assert
		const rootState = {movie: nextState};
		expect(selectIsLoading(rootState)).toEqual(true);
	});

	it("should properly set loading, error and movie information when get video request succeeds", () => {
		// Arrange
		const payload = {title: "Test title", vote_average: 8};
		// Act
		const nextState = reducer(initialState, getMovieSuccess(payload));

		// Assert
		const rootState = {movie: nextState};
		expect(movieSelector(rootState.movie)).toEqual(payload);

		expect(selectIsLoading(rootState)).toEqual(false);
		expect(selectError(rootState)).toEqual(false);
	});

	it("should properly set loading and error  when get video request fails", () => {
		// Act
		const nextState = reducer(initialState, getMovieFailure());

		// Assert
		const rootState = {movie: nextState};
		expect(selectIsLoading(rootState)).toEqual(false);
		expect(selectError(rootState)).toEqual(true);
	});
});
