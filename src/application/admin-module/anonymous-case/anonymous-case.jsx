import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAllAnonymousCases } from "../../actions/GET/get-anonymus-cases";
import { AnonymousCaseCard } from "../components/AnonymousCaseCard";

const addQueryParams = (searchParams, param, value) => {
  const newSearchParams = new URLSearchParams(searchParams);
  newSearchParams.set(param, value || "");
  return newSearchParams.toString().replace(/=(?=&|$)/gm, "");
};

const getPages = (total, limit) => Math.ceil(total / limit);

export function AnonymousCase() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.has("limit")) return;

    searchParams.set("limit", "10");
    setSearchParams(searchParams);
  }, []);

  const limit = searchParams.get("limit");
  const selectedPage = searchParams.get("page") || "1";

  const {
    data: [anonymousCases, message, _, total] = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["anonymous-cases", { params: searchParams }],
    queryFn: getAllAnonymousCases,
  });

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="border-b-green-400 rounded-full size-[80px] border-vulcan-500 border-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const pagesList = Array.from(Array(getPages(total, limit)), (_, i) => i + 1);

  return (
    <div className="flex flex-col gap-3 items-center relative h-full">
      <div className="flex flex-col gap-3 h-full overflow-y-scroll w-full max-w-[800px] py-10 px-3">
        {anonymousCases.map((anonCase) => (
          <AnonymousCaseCard
            key={anonCase._id}
            description={anonCase.description}
            reported_at={anonCase.reported_at}
            id={anonCase._id}
            attachment={anonCase.attachment}
            className="bg-black/70 text-white"
          />
        ))}
      </div>
      <div className="absolute rounded-full bg-black/80 bottom-0 max-w-[800px] py-3 px-10 text-white mb-5 flex justify-center items-center w-full gap-5">
        <Link
          to={`./?${addQueryParams(searchParams, "page", Math.max(+selectedPage - 1, 1))}`}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        {pagesList.map((page) => {
          return (
            <Link
              key={page}
              data-is-selected={page === Number(selectedPage) || null}
              className="rounded-full size-[30px] flex justify-center items-center text-sm hover:bg-green-900 data-[is-selected]:border data-[is-selected]:border-green-400"
              to={`./?${addQueryParams(searchParams, "page", page)}`}
            >
              {page}
            </Link>
          );
        })}
        <Link
          to={`./?${addQueryParams(searchParams, "page", Math.min(+selectedPage + 1, pagesList.length))}`}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </Link>
      </div>
    </div>
  );
}
