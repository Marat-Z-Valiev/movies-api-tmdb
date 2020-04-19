import React from "react";
import {shallow, configure} from "enzyme";
import toJSON from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import Search from "../Search";

configure({adapter: new Adapter()});

describe("Search", () => {
	it("should render correctly", () => {
		const props = {
			history: {},
		};
		const wrapper = shallow(<Search {...props} />);
		expect(toJSON(wrapper)).toMatchSnapshot();
	});
});
