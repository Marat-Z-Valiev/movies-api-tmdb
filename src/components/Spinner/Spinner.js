import React from "react";
import styled from "styled-components";
import fadeInAnimation from "../../animation/fadeInAnimation";
import GridLoader from "react-spinners/GridLoader";

const SpinnerStyled = styled.div`
	div:nth-child(1) {
		margin: 0 auto;
		${fadeInAnimation}
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
