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
		const handleClickFunc = jest.fn();
		const closeMenuFunc = jest.fn();

		const props = {
			handleClick: handleClickFunc,
			closeMenu: closeMenuFunc,
			isDisabled: false,
		};

		const wrapper = mount(<Button {...props} />);
		const button = wrapper.find(Button).at(0);
		button.simulate("click");
		expect(handleClickFunc).toHaveBeenCalled();
		expect(closeMenuFunc).toHaveBeenCalled();
	});

	it("should be disabled if isDisabled is true", () => {
		const wrapper = shallow(
			<Button handleClick={() => {}} isDisabled={true} />
		);
		expect(wrapper.props().disabled).toBe(true);
	});
});
