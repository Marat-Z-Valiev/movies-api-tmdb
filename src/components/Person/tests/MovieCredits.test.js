import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import reducer, {
	initialState,
	getMovieCredits,
	getMovieCreditsSuccess,
	getMovieCreditsFailure,
	movieCreditsSelector,
	selectIsLoading,
	selectError,
	fetchMovieCredits,
} from "../../../store/slices/movieCredits";

describe("Movie credits", () => {
	it("should return the initial state on first run", () => {
		// Arrange
		const nextState = initialState;

		// Act
		const result = reducer(undefined, {});

		// Assert
		expect(result).toEqual(nextState);
	});

	it("should properly set loading state when get movie credits request is made", () => {
		// Act
		const nextState = reducer(initialState, getMovieCredits());

		// Assert
		const rootState = {movieCredits: nextState};
		expect(selectIsLoading(rootState)).toEqual(true);
	});

	it("should properly set loading, error and movie credits information when get movie credits request succeeds", () => {
		// Arrange
		const payload = {overview: "Test overview", popularity: 1};
		// Act
		const nextState = reducer(initialState, getMovieCreditsSuccess(payload));

		// Assert
		const rootState = {movieCredits: nextState};
		expect(movieCreditsSelector(rootState.movieCredits)).toEqual(payload);

		expect(selectIsLoading(rootState)).toEqual(false);
		expect(selectError(rootState)).toEqual(false);
	});

	it("should properly set loading and error when get movie credits request fails", () => {
		// Act
		const nextState = reducer(initialState, getMovieCreditsFailure());

		// Assert
		const rootState = {movieCredits: nextState};
		expect(selectIsLoading(rootState)).toEqual(false);
		expect(selectError(rootState)).toEqual(true);
	});

	describe("movie credits actions", () => {
		const mockStore = configureStore([thunk]);

		it("creates both getMovieCredits and getMovieCreditsSuccess when fetchMovieCredits succeeds", () => {
			const movieId = "695513";
			const responsePayload = {overview: "Test overview", popularity: 1};
			const store = mockStore(initialState);
			const expectedActions = [
				getMovieCredits(),
				getMovieCreditsSuccess(responsePayload),
			];
			store
				.dispatch(fetchMovieCredits(movieId))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});

		it("creates both getMovieCredits and getMovieCreditsFailure when fetchMovieCredits fails", () => {
			const personId = "22";
			const store = mockStore(initialState);

			const expectedActions = [getMovieCredits(), getMovieCreditsFailure()];
			store
				.dispatch(fetchMovieCredits(personId))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});
	});
});
