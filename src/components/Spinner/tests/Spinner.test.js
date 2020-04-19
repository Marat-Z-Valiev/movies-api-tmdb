import React from "react";
import {shallow, configure} from "enzyme";
import toJSON from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import Spinner from "../Spinner";

configure({adapter: new Adapter()});

describe("Spinner", () => {
	it("should render correctly", () => {
		const wrapper = shallow(<Spinner />);
		expect(toJSON(wrapper)).toMatchSnapshot();
	});
});
