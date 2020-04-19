import React from "react";
import {shallow, configure} from "enzyme";
import toJSON from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import PeoplePage from "../PeoplePage";

configure({adapter: new Adapter()});

describe("PeoplePage", () => {
	it("should render correctly", () => {
		const wrapper = shallow(<PeoplePage />);
		expect(toJSON(wrapper)).toMatchSnapshot();
	});
});
