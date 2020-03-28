import React from "react";
import {shallow, configure} from "enzyme";
import toJSON from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import Results from "../../Results";

configure({adapter: new Adapter()});

describe("Results", () => {
	const props = {
		totalResults: "100",
		results: []
	};

	it("should render correctly", () => {
		const wrapper = shallow(<Results {...props} />);
		expect(toJSON(wrapper)).toMatchSnapshot();
	});
});
