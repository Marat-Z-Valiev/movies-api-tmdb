import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {Video} from "../../types";
import {AppDispatch} from "../../index";

export const initialState: Video = {
	loading: false,
	hasErrors: false,
	video: {},
};

const videoSlice = createSlice({
	name: "video",
	initialState,
	reducers: {
		getVideo: (state: any) => {
			state.loading = true;
		},
		getVideoSuccess: (state: any, {payload}: any) => {
			state.video = payload;
			state.loading = false;
			state.hasErrors = false;
		},
		getVideoFailure: (state: any) => {
			state.loading = false;
			state.hasErrors = true;
		},
	},
});

export const {getVideo, getVideoSuccess, getVideoFailure} = videoSlice.actions;

export const videoSelector = (state: any) => state.video;
export const selectIsLoading = (state: any) => state.video.loading;
export const selectError = (state: any) => state.video.hasErrors;
export default videoSlice.reducer;

export function fetchVideo(movieId: string) {
	return async (dispatch: AppDispatch) => {
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
