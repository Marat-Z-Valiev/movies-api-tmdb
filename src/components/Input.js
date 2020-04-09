import React, {useState} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const InputStyles = styled.input`
	border: 2px solid black;
	padding: 10px;
`;

const Input = ({handleChange, handleClick}) => {
	let [placeholderText, setPlaceholderText] = useState("Enter search query");

	const handleFocus = () => {
		setPlaceholderText((placeholderText = ""));
	};

	const handleOnBlur = () => {
		setPlaceholderText((placeholderText = "Enter search query"));
	};

	const handleKeyPress = (event, handleFunction) => {
		if (event.key === "Enter") {
			handleFunction();
			setPlaceholderText((placeholderText = "Enter search query"));
		}
		return;
	};
	return (
		<InputStyles
			type="text"
			onChange={handleChange}
			onFocus={handleFocus}
			onBlur={handleOnBlur}
			onKeyPress={event => handleKeyPress(event, handleClick)}
			placeholder={placeholderText}
		/>
	);
};

Input.propTypes = {
	// handleChange: PropTypes.func.isRequired,
	handleClick: PropTypes.func.isRequired
};

export default Input;
