import React from "react";
import {shallow, configure} from "enzyme";
import toJSON from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import PopularMovies from "../PopularMovies";

configure({adapter: new Adapter()});

describe("PopularMovies", () => {
	it("should render correctly", () => {
		const wrapper = shallow(<PopularMovies />);
		expect(toJSON(wrapper)).toMatchSnapshot();
	});
});
