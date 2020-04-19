import React from "react";
import {shallow, configure} from "enzyme";
import toJSON from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import Video from "../Video";

configure({adapter: new Adapter()});

describe("Video", () => {
	it("should render correctly", () => {
		const props = {
			id: "5555",
		};
		const wrapper = shallow(<Video {...props} />);
		expect(toJSON(wrapper)).toMatchSnapshot();
	});
});
