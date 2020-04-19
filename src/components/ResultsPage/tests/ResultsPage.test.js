import React from "react";
import {shallow, configure} from "enzyme";
import toJSON from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import ResultsPage from "../ResultsPage";

configure({adapter: new Adapter()});

describe("ResultsPage", () => {
	it("should render correctly", () => {
		const props = {
			match: {
				params: {
					searchQuery: "test",
				},
			},
		};
		const wrapper = shallow(<ResultsPage {...props} />);
		expect(toJSON(wrapper)).toMatchSnapshot();
	});
});
