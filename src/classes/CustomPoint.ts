import { ICON_SIZES_BY_ANNOTATION_TYPE } from "../constants";
import { Annotation } from "../types";

export default class CustomPoint {
  type = "Feature";
  properties = {
    icon: "",
    iconSize: 0.08,
  };
  geometry = {
    type: "Point",
    coordinates: [] as number[],
  };
  constructor({ lngLat, type }: Annotation) {
    this.properties.icon = type;
    this.properties.iconSize =
      ICON_SIZES_BY_ANNOTATION_TYPE[type] ?? this.properties.iconSize;
    this.geometry.coordinates.push(lngLat.lng, lngLat.lat);
  }
}
