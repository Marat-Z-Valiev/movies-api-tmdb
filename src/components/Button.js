import React from "react";
import ButtonStyled from "./styles/ButtonStyled";
import PropTypes from "prop-types";

const Button = ({handleClick, isDisabled, closeMenu}) => {
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
			Search
		</ButtonStyled>
	);
};

Button.propTypes = {
	handleClick: PropTypes.func.isRequired,
	isDisabled: PropTypes.bool,
	closeMenu: PropTypes.func,
};

export default Button;
