import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import GridLoader from "react-spinners/GridLoader";
import PeopleContainerStyled from "./styles/PeopleContainerStyled";
import noImage from "../images/no-image-available.jpg";

const SpinnerStyled = styled.div`
	div:nth-child(1) {
		margin: 0 auto;
	}
`;

const PeopleBlock = ({people, isLoading}) => {
	return (
		<>
			{isLoading ? (
				<SpinnerStyled>
					<GridLoader />
				</SpinnerStyled>
			) : (
				<PeopleContainerStyled>
					{Object.keys(people).map(key => (
						<div key={people[key].id} className="person">
							<Link to={`/personId=${people[key].id}`}>
								{people[key].profile_path == null ? (
									<img
										className="no-image"
										src={noImage}
										alt="no image available"
									/>
								) : (
									<img
										src={`https://image.tmdb.org/t/p/w342/${people[key].profile_path}`}
										alt={people[key].name}
									/>
								)}
							</Link>
							<h2>{people[key].name}</h2>
						</div>
					))}
				</PeopleContainerStyled>
			)}
		</>
	);
};

export default PeopleBlock;
