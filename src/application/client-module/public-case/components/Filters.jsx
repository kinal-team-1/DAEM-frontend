import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { faClose, faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMap } from "react-leaflet";
import PropTypes from "prop-types";
import { Switch } from "../../../components/Switch";
import { MapComponent } from "../../../components/MapReact";
import { removeQueryParams } from "../../../../utils/search-params";

export function Filters({ className, isOpen }) {
  const [searchParams] = useSearchParams();
  const [newSearchParams, setNewSearchParams] = useState(
    new URLSearchParams(searchParams),
  );
  const [coordinates, setCoordinates] = useState([
    searchParams.get("lat") || "0",
    searchParams.get("long") || "0",
  ]);
  const [hasLocation, setHasLocation] = useState(false);
  const [typedLat, typedLong] = coordinates;
  const [lat, long] = [Number(typedLat) || 0, Number(typedLong) || 0];
  const [radius, setRadius] = useState(searchParams.get("radius") || null);
  const [limit, setLimit] = useState(searchParams.get("limit") || 10);
  const [page, setPage] = useState(searchParams.get("page") || 1);

  useEffect(() => {
    setNewSearchParams(new URLSearchParams(searchParams));
  }, [searchParams]);

  const userLocationRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (hasLocation) return;

    newSearchParams.delete("lat");
    newSearchParams.delete("long");
    newSearchParams.delete("radius");
    setNewSearchParams(new URLSearchParams(newSearchParams));
  }, [hasLocation]);

  useEffect(() => {
    console.log({ page, limit });
    if (radius && hasLocation) newSearchParams.set("radius", radius);
    if (lat && hasLocation) newSearchParams.set("lat", `${lat}`);
    if (long && hasLocation) newSearchParams.set("long", `${long}`);
    if (limit && hasLocation) newSearchParams.set("limit", `${limit}`);
    if (page) newSearchParams.set("page", `${page}`);
    setNewSearchParams(new URLSearchParams(newSearchParams));
  }, [lat, long, radius, limit, page, hasLocation]);

  function askLocation() {
    if (userLocationRef.current) {
      setCoordinates(userLocationRef.current);
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      const coords = [
        position.coords.latitude.toString(),
        position.coords.longitude.toString(),
      ];

      setCoordinates(coords);
      userLocationRef.current = coords;
    });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        navigate(`./?${removeQueryParams(newSearchParams, "options")}`);
      }}
      data-is-open={isOpen || null}
      className={`h-full w-[300px] bg-black text-silver-500 px-5 py-5 flex flex-col justify-between gap-4 ${className}`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex text-silver-500 text-3xl">
          <Link to={`./?${removeQueryParams(newSearchParams, "options")}`}>
            <FontAwesomeIcon icon={faClose} />
          </Link>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="limit"
            className="shrink min-w-0 bg-[inherit] border rounded px-2 text-sm"
            value={limit}
            onChange={(e) => {
              setLimit(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="page"
            className="shrink min-w-0 bg-[inherit] border rounded px-2 text-sm"
            value={page}
            onChange={(e) => {
              setPage(e.target.value);
            }}
          />
        </div>
        <p>Location</p>

        <div className="flex gap-2 items-center">
          <Switch
            isChecked={hasLocation}
            handleChange={() => {
              setHasLocation(!hasLocation);
            }}
          />
          <p>Use location</p>
        </div>

        {hasLocation && (
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 w-full">
              <input
                type="text"
                placeholder="lat"
                className="shrink min-w-0 bg-[inherit] border rounded px-2 text-sm"
                value={typedLat}
                onChange={(e) => {
                  setCoordinates([e.target.value, typedLong]);
                }}
              />
              <input
                type="text"
                placeholder="long"
                className="shrink min-w-0 bg-[inherit] border rounded px-2 text-sm"
                value={typedLong}
                onChange={(e) => {
                  setCoordinates([typedLat, e.target.value]);
                }}
              />
              <button
                type="button"
                onClick={askLocation}
                className="bg-white text-black px-2 rounded flex justify-center items-center"
              >
                <FontAwesomeIcon icon={faLocationArrow} />
              </button>
            </div>
            <input
              type="text"
              placeholder="radius"
              className="w-full bg-[inherit] border rounded px-2 text-sm"
              value={radius || 0}
              onChange={(e) => {
                setRadius(+e.target.value);
              }}
            />
            <MapComponent
              onMarkerDrag={(e) => {
                // eslint-disable-next-line no-shadow
                const { lat, lng } = e.target.getLatLng();
                setCoordinates([lat, lng]);
              }}
              radius={radius || null}
              coordinates={[lat, long]}
              className="h-[150px] w-full"
            >
              <MapContext lat={lat} long={long} />
            </MapComponent>
          </div>
        )}
      </div>
      <Link
        to={`./?${removeQueryParams(newSearchParams, "options")}`}
        className="bg-green-400 text-white p-3 rounded flex justify-center items-center"
      >
        <button type="submit" className="invisible" />
        Apply
      </Link>
    </form>
  );
}

Filters.propTypes = {
  className: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
};

function MapContext({ lat, long }) {
  const map = useMap();
  useEffect(() => {
    if (!lat || !long) return;
    console.log(map);

    console.log(lat, long);
    map.flyTo([lat, long], map.getZoom());
  }, [lat, long]);

  return null;
}

MapContext.propTypes = {
  lat: PropTypes.number.isRequired,
  long: PropTypes.number.isRequired,
};
