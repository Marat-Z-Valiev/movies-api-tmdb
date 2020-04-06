import React from "react";
import {Link} from "react-router-dom";

const Person = ({actor}) => {
	const {id, name, profile_path} = actor;
	return (
		<div key={id}>
			<h2>{name}</h2>
			<Link to={`/personId=${id}`}>
				<img
					src={`https://image.tmdb.org/t/p/w185/${profile_path}`}
					alt={name}
				/>
			</Link>
		</div>
	);
};

export default Person;
