import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
	fetchPopularPeople,
	popularPeopleSelector,
} from "../../store/slices/popularPeople";
import PeopleContainer from "../PeopleContainer/PeopleContainer";
import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";

const PeoplePage = () => {
	const dispatch = useDispatch();
	const {loading, popularPeople, hasErrors} = useSelector(
		popularPeopleSelector
	);
	useEffect(() => {
		dispatch(fetchPopularPeople());
	}, [dispatch]);

	return (
		<>
			{hasErrors ? <Error /> : ""}
			<h1 style={{textAlign: "center", color: "#ffffff"}}>People</h1>
			{loading ? <Spinner /> : <PeopleContainer people={popularPeople} />}
		</>
	);
};

export default PeoplePage;
