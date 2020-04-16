import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import PeopleContainerStyled from "./styles/PeopleContainerStyled";
import Spinner from "./Spinner";
import noImage from "../images/no-image-available.jpg";

const PeopleContainer = ({people, isLoading}) => {
	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				<PeopleContainerStyled>
					{Object.keys(people).map((key) => (
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
							<h2 className="name">{people[key].name}</h2>
						</div>
					))}
				</PeopleContainerStyled>
			)}
		</>
	);
};

PeopleContainer.propTypes = {
	people: PropTypes.array.isRequired,
	isLoading: PropTypes.bool,
};

export default PeopleContainer;
