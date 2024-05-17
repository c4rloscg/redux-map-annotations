import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Annotation, AnnotationType } from "../types";
import CustomPoint from "../classes/CustomPoint";
import { LS_ANNOTATIONS_KEY } from "../constants";

export type AnnotationsState = {
  adding: AnnotationType | null;
  value: CustomPoint[];
  filters: Partial<Record<AnnotationType, boolean>>;
};

const persistedAnnotations = localStorage.getItem(LS_ANNOTATIONS_KEY);

const initialState: AnnotationsState = {
  adding: null,
  value: persistedAnnotations ? JSON.parse(persistedAnnotations) : [],
  filters: {},
};

const annotationsSlice = createSlice({
  name: "annotations",
  initialState,
  reducers: {
    toggleAdding(state, { payload }: PayloadAction<AnnotationType>) {
      state.adding = state.adding === payload ? null : payload;
    },
    addAnnotation(state, action: PayloadAction<Annotation["lngLat"]>) {
      if (state.adding) {
        state.value.push(
          new CustomPoint({ lngLat: action.payload, type: state.adding })
        );
        state.adding = null;
      }
    },
    toggleFilter(state, action: PayloadAction<AnnotationType>) {
      const newValue = !state.filters[action.payload];
      state.filters[action.payload] = newValue;
    },
  },
});

export const { toggleAdding, addAnnotation, toggleFilter } =
  annotationsSlice.actions;
export default annotationsSlice.reducer;
