import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { LS_ANNOTATIONS_KEY } from "../constants";

const store = configureStore({
  reducer: rootReducer,
});

store.subscribe(() => {
  const annotationsValue = store.getState().annotations.value;
  localStorage.setItem(LS_ANNOTATIONS_KEY, JSON.stringify(annotationsValue));
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
