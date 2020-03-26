import React from "react";
import {shallow, mount, configure} from "enzyme";
import toJSON from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import Input from "../../Input";

configure({adapter: new Adapter()});

describe("Input", () => {
	it("should render correctly", () => {
		const component = shallow(
			<Input handleChange={() => {}} handleClick={() => {}} />
		);
		expect(toJSON(component)).toMatchSnapshot();
	});

	it("should trigger the handleChange function on change", () => {
		const handleChange = jest.fn();
		const component = shallow(
			<Input handleChange={handleChange} handleClick={() => {}} />
		);
		component.simulate("change");
		expect(handleChange).toHaveBeenCalled();
	});

	it("should trigger the handleClick function on click", () => {
		const handleClick = jest.fn();
		const component = shallow(
			<Input handleChange={() => {}} handleClick={handleClick} />
		);
		component.simulate("keypress", {key: "Enter"});
		expect(handleClick).toHaveBeenCalled();
	});

	it("should have text 'Loading' when isLoading is true", () => {
		const component = mount(
			<Input handleChange={() => {}} handleClick={() => {}} />
		);
		console.log(component.props());
		// expect(component.text()).toBe("Loading");
	});

	// it("should be disabled if isDisabled is true", () => {
	// 	const component = shallow(
	// 		<Button handleClick={() => {}} isLoading={false} isDisabled={true} />
	// 	);
	// 	expect(component.props().disabled).toBe(true);
	// });
});
