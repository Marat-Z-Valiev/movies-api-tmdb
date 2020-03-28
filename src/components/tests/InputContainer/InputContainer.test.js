import React from "react";
import {shallow, configure} from "enzyme";
import toJSON from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import InputContainer from "../../InputContainer";

configure({adapter: new Adapter()});

describe("InputContainer", () => {
	it("should render correctly", () => {
		const component = shallow(
			<InputContainer
				handleChange={() => {}}
				handleClick={() => {}}
				handleSelect={() => {}}
				isLoading={false}
				isDisabled={false}
			/>
		);
		expect(toJSON(component)).toMatchSnapshot();
	});
});
