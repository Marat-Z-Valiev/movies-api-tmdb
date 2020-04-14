import React, {useState} from "react";
import {withRouter} from "react-router-dom";
import Input from "./Input";
import Button from "./Button";

const Search = ({history, closeMenu}) => {
	let [searchQuery, setSearchQuery] = useState("");
	let [isDisabled, setIsDisabled] = useState(true);

	// Handle onChange event on the input
	const handleChange = (event) => {
		const {value} = event.currentTarget;
		if (!value) {
			setIsDisabled((isDisabled = true));
		} else {
			setIsDisabled((isDisabled = false));
		}
		setSearchQuery((searchQuery = value));
	};

	const handleClick = () => {
		history.push(`/search=${searchQuery}`);
		document.querySelector(".input").value = "";
	};

	return (
		<>
			<Input handleChange={handleChange} handleClick={handleClick} />
			<Button
				handleClick={handleClick}
				closeMenu={closeMenu}
				isDisabled={isDisabled}
			/>
		</>
	);
};

export default withRouter(Search);
