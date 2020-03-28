import React from "react";
import {shallow, configure} from "enzyme";
import toJSON from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import PaginationComponent from "../../PaginationComponent";

configure({adapter: new Adapter()});

describe("PaginationComponent", () => {
	it("should render correctly", () => {
		const wrapper = shallow(
			<PaginationComponent
				currentPage={1}
				resultsPerPage={10}
				totalResults={"100"}
				handlePageChange={() => {}}
			/>
		);
		expect(toJSON(wrapper)).toMatchSnapshot();
	});
});
