import React from "react";
import {shallow, configure} from "enzyme";
import toJSON from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import ResultItem from "../ResultItem";

configure({adapter: new Adapter()});

describe("ResultItem", () => {
	const props = {
		result: {},
	};
	it("should render correctly", () => {
		const wrapper = shallow(<ResultItem {...props} />);
		expect(toJSON(wrapper)).toMatchSnapshot();
	});
});
