import React from "react";
import {shallow, configure, mount} from "enzyme";
import toJSON from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import Results from "../Results";

configure({adapter: new Adapter()});

describe("Results", () => {
	const props = {
		totalResults: 100,
		results: [],
	};

	it("should render correctly", () => {
		const wrapper = mount(<Results {...props} />);
		expect(toJSON(wrapper)).toMatchSnapshot();
	});
});
