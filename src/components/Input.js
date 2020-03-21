import React, {useState} from "react";
import styled from "styled-components";

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

export default Input;
