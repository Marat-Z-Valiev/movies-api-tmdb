import React from "react";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {shallow, configure} from "enzyme";
import toJSON from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import PeoplePage from "../PeoplePage";

configure({adapter: new Adapter()});

describe("PeoplePage", () => {
	const initialState = {popularPeople: [], loading: false, hasErrors: false};
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
});
