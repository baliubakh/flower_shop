"use client";

import React, { useEffect, useRef } from "react";
import styles from "../../home.module.scss";
import mapboxgl, { GeoJSONSourceRaw } from "mapbox-gl";

const FindUs = () => {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GL_TOKEN || "";

    if (mapContainer.current) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/outdoors-v12",
        center: [31.8522, 49.2277],
        minZoom: 9,
        zoom: 12,
        maxZoom: 15,
        interactive: false,
      });

      return () => map.remove();
    }
  }, []);

  return (
    <div className={styles.mapWrapper}>
      <div ref={mapContainer} className={styles.map} />
    </div>
  );
};

export default FindUs;
