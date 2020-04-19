import React from "react";
import {shallow, configure} from "enzyme";
import toJSON from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import MoviePage from "../MoviePage";

configure({adapter: new Adapter()});
jest.mock("axios");
describe("MoviePage", () => {
	it("should render corretly", () => {
		const props = {
			match: {
				params: {
					id: 1,
				},
			},
		};
		const wrapper = shallow(<MoviePage {...props} />);
		expect(toJSON(wrapper)).toMatchSnapshot();
	});
});
