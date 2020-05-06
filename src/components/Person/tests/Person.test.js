import React from "react";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {shallow, configure} from "enzyme";
import toJSON from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import Person from "../Person";

configure({adapter: new Adapter()});

describe("Person", () => {
	const initialState = {person: {}, loading: false, hasErrors: false};
	const mockStore = configureStore();
	let store;
	it("should render correctly", () => {
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
				<Person {...props} />
			</Provider>
		);

		expect(toJSON(wrapper)).toMatchSnapshot();
	});
});
