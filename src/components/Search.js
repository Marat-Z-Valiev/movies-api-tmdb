import React, {useState} from "react";
import {withRouter} from "react-router-dom";
import Input from "./Input";
import Button from "./Button";

const Search = ({history}) => {
	let [searchQuery, setSearchQuery] = useState("");
	let [isDisabled, setIsDisabled] = useState(true);

	// Handle onChange event on the input
	const handleChange = event => {
		const {value} = event.currentTarget;
		console.log(value);
		if (!value) {
			setIsDisabled((isDisabled = true));
		} else {
			setIsDisabled((isDisabled = false));
		}
		setSearchQuery((searchQuery = value));
	};

	const handleClick = () => {
		history.push(`/search=${searchQuery}`);
	};

	return (
		<>
			<Input handleChange={handleChange} handleClick={handleClick} />
			<Button handleClick={handleClick} isDisabled={isDisabled} />
		</>
	);
};

export default withRouter(Search);
