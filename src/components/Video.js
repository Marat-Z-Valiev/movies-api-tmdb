import React, {useState, useEffect} from "react";
import axios from "axios";
import styled from "styled-components";
import Spinner from "./Spinner";

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
	let [video, setVideo] = useState({});
	let [isVideo, setIsVideo] = useState(true);
	let [isLoading, setIsLoading] = useState(true);

	const getVideos = async () => {
		await axios
			.get(
				`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=f8efee7e451d2ca98ae50114ad74aeeb&language=en-US`
			)
			.then((response) => {
				if (response.data.results.length) {
					setVideo((video = response.data.results[0]));
					setIsVideo((isVideo = true));
					setIsLoading((isLoading = false));
				} else {
					setIsLoading((isLoading = false));
					video = {};
					setIsVideo((isVideo = false));
				}
			})
			.catch((err) => console.log(`this is error ${err}`));
	};

	useEffect(() => {
		getVideos();
	}, []);

	const {type, name, key} = video;
	let windowWidth = window.innerWidth;
	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				<>
					<StyledVideo>
						{isVideo ? (
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

export default Video;
