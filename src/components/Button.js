import React from "react";
import ButtonStyled from "./styles/ButtonStyled";
import PropTypes from "prop-types";

const Button = ({handleClick, isLoading, isDisabled, closeMenu}) => {
	const handleKeyPress = (event, handleFunction) => {
		if (event.key === "Enter") {
			handleFunction;
		}
	};

	const runFunctions = () => {
		closeMenu();
		handleClick();
	};
	return (
		<ButtonStyled
			type="button"
			onClick={runFunctions}
			onKeyPress={(event) => handleKeyPress(event(), handleClick())}
			disabled={isDisabled}
		>
			{isLoading ? "Loading" : "Search"}
		</ButtonStyled>
	);
};

Button.propTypes = {
	handleClick: PropTypes.func,
	isLoading: PropTypes.bool,
	isDisabled: PropTypes.bool,
};

export default Button;
