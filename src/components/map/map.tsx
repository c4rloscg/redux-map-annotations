import { FC, useEffect, useState } from "react";
import { Map } from "maplibre-gl";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { addAnnotation } from "../../redux/annotations_reducer";
import { ANNOTATIONS_SOURCE, IMAGES_BY_ANNOTATION_TYPE } from "../../constants";

import "maplibre-gl/dist/maplibre-gl.css";
import "./map.css";

const MapComponent: FC = () => {
  const [mapInstance, setMapInstance] = useState<Map | null>(null);
  const points = useAppSelector((s) => s.annotations.value);
  const filters = useAppSelector((s) => s.annotations.filters);
  const dispatch = useAppDispatch();
  const [mapContainer, setMapContainer] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mapContainer) {
      // Initialize the map.
      const map = new Map({
        container: mapContainer,
        style: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
        fitBoundsOptions: { padding: 20 },
        center: [-117.1656043, 32.748574],
        zoom: 15,
      });

      // Add map layers on map initialized.
      map.on("load", function () {
        Object.entries(IMAGES_BY_ANNOTATION_TYPE).forEach(
          async ([type, url]) => {
            const image = await map.loadImage(url);
            if (image.data) map.addImage(type, image.data);
          }
        );

        map.addSource(ANNOTATIONS_SOURCE, {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            // @ts-ignore
            features: points,
          },
        });

        map.addLayer({
          id: "points",
          type: "symbol",
          source: ANNOTATIONS_SOURCE,
          layout: {
            "icon-image": "{icon}",
            "icon-size": ["get", "iconSize"],
          },
        });
      });

      map.on("click", (e) => {
        dispatch(addAnnotation(e.lngLat));
      });

      setMapInstance(map);

      return () => {
        // Destroy map instance on unmount.
        mapInstance?.remove();
      };
    }
  }, [mapContainer]);

  useEffect(() => {
    if (!mapInstance) return;

    // @ts-ignore
    mapInstance.getSource(ANNOTATIONS_SOURCE)?.setData({
      type: "FeatureCollection",
      features: points,
    });
  }, [points]);

  useEffect(() => {
    if (mapInstance) {
      const enabledFilters = Object.entries(filters).reduce<string[]>(
        (acc, [k, v]) => {
          if (v) acc.push(k);
          return acc;
        },
        []
      );

      mapInstance.setFilter(
        "points",
        enabledFilters.length ? ["in", "icon", ...enabledFilters] : undefined
      );
    }
  }, [filters]);

  return <div id="map" ref={setMapContainer} />;
};

export default MapComponent;
