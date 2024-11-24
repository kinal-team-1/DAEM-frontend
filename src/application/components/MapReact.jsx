import { Circle, MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import PropTypes from "prop-types";

const iconBlue = new Icon({
  iconUrl: "/marker-icon.png",
  className:
    "ml-[-12px] mt-[-41px] w-[25px] h-[41px] transform translate3d-[222px,100px,0px] z-[100]",
});

/**
 * @typedef {Object} MapComponentProps
 * @property {string} className
 * @property {number[]} coordinates
 * @property {number} [radius]
 * @property {boolean} [isMarkerDraggable]
 * @property {React.ReactNode} [children]
 * @property {(e: L.DragEndEvent) => void} [onMarkerDrag]
 * @property {number} [defaultZoom]
 * @property {number} [zoom]
 */

/**
 * @type React.FC<MapComponentProps>
 */
export function MapComponent({
  className,
  coordinates: [lat, long],
  radius,
  children,
  isMarkerDraggable = true,
  onMarkerDrag,
  defaultZoom = 16,
  zoom,
}) {
  return (
    <MapContainer
      center={[lat, long]}
      zoom={zoom || defaultZoom}
      scrollWheelZoom
      className={className}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
        minZoom={7}
      />
      <Marker
        position={[lat, long]}
        draggable={isMarkerDraggable}
        eventHandlers={{
          dragend(e) {
            if (!isMarkerDraggable) return;

            onMarkerDrag(e);
          },
        }}
        icon={iconBlue}
      />
      {radius && (
        <Circle
          center={[lat, long]}
          pathOptions={{
            color: "rgb(0,72,255, 0.4)",
            fillColor: "rgb(0,72,255, 0.4)",
            fillOpacity: 0.5,
          }}
          radius={radius * 1000}
        />
      )}
      {children}
    </MapContainer>
  );
}

MapComponent.propTypes = {
  className: PropTypes.string.isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  children: PropTypes.node,
  isMarkerDraggable: PropTypes.bool,
  radius: PropTypes.number,
  onMarkerDrag: PropTypes.func,
  defaultZoom: PropTypes.number,
  zoom: PropTypes.number,
};
