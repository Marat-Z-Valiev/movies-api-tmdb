import React from "react";
import {shallow, mount, configure} from "enzyme";
import toJSON from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import Button from "../Button";

configure({adapter: new Adapter()});

describe("Button", () => {
	it("should render correctly", () => {
		const wrapper = shallow(
			<Button handleClick={() => {}} isDisabled={false} />
		);
		expect(toJSON(wrapper)).toMatchSnapshot();
	});

	it("should trigger the handleClick function on click", () => {
		const handleClick = jest.fn();
		const closeMenu = jest.fn();
		const runFunctions = jest.fn(() => {
			handleClick, closeMenu;
		});
		const wrapper = mount(
			<Button
				handleClick={() => {
					runFunctions;
				}}
				isDisabled={false}
			/>
		);
		wrapper.simulate("click");
		expect(runFunctions).toHaveBeenCalled();
	});

	it("should be disabled if isDisabled is true", () => {
		const wrapper = shallow(
			<Button handleClick={() => {}} isDisabled={true} />
		);
		expect(wrapper.props().disabled).toBe(true);
	});
});
