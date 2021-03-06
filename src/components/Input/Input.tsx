import React, {useState} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const InputStyles = styled.input`
	border: 2px solid black;
	padding: 10px;
	margin-right: 10px;
	border-radius: 15px;
`;

interface InputProps {
	handleChange: (e: any) => void;
	handleClick: () => void;
	closeMenu: any;
}

const Input: React.FC<InputProps> = ({
	handleChange,
	handleClick,
	closeMenu,
}) => {
	let [placeholderText, setPlaceholderText] = useState("Search");

	const handleFocus = () => {
		setPlaceholderText((placeholderText = ""));
	};

	const handleOnBlur = () => {
		setPlaceholderText((placeholderText = "Search"));
	};

	const runFunctions = () => {
		closeMenu();
		handleClick();
	};

	const handleKeyPress = (event: any) => {
		if (event.key === "Enter") {
			runFunctions();
			setPlaceholderText((placeholderText = "Search"));
			event.currentTarget.value = "";
		}
		return;
	};
	return (
		<InputStyles
			className="input"
			type="search"
			onChange={handleChange}
			onFocus={handleFocus}
			onBlur={handleOnBlur}
			onKeyPress={(event) => handleKeyPress(event)}
			placeholder={placeholderText}
			aria-label="Search"
		/>
	);
};

Input.propTypes = {
	handleChange: PropTypes.func.isRequired,
	handleClick: PropTypes.func.isRequired,
	closeMenu: PropTypes.func,
};

export default Input;
