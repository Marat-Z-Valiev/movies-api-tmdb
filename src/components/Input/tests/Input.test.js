import React from "react";
import {shallow, configure, mount} from "enzyme";
import toJSON from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import Input from "../Input";

configure({adapter: new Adapter()});

describe("Input", () => {
	const props = {
		handleChange: () => {},
		handleClick: () => {},
		closeMenu: () => {},
	};
	it("should render correctly", () => {
		const wrapper = shallow(<Input {...props} />);
		expect(toJSON(wrapper)).toMatchSnapshot();
	});

	it("should trigger the handleChange function on change", () => {
		const props = {
			handleClick: () => {},
			closeMenu: () => {},
		};
		const handleChange = jest.fn();
		const wrapper = shallow(<Input handleChange={handleChange} {...props} />);
		wrapper.simulate("change");
		expect(handleChange).toHaveBeenCalled();
	});

	it("should trigger the handleClick function on click", () => {
		const props = {
			handleChange: () => {},
		};
		const handleClick = jest.fn();
		const closeMenu = jest.fn();
		const wrapper = mount(
			<Input closeMenu={closeMenu} handleClick={handleClick} {...props} />
		);
		const input = wrapper.find("input").at(0);
		input.simulate("keypress", {key: "Enter"});
		expect(handleClick).toHaveBeenCalled();
		expect(closeMenu).toHaveBeenCalled();
	});

	it("should have default placeholder text", () => {
		const wrapper = shallow(<Input {...props} />);
		expect(wrapper.props().placeholder).toBe("Search");
	});
});
