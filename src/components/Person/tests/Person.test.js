import React from "react";
import {shallow, configure} from "enzyme";
import toJSON from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import Person from "../Person";

configure({adapter: new Adapter()});

describe("Person", () => {
	it("should render correctly", () => {
		const props = {
			match: {
				params: {
					id: 1,
				},
			},
		};
		const wrapper = shallow(<Person {...props} />);
		expect(toJSON(wrapper)).toMatchSnapshot();
	});
});
