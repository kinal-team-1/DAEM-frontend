import { memo, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { circle, map, marker, tileLayer } from "leaflet";
import PropTypes from "prop-types";

/**
 * @typedef {Object} MapProps
 * @property {string} [className] - CSS class
 * @property {number[]} coordinates - Latitude and longitude
 * @property {(coordinates: L.LatLng, map: L.Map, marker: L.Marker) => void} onMapClick - Map click event
 * @property {(coordinates: L.LatLng, map: L.Map, marker: L.Marker) => void} onMarkerDrag - Marker drag event
 */

/**
 * Map component
 * @param {MapProps} props - Component props
 * @returns {JSX.Element}
 */
function MapComponent({
  className,
  coordinates: [lat, long],
  onMapClick,
  onMarkerDrag,
}) {
  const mapInstance = /** @type L.Map */ useRef(null);
  const markerInstance = useRef(null);
  const circleLayer = useRef(null);

  useEffect(() => {
    if (mapInstance.current) return;

    mapInstance.current = map("map");
    tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      minZoom: 13,
    }).addTo(mapInstance.current);

    mapInstance.current.on("click", (event) => {
      onMapClick(
        event.target.getLatLng(),
        mapInstance.current,
        markerInstance.current,
      );
    });
  }, []);

  useEffect(() => {
    markerInstance.current?.remove();
    markerInstance.current = marker([lat, long], {
      draggable: true,
    }).addTo(mapInstance.current);
    markerInstance.current.on("dragend", (event) => {
      onMarkerDrag(
        event.target.getLatLng(),
        mapInstance.current,
        markerInstance.current,
      );
    });
  }, [lat, long]);

  useEffect(() => {
    console.log("MAP COORDINATES CHANGED", lat, long);
    if (circleLayer.current) {
      mapInstance.current.removeLayer(circleLayer.current);
    }

    mapInstance.current.setView(
      [lat, long],
      mapInstance.current.getZoom() || 16,
    );

    circleLayer.current = circle([lat, long], {
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
  onMapClick: PropTypes.func.isRequired,
  onMarkerDrag: PropTypes.func.isRequired,
};

export const Map = memo(MapComponent, (prevProps, nextProps) => {
  const [prevLat, prevLong] = prevProps.coordinates;
  const [nextLat, nextLong] = nextProps.coordinates;

  return prevLat === nextLat && prevLong === nextLong;
});
