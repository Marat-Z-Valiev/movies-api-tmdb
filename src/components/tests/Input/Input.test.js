import React from "react";
import {shallow, configure} from "enzyme";
import toJSON from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import Input from "../../Input";

configure({adapter: new Adapter()});

describe("Input", () => {
	it("should render correctly", () => {
		const wrapper = shallow(
			<Input handleChange={() => {}} handleClick={() => {}} />
		);
		expect(toJSON(wrapper)).toMatchSnapshot();
	});

	it("should trigger the handleChange function on change", () => {
		const handleChange = jest.fn();
		const wrapper = shallow(
			<Input handleChange={handleChange} handleClick={() => {}} />
		);
		wrapper.simulate("change");
		expect(handleChange).toHaveBeenCalled();
	});

	it("should trigger the handleClick function on click", () => {
		const handleClick = jest.fn();
		const wrapper = shallow(
			<Input handleChange={() => {}} handleClick={handleClick} />
		);
		wrapper.simulate("keypress", {key: "Enter"});
		expect(handleClick).toHaveBeenCalled();
	});

	it("should have default placeholder text", () => {
		const wrapper = shallow(
			<Input handleChange={() => {}} handleClick={() => {}} />
		);
		expect(wrapper.props().placeholder).toBe("Enter search query");
	});
});
