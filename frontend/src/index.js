import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import { configureStore } from "@reduxjs/toolkit";
import { getUsers } from "./actions/users.actions";
import { getPosts } from "./actions/post.action";

const store = configureStore({ reducer: rootReducer });

store.dispatch(getUsers());
store.dispatch(getPosts());

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
