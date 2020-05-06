import React from "react";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {shallow, configure} from "enzyme";
import toJSON from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import Home from "../Home";

configure({adapter: new Adapter()});

describe("Home", () => {
	const initialState = {trendingMovies: [], loading: false, hasErrors: false};
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
});
