import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addQueryParams } from "../../../../utils/search-params";

const getPages = (total, limit) => Math.ceil(total / limit);
export function Pagination({ total }) {
  const [searchParams] = useSearchParams();
  const [pagesList, setPagesList] = useState([]);

  const limit = searchParams.get("limit");
  const selectedPage = searchParams.get("page") || "1";

  useEffect(() => {
    if (!Number.isFinite(total)) return;
    setPagesList(Array.from(Array(getPages(total, limit)), (_, i) => i + 1));
  }, [total]);

  if (pagesList.length < 1) return null;

  return (
    <div className="absolute rounded-full bg-black/80 bottom-0 max-w-[800px] py-3 px-10 text-white mb-5 flex justify-center items-center w-full gap-5">
      <Link
        to={`./?${addQueryParams(searchParams, "page", Math.max(+selectedPage - 1, 1))}`}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </Link>
      {pagesList.map((page) => {
        return (
          <Link
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
  );
}
