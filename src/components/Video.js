import React, {useState, useEffect} from "react";
import axios from "axios";
import styled from "styled-components";
import Spinner from "./Spinner";

const StyledVideo = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Video = ({movieId}) => {
	let [videos, setVideos] = useState([]);
	let [isLoading, setIsLoading] = useState(true);

	const getVideos = async () => {
		await axios
			.get(
				`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=f8efee7e451d2ca98ae50114ad74aeeb&language=en-US`
			)
			.then(response => {
				setVideos((videos = response.data.results));
				setIsLoading((isLoading = false));
			})
			.catch(err => console.log(`this is error ${err}`));
	};

	useEffect(() => {
		getVideos();
	}, []);

	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				<>
					<StyledVideo>
						{videos.length
							? Object.keys(videos.slice(0, 1)).map(key => (
									<>
										<h2>{videos[key].type}</h2>
										<iframe
											title={videos[key].name}
											width="800"
											height="450"
											src={`https://www.youtube.com/embed/${videos[key].key}?rel=0&fs=0`}
											frameborder="0"
										></iframe>
									</>
							  ))
							: ""}
					</StyledVideo>
				</>
			)}
		</>
	);
};

export default Video;
