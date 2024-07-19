import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { Map } from "../../../components/Map";

/**
 * @typedef {Object} LocationModalProps
 * @property {(event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void} outsideClick
 * @property {(coordinates: [number, number]) => void} onLocationSelect
 * @property {(event: React.MouseEvent<HTMLButtonElement>) => void} onLocationCancel
 */

/**

 * @param {LocationModalProps} props
 * @returns {JSX.Element}
 * @constructor
 */

export function LocationModal({
  outsideClick,
  onLocationSelect,
  onLocationCancel,
}) {
  // const [coordinates, setCoordinates] = useState([0, 0]);
  const [coordinates, setCoordinates] = useState(["0", "0"]);
  const [typedLat, typedLong] = coordinates;
  const [lat, long] = [Number(typedLat) || 0, Number(typedLong) || 0];
  const currentLocation = useRef(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoordinates([
        position.coords.latitude.toString(),
        position.coords.longitude.toString(),
      ]);
      currentLocation.current = [
        position.coords.latitude,
        position.coords.longitude,
      ];
    });
  }, []);

  return (
    <div className="fixed top-0 h-dvh flex justify-center items-center w-full z-20">
      <div
        role="dialog"
        onClick={outsideClick}
        onKeyDown={(e) => {
          if (e.key === "Esc") {
            outsideClick(e);
          }
        }}
        className="bg-black/60 h-full w-full absolute"
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onLocationSelect([lat, long]);
        }}
        className="w-[500px] bg-[#1b1a1a] z-10 p-5 flex flex-col gap-5 py-5"
      >
        <div className="text-gray-700 text-5xl">
          <button type="button" onClick={onLocationCancel}>
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
        <div className="px-2 w-full">
          <Map
            onMapClick={(latLng, map, marker) => {
              map.setView(latLng);
              marker.setLatLng(latLng);
              setCoordinates([latLng.lat.toString(), latLng.lng.toString()]);
            }}
            onMarkerDrag={(latLng, map, marker) => {
              map.setView(latLng);
              marker.setLatLng(latLng);
              setCoordinates([latLng.lat.toString(), latLng.lng.toString()]);
            }}
            coordinates={[lat, long]}
            className="h-[200px] w-full"
          />
          <div className="flex gap-2 w-full py-3 text-white">
            <input
              placeholder="Latitude"
              className="shrink grow px-2 w-1 py-2 rounded border bg-[transparent]"
              type="text"
              value={typedLat}
              onChange={(e) => {
                setCoordinates([e.target.value, typedLong]);
              }}
            />
            <input
              placeholder="Longitude"
              className="shrink grow px-2 w-1 py-2 rounded border bg-[transparent]"
              type="text"
              value={typedLong}
              onChange={(e) => {
                setCoordinates([typedLat, e.target.value]);
              }}
            />
            <button
              type="button"
              onClick={() => {
                setCoordinates(currentLocation.current);
              }}
              className="px-4 py-2 bg-black text-white rounded"
            >
              <FontAwesomeIcon icon={faLocationArrow} />
            </button>
          </div>
          <button
            type="submit"
            className="px-3 py-3 flex justify-center items-center bg-green-400 w-full rounded-xl"
          >
            Accept
          </button>
        </div>
      </form>
    </div>
  );
}

LocationModal.propTypes = {
  outsideClick: PropTypes.func.isRequired,
  onLocationSelect: PropTypes.func.isRequired,
  onLocationCancel: PropTypes.func.isRequired,
};
