import React from "react";
import ButtonStyled from "./styles/ButtonStyled";

const Button = ({handleClick, isLoading, isDisabled}) => {
	const handleKeyPress = (event, handleFunction) => {
		if (event.key === "Enter") {
			handleFunction;
		}
	};
	return (
		<ButtonStyled
			type="button"
			onClick={handleClick}
			onKeyPress={event => handleKeyPress(event, handleClick)}
			disabled={isDisabled}
		>
			{isLoading ? "Loading" : "Search"}
		</ButtonStyled>
	);
};

export default Button;
