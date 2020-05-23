import {combineReducers} from "@reduxjs/toolkit";
import trendingMoviesReducer from "./trendingMovies";
import popularMoviesReducer from "./popularMovies";
import movieReducer from "./movie";
import movieCastReducer from "./movieCast";
import videoReducer from "./video";
import popularPeopleReducer from "./popularPeople";
import personReducer from "./person";
import movieCreditsReducer from "./movieCredits";

const rootReducer = combineReducers({
	trendingMovies: trendingMoviesReducer,
	popularMovies: popularMoviesReducer,
	movie: movieReducer,
	cast: movieCastReducer,
	video: videoReducer,
	popularPeople: popularPeopleReducer,
	person: personReducer,
	movieCredits: movieCreditsReducer,
});

export default rootReducer;
