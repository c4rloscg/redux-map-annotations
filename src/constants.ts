import { AnnotationType } from "./types";

export const LS_ANNOTATIONS_KEY = "annotations";

export const ANNOTATIONS_SOURCE = "annotations";

export const IMAGES_BY_ANNOTATION_TYPE: Record<AnnotationType, string> = {
  [AnnotationType.Maya]: "https://i.imgur.com/vfo7Xw3.png",
  [AnnotationType.Circle]:
    "https://cdn-icons-png.flaticon.com/512/9222/9222756.png",
  [AnnotationType.Triangle]:
    "https://cdn-icons-png.flaticon.com/512/1885/1885359.png",
  [AnnotationType.Square]:
    "https://cdn-icons-png.flaticon.com/512/747/747383.png",
  [AnnotationType.Taco]:
    "https://cdn-icons-png.flaticon.com/512/1287/1287920.png",
  [AnnotationType.Ramen]:
    "https://cdn-icons-png.flaticon.com/512/5685/5685825.png",
  [AnnotationType.Pizza]:
    "https://cdn-icons-png.flaticon.com/512/599/599995.png",
};

export const ICON_SIZES_BY_ANNOTATION_TYPE: Partial<
  Record<AnnotationType, number>
> = {};
