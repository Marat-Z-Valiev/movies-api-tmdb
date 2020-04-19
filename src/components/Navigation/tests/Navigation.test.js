import React from "react";
import {shallow, configure} from "enzyme";
import toJSON from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import Navigation from "../Navigation";

configure({adapter: new Adapter()});

describe("Navigation", () => {
	it("should render correctly", () => {
		const wrapper = shallow(<Navigation />);
		expect(toJSON(wrapper)).toMatchSnapshot();
	});
});
