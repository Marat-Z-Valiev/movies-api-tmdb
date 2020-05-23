import React, {useState} from "react";
import {withRouter, RouteComponentProps} from "react-router-dom";
import PropTypes from "prop-types";
import Input from "../Input/Input";
import Button from "../Button/Button";

interface SearchProps {
	history: any;
	closeMenu?: () => void;
}

const Search: React.FC<SearchProps & RouteComponentProps> = ({
	history,
	closeMenu,
}) => {
	let [searchQuery, setSearchQuery] = useState("");
	let [isDisabled, setIsDisabled] = useState(true);

	// Handle onChange event on the input
	const handleChange = (event: any): void => {
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
		(document.querySelector(".input") as HTMLInputElement).value = "";
		setSearchQuery((searchQuery = ""));
		setIsDisabled((isDisabled = true));
	};

	return (
		<>
			<Input
				handleChange={handleChange}
				handleClick={handleClick}
				closeMenu={closeMenu}
			/>
			<Button
				handleClick={handleClick}
				isDisabled={isDisabled}
				closeMenu={closeMenu}
			/>
		</>
	);
};

Search.propTypes = {
	history: PropTypes.object.isRequired,
	closeMenu: PropTypes.func,
};

export default withRouter(Search);
