import React from "react";
import ButtonStyled from "./ButtonStyled";
import PropTypes from "prop-types";

const Button = ({handleClick, isDisabled, closeMenu}) => {
	const runFunctions = () => {
		closeMenu();
		handleClick();
	};
	return (
		<ButtonStyled type="button" onClick={runFunctions} disabled={isDisabled}>
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
