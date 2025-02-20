import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { useMap } from "react-leaflet";
import { useLocaleService } from "../../../../../services/locale";
import { MapComponent } from "../../../../components/MapReact";

/**
 * @typedef {Object} LocationModalProps
 * @property {(event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void} outsideClick
 * @property {(location: import("../../../../../types.js").Location) => void} onLocationSelect
 * @property {(event: React.MouseEvent<HTMLButtonElement>) => void} onLocationCancel
 * @property {import("../../../../../types.js").Location} location
 */

/**

 * @type React.FC<LocationModalProps>
 * @returns {React.ReactElement}
 */

export function LocationModal({
  outsideClick,
  onLocationSelect,
  onLocationCancel,
  location = { latitude: 0, longitude: 0, address: "", city: "", country: "" },
}) {
  const { LL } = useLocaleService();
  const [coordinates, setCoordinates] = useState([
    location.latitude.toString(),
    location.longitude.toString(),
  ]);
  const [form, setForm] = useState({
    address: location.address,
    city: location.city,
    country: location.country,
  });
  const [typedLat, typedLong] = coordinates;
  const [lat, long] = [Number(typedLat) || 0, Number(typedLong) || 0];
  const currentLocation = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onLocationCancel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    // if the locations are defined avoid setting the current location
    if (location.latitude > 0 && location.latitude > 0) return;

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
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
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
          onLocationSelect({
            latitude: lat,
            longitude: long,
            address: form.address,
            city: form.city,
            country: form.country,
          });
        }}
        className="w-[500px] max-w-[90%] bg-[#1b1a1a] z-10 p-5 flex flex-col gap-5 py-5"
      >
        <div className="text-gray-700 text-5xl">
          <button type="button" onClick={onLocationCancel}>
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
        <div className="px-2 w-full flex flex-col gap-3">
          <MapComponent
            onMarkerDrag={(e) => {
              const { lat, lng } = e.target.getLatLng();
              setCoordinates([lat, lng]);
            }}
            coordinates={[lat, long]}
            className="h-[200px] w-full"
          >
            <MapContext lat={lat} long={long} />
          </MapComponent>
          <input
            type="text"
            className="w-full text-white px-2 py-2 rounded border bg-[transparent]"
            placeholder={LL?.PAGES.PUBLISH.PLACEHOLDERS.ADDRESS()}
            value={form.address}
            onChange={(e) => {
              setForm({ ...form, address: e.target.value });
            }}
          />
          <div className="flex gap-2 w-full text-white">
            <input
              type="text"
              className="shrink grow px-2 w-1 py-2 rounded border bg-[transparent]"
              placeholder={LL?.PAGES.PUBLISH.PLACEHOLDERS.CITY()}
              value={form.city}
              onChange={(e) => {
                setForm({ ...form, city: e.target.value });
              }}
            />
            <input
              type="text"
              className="shrink grow px-2 w-1 py-2 rounded border bg-[transparent]"
              placeholder={LL?.PAGES.PUBLISH.PLACEHOLDERS.COUNTRY()}
              value={form.country}
              onChange={(e) => {
                setForm({ ...form, country: e.target.value });
              }}
            />
          </div>
          <div className="flex gap-2 w-full text-white pt-5 pb-2">
            <input
              placeholder={LL?.PAGES.PUBLISH.PLACEHOLDERS.LATITUDE()}
              className="shrink grow px-2 w-1 py-2 rounded border bg-[transparent]"
              type="text"
              value={typedLat}
              onChange={(e) => {
                setCoordinates([e.target.value, typedLong]);
              }}
            />
            <input
              placeholder={LL?.PAGES.PUBLISH.PLACEHOLDERS.LONGITUDE()}
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
            {LL.PAGES.PUBLISH.BUTTONS.SUBMIT_LOCATION()}
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
  // @ts-ignore
  location: PropTypes.shape({
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }),
};

function MapContext({ lat, long }) {
  const map = useMap();

  useEffect(() => {
    if (!lat || !long) return;

    map.setView([lat, long], map.getZoom());
  }, [lat, long]);

  return null;
}

MapContext.propTypes = {
  lat: PropTypes.number.isRequired,
  long: PropTypes.number.isRequired,
};
