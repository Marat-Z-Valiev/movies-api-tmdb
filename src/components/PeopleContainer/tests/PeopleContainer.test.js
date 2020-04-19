import React from "react";
import {shallow, configure} from "enzyme";
import toJSON from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import PeopleContainer from "../PeopleContainer";

configure({adapter: new Adapter()});

describe("PeopleContainer", () => {
	it("should render correctly", () => {
		const props = {
			people: [],
			isLoading: true,
		};
		const wrapper = shallow(<PeopleContainer {...props} />);
		expect(toJSON(wrapper)).toMatchSnapshot();
	});
});
