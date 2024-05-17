import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { AnnotationType } from "../types";

/** Memoized to prevent excesive re-renders. */
export const countsByAnnotationTypeSelector = createSelector(
  (s: RootState) => s.annotations.value,
  (annotations) =>
    annotations.reduce((acc, annotation) => {
      acc[annotation.properties.icon as AnnotationType]++;
      return acc;
    }, Object.fromEntries(Object.values(AnnotationType).map((k) => [k, 0])) as Record<AnnotationType, number>)
);
