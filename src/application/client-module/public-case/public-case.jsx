import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getPublicCase } from "../../actions/GET/get-public-case";
import { addQueryParams } from "../../../utils/search-params";
import { Filters } from "./components/Filters";
import { MapTab } from "./components/MapTab";
import { ListTab } from "./components/ListTab";
import { Pagination } from "./components/Pagination";

export function PublicCase() {
  const [searchParams, setSearchParams] = useSearchParams();
  const isOptionsOpen = searchParams.has("options");
  const mapSearchParams = [...searchParams.entries()].reduce(
    (acc, [key, value]) => {
      if (key === "options") return acc;
      if (key === "tab") return acc;
      acc[key] = value;
      return acc;
    },
    {},
  );

  const isListTab = searchParams.get("tab") === "list";
  const isMapTab = searchParams.get("tab") === "map";

  // if not tab query param, set it to list
  useEffect(() => {
    if (["list", "map"].includes(searchParams.get("tab"))) return;

    searchParams.set("tab", "list");
    setSearchParams(searchParams);
  }, []);

  // if not limit query param, set it to 10
  useEffect(() => {
    if (searchParams.has("limit")) return;

    searchParams.set("limit", "10");
    setSearchParams(searchParams);
  }, []);

  // TODO: Document this effect
  useEffect(() => {
    setSearchParams(new URLSearchParams(searchParams));
  }, [searchParams]);

  const {
    data: [publicCases, message, _, total] = [],
    isLoading,
    error,
  } = useQuery({
    // eslint-disable-next-line no-underscore-dangle
    queryKey: ["public-case", { params: mapSearchParams }],
    queryFn: getPublicCase,
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log({ publicCases });

  return (
    <div className="flex flex-col relative grow h-full">
      <Tabs isMapTab={isMapTab} isListTab={isListTab} />
      {isListTab && (
        <div className="grow overflow-y-scroll">
          <ListTab loading={isLoading} publicCases={publicCases} />
          <div className="flex justify-center">
            <Pagination total={total} />
          </div>
        </div>
      )}

      <Filters
        isOpen={isOptionsOpen}
        className="absolute z-[1000] right-0 transition ease-in-out translate-x-full data-[is-open]:translate-x-0"
      />
      {isMapTab && <MapTab publicCases={publicCases} />}
    </div>
  );
}

function Tabs({ isListTab, isMapTab }) {
  const [searchParams] = useSearchParams();

  return (
    <div className="grid grid-cols-2 text-white relative">
      <Link
        to={`./?${addQueryParams(searchParams, "options")}`}
        className="absolute z-10 -bottom-10 right-0 mr-10 text-white text-3xl"
      >
        <FontAwesomeIcon icon={faAnglesLeft} />
      </Link>
      <div className="col-span-1">
        <Link
          to={`./?${addQueryParams(searchParams, "tab", "list")}`}
          data-is-selected={isListTab || null}
          className="button py-5 flex justify-center items-center bg-black data-[is-selected]:border-b border-b-green-400 data-[is-selected]:text-green-400"
        >
          List
        </Link>
      </div>
      <div className="col-span-1">
        <Link
          to={`./?${addQueryParams(searchParams, "tab", "map")}`}
          data-is-selected={isMapTab || null}
          className="button py-5 flex justify-center items-center bg-black data-[is-selected]:border-b border-b-green-400 data-[is-selected]:text-green-400"
        >
          Map
        </Link>
      </div>
    </div>
  );
}
