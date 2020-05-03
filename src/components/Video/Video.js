import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";
import {fetchVideo, videoSelector} from "../../store/slices/video";

const StyledVideo = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 50px;
	margin-bottom: 100px;

	h2 {
		font-size: 2em;
		text-align: center;
	}
`;

const Video = ({movieId}) => {
	const dispatch = useDispatch();
	const {loading, video, hasErrors} = useSelector(videoSelector);
	useEffect(() => {
		dispatch(fetchVideo(movieId));
	}, [dispatch]);

	const {type, name, key} = video;
	let windowWidth = window.innerWidth;
	return (
		<>
			{hasErrors ? <Error /> : ""}
			{loading ? (
				<Spinner />
			) : (
				<>
					<StyledVideo>
						{type ? (
							<>
								<h2>{type}</h2>
								<iframe
									title={name}
									width={windowWidth > 425 ? 800 : 400}
									height={windowWidth > 425 ? 450 : 225}
									src={`https://www.youtube.com/embed/${key}?modestbranding=1&showinfo=0&rel=0&iv_load_policy=3`}
									frameBorder="0"
								></iframe>
							</>
						) : (
							""
						)}
					</StyledVideo>
				</>
			)}
		</>
	);
};

Video.propTypes = {
	movieId: PropTypes.string.isRequired,
};

export default Video;
