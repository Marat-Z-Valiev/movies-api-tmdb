import React from "react";
import styled from "styled-components";
import GridLoader from "react-spinners/GridLoader";

const SpinnerStyled = styled.div`
	div:nth-child(1) {
		margin: 0 auto;
	}
`;

const Spinner = () => {
	return (
		<>
			<SpinnerStyled>
				<GridLoader />
			</SpinnerStyled>
			;
		</>
	);
};

export default Spinner;
