import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const initialState = {
	loading: false,
	hasErrors: false,
	video: {},
};

const videoSlice = createSlice({
	name: "video",
	initialState,
	reducers: {
		getVideo: (state) => {
			state.loading = true;
		},
		getVideoSuccess: (state, {payload}) => {
			state.video = payload;
			state.loading = false;
			state.hasErrors = false;
		},
		getVideoFailure: (state) => {
			state.loading = false;
			state.hasErrors = true;
		},
	},
});

export const {getVideo, getVideoSuccess, getVideoFailure} = videoSlice.actions;

export const videoSelector = (state) => state.video;
export const selectIsLoading = (state) => state.video.loading;
export const selectError = (state) => state.video.hasErrors;
export default videoSlice.reducer;

export function fetchVideo(movieId) {
	return async (dispatch) => {
		dispatch(getVideo());
		await axios
			.get(
				`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.API_KEY}&language=en-US`
			)
			.then((response) => {
				if (response.data.results.length) {
					dispatch(getVideoSuccess(response.data.results[0]));
				} else {
					dispatch(getVideoSuccess({}));
				}
			})
			.catch(() => dispatch(getVideoFailure()));
	};
}
