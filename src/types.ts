export interface Video {
	loading: boolean;
	hasErrors: boolean;
	video: Object;
}

export interface TrendingMovies {
	trendingMovies: [];
	loading: boolean;
	hasErrors: boolean;
}

export interface PopularPeople {
	popularPeople: [];
	loading: boolean;
	hasErrors: boolean;
}

export interface PopularMovies {
	popularMovies: [];
	loading: boolean;
	hasErrors: boolean;
}

export interface Person {
	person: Object;
	loading: boolean;
	hasErrors: boolean;
}

export interface MovieCredits {
	movieCredits: [];
	loading: boolean;
	hasErrors: boolean;
}

export interface Cast {
	cast: [];
	loading: boolean;
	hasErrors: boolean;
}

export interface Movie {
	movie: Object;
	loading: boolean;
	hasErrors: boolean;
}
