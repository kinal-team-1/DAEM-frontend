import { memo, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { circle, map, marker, tileLayer } from "leaflet";
import PropTypes from "prop-types";

/**
 * @typedef {Object} MapProps
 * @property {string} [className] - CSS class
 * @property {number[]} coordinates - Latitude and longitude
 */

/**
 * Map component
 * @param {MapProps} props - Component props
 * @returns {JSX.Element}
 */
function MapComponent({ className, coordinates: [lat, long] }) {
  console.log("MAP RE RENDERED");
  const mapInstance = useRef(null);
  const markerInstance = useRef(null);

  useEffect(() => {
    if (mapInstance.current) return;

    mapInstance.current = map("map");
    tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      minZoom: 13,
    }).addTo(mapInstance.current);

    mapInstance.current.on("click", (event) => {
      console.log("MAP CLICKED", event.latlng);
    });
  }, []);

  useEffect(() => {
    markerInstance.current?.remove();
    markerInstance.current = marker([lat, long], {
      draggable: true,
    }).addTo(mapInstance.current);
    markerInstance.current.on("dragend", (event) => {
      console.log("MARKER DRAGGED", event.target.getLatLng());
    });
  }, [lat, long]);

  useEffect(() => {
    console.log("MAP COORDINATES CHANGED", lat, long);

    mapInstance.current.setView([lat, long], 13);
    circle([lat, long], {
      color: "rgb(0,72,255, 0.4)",
      fillColor: "rgb(0,72,255, 0.4)",
      fillOpacity: 0.5,
      radius: 100,
    }).addTo(mapInstance.current);
  }, [lat, long]);

  return <div id="map" className={className} />;
}

MapComponent.propTypes = {
  className: PropTypes.string.isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export const Map = memo(MapComponent, (prevProps, nextProps) => {
  const [prevLat, prevLong] = prevProps.coordinates;
  const [nextLat, nextLong] = nextProps.coordinates;

  return prevLat === nextLat && prevLong === nextLong;
});
