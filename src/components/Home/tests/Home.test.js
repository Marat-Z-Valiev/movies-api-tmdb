import React from "react";
import {shallow, configure} from "enzyme";
import toJSON from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import Home from "../Home";

configure({adapter: new Adapter()});

describe("Home", () => {
	it("should render correctly", () => {
		const wrapper = shallow(<Home />);
		expect(toJSON(wrapper)).toMatchSnapshot();
	});
});
