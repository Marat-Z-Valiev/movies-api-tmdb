import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import reducer, {
	initialState,
	getCast,
	getCastSuccess,
	getCastFailure,
	castSelector,
	selectIsLoading,
	selectError,
	fetchMovieCast,
} from "../../../store/slices/movieCast";

describe("Cast", () => {
	it("should return the initial state on first run", () => {
		// Arrange
		const nextState = initialState;

		// Act
		const result = reducer(undefined, {});

		// Assert
		expect(result).toEqual(nextState);
	});

	it("should properly set loading state when get cast request is made", () => {
		// Act
		const nextState = reducer(initialState, getCast());

		// Assert
		const rootState = {cast: nextState};
		expect(selectIsLoading(rootState)).toEqual(true);
	});

	it("should properly set loading, error and movie cast information when get cast request succeeds", () => {
		// Arrange
		const payload = {cast_id: 11, gender: 1};
		// Act
		const nextState = reducer(initialState, getCastSuccess(payload));

		// Assert
		const rootState = {cast: nextState};
		expect(castSelector(rootState.cast)).toEqual(payload);

		expect(selectIsLoading(rootState)).toEqual(false);
		expect(selectError(rootState)).toEqual(false);
	});

	it("should properly set loading and error when get cast request fails", () => {
		// Act
		const nextState = reducer(initialState, getCastFailure());

		// Assert
		const rootState = {cast: nextState};
		expect(selectIsLoading(rootState)).toEqual(false);
		expect(selectError(rootState)).toEqual(true);
	});

	describe("cast actions", () => {
		const mockStore = configureStore([thunk]);

		it("creates both getCast and getCastSuccess when fetchMovieCast succeeds", () => {
			const movieId = "181812";
			const responsePayload = {cast_id: 11, gender: 1};
			const store = mockStore(initialState);
			const expectedActions = [getCast(), getCastSuccess(responsePayload)];
			store
				.dispatch(fetchMovieCast(movieId))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});

		it("creates both getCast and getCastFailure when fetchMovieCast fails", () => {
			const movieId = "333";
			const store = mockStore(initialState);

			const expectedActions = [getCast(), getCastFailure()];
			store
				.dispatch(fetchMovieCast(movieId))
				.then(() => expect(store.getActions()).toEqual(expectedActions));
		});
	});
});
