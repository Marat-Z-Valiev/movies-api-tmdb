import React from "react";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {shallow, configure} from "enzyme";
import toJSON from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import Video from "../Video";
import reducer, {
	initialState,
	getVideo,
	getVideoSuccess,
	getVideoFailure,
	videoSelector,
	selectIsLoading,
	selectError,
	fetchVideo,
} from "../../../store/slices/video";

configure({adapter: new Adapter()});

describe("Video", () => {
	const mockStore = configureStore();
	let store;
	it("should render correctly", () => {
		store = mockStore(initialState);
		const props = {
			movieId: "5555",
		};
		const wrapper = shallow(
			<Provider store={store}>
				<Video {...props} />
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

	it("should properly set loading state when getVideo request is made", () => {
		// Act
		const nextState = reducer(initialState, getVideo());

		// Assert
		const rootState = {video: nextState};
		expect(selectIsLoading(rootState)).toEqual(true);
	});

	it("should properly set loading, error and video information when getVideoSuccess succeeds", () => {
		// Arrange
		const payload = {id: 1, type: "Trailer"};
		// Act
		const nextState = reducer(initialState, getVideoSuccess(payload));

		// Assert
		const rootState = {video: nextState};
		expect(videoSelector(rootState.video)).toEqual(payload);

		expect(selectIsLoading(rootState)).toEqual(false);
		expect(selectError(rootState)).toEqual(false);
	});

	it("should properly set loading and error when get video request fails", () => {
		// Act
		const nextState = reducer(initialState, getVideoFailure());

		// Assert
		const rootState = {video: nextState};
		expect(selectIsLoading(rootState)).toEqual(false);
		expect(selectError(rootState)).toEqual(true);
	});
});

describe("video actions", () => {
	const mockStore = configureStore([thunk]);

	it("creates both getVideo and getVideoSuccess when fetchVideo succeeds", () => {
		const movieId = 481848;
		const responsePayload = {id: 1, type: "Trailer"};
		const store = mockStore(initialState);
		const expectedActions = [getVideo(), getVideoSuccess(responsePayload)];
		store
			.dispatch(fetchVideo(movieId))
			.then(() => expect(store.getActions()).toEqual(expectedActions));
	});

	it("creates both getVideo and getVideoFailure when fetchVideo fails", () => {
		const store = mockStore(initialState);
		const movieId = 33;
		const expectedActions = [getVideo(), getVideoFailure()];
		store
			.dispatch(fetchVideo(movieId))
			.then(() => expect(store.getActions()).toEqual(expectedActions));
	});
});
