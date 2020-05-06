import React from "react";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {shallow, configure} from "enzyme";
import toJSON from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import MoviePage from "../MoviePage";

configure({adapter: new Adapter()});
jest.mock("axios");
describe("MoviePage", () => {
	const initialState = {loading: false, hasErrors: false, movie: {}};
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
});
