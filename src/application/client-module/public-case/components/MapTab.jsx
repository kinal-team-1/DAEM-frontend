import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import PropTypes from "prop-types";
import { MapComponent } from "../../../components/MapReact";

const iconRed = new Icon({
  iconUrl: "/marker-icon-red.png",
  className:
    "ml-[-12px] mt-[-41px] w-[25px] h-[41px] transform translate3d-[222px,100px,0px] z-[100]",
});

export function MapTab({ publicCases }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [lat, long, radius] = [
    searchParams.get("lat"),
    searchParams.get("long"),
    searchParams.get("radius"),
  ];

  useEffect(() => {
    if (lat && long) return;

    navigator.geolocation.getCurrentPosition((position) => {
      const coords = [
        position.coords.latitude.toString(),
        position.coords.longitude.toString(),
      ];

      searchParams.set("lat", coords[0]);
      searchParams.set("long", coords[1]);
      setSearchParams(searchParams);
    });
  }, [lat, long]);

  return (
    <div className="h-full flex justify-center items-center w-full px-3 py-5">
      <div className="max-w-[700px] h-full w-full">
        <MapComponent
          radius={Number(radius) || null}
          coordinates={[Number(lat), Number(long)]}
          isMarkerDraggable={false}
          className="w-full h-full"
        >
          {publicCases &&
            publicCases.map((pub) => {
              // eslint-disable-next-line no-shadow
              const [long, lat] = pub.location.location_point.coordinates;

              return (
                <Marker
                  key={`${lat}/${long}`}
                  position={[lat, long]}
                  icon={iconRed}
                >
                  <Popup>
                    <div className="flex gap-4 justify-center items-center">
                      <div className="flex flex-col gap-1 max-w-[200px]">
                        <h2 className="text-xl line-clamp-1">{pub.title}</h2>
                        <div className="line-clamp-1 text-xs">
                          {pub.location.address}
                        </div>
                      </div>
                      <Link
                        // eslint-disable-next-line no-underscore-dangle
                        to={`/public-case/${pub._id}`}
                        className="text-2xl text-green-400"
                      >
                        <FontAwesomeIcon icon={faChevronRight} />
                      </Link>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
        </MapComponent>
      </div>
    </div>
  );
}

MapTab.propTypes = {
  publicCases: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      reported_at: PropTypes.string,
      attachment: PropTypes.string,
    }),
  ).isRequired,
};
