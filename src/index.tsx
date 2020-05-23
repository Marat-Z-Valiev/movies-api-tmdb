import React from "react";
import {render} from "react-dom";
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import rootReducer from "./store/slices";
import App from "./components/App";

const store = configureStore({reducer: rootReducer});

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("app")
);

export type AppDispatch = typeof store.dispatch;
