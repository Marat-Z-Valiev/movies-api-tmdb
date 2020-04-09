import React from "react";
import Select from "react-select";
import Input from "./Input";
import Button from "./Button";
import InputContainerStyled from "./styles/InputContainerStyled";
import PropTypes from "prop-types";

const options = [
	{value: "movie", label: "Movie"},
	{value: "game", label: "Game"},
	{value: "series", label: "Series"}
];

const InputContainer = ({
	handleChange,
	handleClick,
	handleSelect,
	isLoading,
	isDisabled
}) => (
	<>
		<InputContainerStyled>
			<Input handleChange={handleChange} handleClick={handleClick} />
			<Button
				handleClick={handleClick}
				isLoading={isLoading}
				isDisabled={isDisabled}
			/>
		</InputContainerStyled>
	</>
);

InputContainer.propTypes = {
	// handleChange: PropTypes.func.isRequired,
	handleClick: PropTypes.func.isRequired,
	handleSelect: PropTypes.func,
	isLoading: PropTypes.bool.isRequired,
	isDisabled: PropTypes.bool.isRequired
};

export default InputContainer;
