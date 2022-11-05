import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "../reducers/locationReducer";

const store = configureStore({ reducer: locationReducer });

export default store;
