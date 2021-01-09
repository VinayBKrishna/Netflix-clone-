import React from "react";
import ReactDom from "react-dom";
import App from "./App";

import configureStore from "./store/configureStore";
import {Provider} from "react-redux";

import {startSetUser} from "./actions/userAction";
import {startSetMovie} from "./actions/moviesAction";
import {startSetTvShows} from "./actions/tvShowsAction";

import "bootstrap/dist/css/bootstrap.css";

const store = configureStore();
console.log(store.getState());
console.log("indexpage");

store.subscribe(() => {
  console.log(store.getState());
});

if (localStorage.getItem("authToken")) {
  store.dispatch(startSetUser());
  store.dispatch(startSetMovie());
  store.dispatch(startSetTvShows());
}

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDom.render(jsx, document.getElementById("root"));
