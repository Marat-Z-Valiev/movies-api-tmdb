import React from "react";
import Select from "react-select";
import Input from "./Input";
import Button from "./Button";
import InputContainerStyled from "./styles/InputContainerStyled";

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
			<h2>Select category</h2>
			<Select
				className="select-category"
				defaultValue={{value: "movie", label: "Movie"}}
				options={options}
				onChange={handleSelect}
			/>
			<Button
				handleClick={handleClick}
				isLoading={isLoading}
				isDisabled={isDisabled}
			/>
		</InputContainerStyled>
	</>
);

export default InputContainer;
