import { LngLat } from "maplibre-gl";

export type Option = {
  label: string;
  value: string;
};

export enum AnnotationType {
  Circle = "Circle",
  Square = "Square",
  Triangle = "Triangle",
  Taco = "Taco",
  Ramen = "Ramen",
  Pizza = "Pizza",
  Maya = "Maya",
}

export type Annotation = {
  type: AnnotationType;
  lngLat: Pick<LngLat, "lat" | "lng">;
};

export type Filter = {
  type: AnnotationType;
  count: number;
  isActive: boolean;
};

export enum MenuListPlacement {
  Top = "top",
  Bottom = "bottom",
}
