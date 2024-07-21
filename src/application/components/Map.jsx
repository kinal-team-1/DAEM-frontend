import { memo, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { circle, Icon, map, marker, tileLayer } from "leaflet";
import PropTypes from "prop-types";

const iconBlue = new Icon({
  iconUrl: "/marker-icon.png",
  // className: "leaflet-marker-icon",
  // margin-left: -12px; margin-top: -41px; width: 25px; height: 41px; transform: translate3d(222px, 100px, 0px); z-index: 100
  className:
    "ml-[-12px] mt-[-41px] w-[25px] h-[41px] transform translate3d-[222px,100px,0px] z-[100]",
});

const iconRed = new Icon({
  iconUrl: "/marker-icon-red.png",
  // className: "leaflet-marker-icon",
  // margin-left: -12px; margin-top: -41px; width: 25px; height: 41px; transform: translate3d(222px, 100px, 0px); z-index: 100
  className:
    "ml-[-12px] mt-[-41px] w-[25px] h-[41px] transform translate3d-[222px,100px,0px] z-[100]",
});

/**
 * @typedef {Object} MapComponentProps
 * @property {string} className
 * @property {number[]} coordinates
 * @property {(coordinates: L.LatLng, map: L.Map, marker: L.Marker) => void} onMapClick
 * @property {(coordinates: L.LatLng, map: L.Map, marker: L.Marker) => void} onMarkerDrag
 * @property {number} [radius]
 * @property {[number, number][]} [markers]
 * @property {boolean} [isMarkerDraggable]
 */

/**
 * @type React.FC<MapComponentProps>
 */
function MapComponent({
  className,
  coordinates: [lat, long],
  onMapClick,
  onMarkerDrag,
  radius,
  markers,
  isMarkerDraggable = true,
}) {
  const mapInstance = /** @type L.Map */ useRef(null);
  const markerInstance = useRef(null);
  const circleLayer = useRef(null);

  useEffect(() => {
    if (mapInstance.current) return;

    mapInstance.current = map("map");
    tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      minZoom: 7,
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
      draggable: isMarkerDraggable,
      icon: iconBlue,
    }).addTo(mapInstance.current);
    markerInstance.current.on("dragend", (event) => {
      onMarkerDrag(
        event.target.getLatLng(),
        mapInstance.current,
        markerInstance.current,
      );
    });
  }, [lat, long]);

  // change view when coordinates change
  useEffect(() => {
    mapInstance.current.setView(
      [lat, long],
      mapInstance.current.getZoom() || 16,
    );
  }, [lat, long]);

  // change radius when coordinates change
  useEffect(() => {
    if (!Number.isFinite(radius)) return;
    if (circleLayer.current) {
      mapInstance.current.removeLayer(circleLayer.current);
    }

    circleLayer.current = circle([lat, long], {
      color: "rgb(0,72,255, 0.4)",
      fillColor: "rgb(0,72,255, 0.4)",
      fillOpacity: 0.5,
      radius: radius * 1000,
    }).addTo(mapInstance.current);
  }, [lat, long, radius]);

  //   add marker for each coordinate
  useEffect(() => {
    if (!markers || markers.length < 1) return;

    // eslint-disable-next-line no-shadow
    markers.forEach(([lat, long]) => {
      const newMarker = marker([lat, long], {
        icon: iconRed,
      }).addTo(mapInstance.current);
      newMarker.bindPopup("Marker Message");
    });
  }, [markers]);

  return <div id="map" className={className} />;
}

MapComponent.propTypes = {
  className: PropTypes.string.isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  onMapClick: PropTypes.func.isRequired,
  onMarkerDrag: PropTypes.func.isRequired,
  radius: PropTypes.number,
  markers: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  isMarkerDraggable: PropTypes.bool,
};

export const Map = memo(MapComponent, (prevProps, nextProps) => {
  const [prevLat, prevLong] = prevProps.coordinates;
  const [nextLat, nextLong] = nextProps.coordinates;
  const prevRadius = prevProps.radius;
  const nextRadius = nextProps.radius;
  const nextMarkers = nextProps.markers;
  const prevIsMarkerDraggable = prevProps.isMarkerDraggable;
  const nextIsMarkerDraggable = nextProps.isMarkerDraggable;

  return (
    prevLat === nextLat &&
    prevLong === nextLong &&
    prevRadius === nextRadius &&
    prevIsMarkerDraggable === nextIsMarkerDraggable &&
    !nextMarkers
  );
});
