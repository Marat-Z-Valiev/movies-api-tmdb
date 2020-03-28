import React from "react";
import {shallow, mount, configure} from "enzyme";
import toJSON from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import Button from "../../Button";

configure({adapter: new Adapter()});

describe("Button", () => {
	it("should render correctly", () => {
		const wrapper = shallow(
			<Button handleClick={() => {}} isLoading={false} isDisabled={false} />
		);
		expect(toJSON(wrapper)).toMatchSnapshot();
	});

	it("should trigger the handleClick function on click", () => {
		const handleClick = jest.fn();
		const wrapper = shallow(
			<Button handleClick={handleClick} isLoading={false} isDisabled={false} />
		);
		wrapper.simulate("click");
		expect(handleClick).toHaveBeenCalled();
	});

	it("should have text Loading when isLoading is true", () => {
		const wrapper = mount(
			<Button handleClick={() => {}} isLoading={true} isDisabled={false} />
		);
		expect(wrapper.text()).toBe("Loading");
	});

	it("should be disabled if isDisabled is true", () => {
		const wrapper = shallow(
			<Button handleClick={() => {}} isLoading={false} isDisabled={true} />
		);
		expect(wrapper.props().disabled).toBe(true);
	});
});
