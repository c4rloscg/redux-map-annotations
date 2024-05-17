import { AnnotationType, Option } from "../types";

export const getAnnotationOptions = () => {
  return Object.entries(AnnotationType).reduce((acc, [label, value]) => {
    acc.push({ label, value });
    return acc;
  }, [] as Option[]);
};
