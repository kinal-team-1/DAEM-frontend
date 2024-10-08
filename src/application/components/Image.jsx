import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { getAttachments } from "../actions/GET/get-attachments";

export function Image({ attachment, showLength = true }) {
  const counter = useRef(0);
  const [areImagesLoaded, setAreImagesLoaded] = useState(false);
  const [current, setCurrent] = useState(0);
  const { data: [images] = [], isLoading } = useQuery({
    // eslint-disable-next-line react/prop-types,no-underscore-dangle
    queryKey: ["image", attachment._id],
    queryFn: getAttachments,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
  });

  if (isLoading) {
    return <div className="bg-gray-400 w-full animate-pulse h-full" />;
  }

  return (
    <div className="flex w-full h-full grow relative overflow-hidden items-center">
      {images.map((img, i) => {
        return (
          <img
            data-is-loading={!areImagesLoaded || null}
            key={img}
            src={img}
            alt={img}
            onLoad={() => {
              counter.current += 1;
              if (counter.current === images.length) {
                counter.current = 0;
                setAreImagesLoaded(true);
              }
            }}
            className="absolute top-0 left-0 object-cover h-full w-full transition ease-in-out transform data-[is-loading]:hidden"
            style={{ transform: `translateX(${(i + -current) * 100}%)` }}
          />
        );
      })}
      <div className="absolute bg-black/20 h-full w-full" />

      {showLength && (
        <div className="font-bold text-3xl w-full flex justify-center items-center gap-1 absolute">
          <span className="z-100">{images.length}</span>
          <FontAwesomeIcon className="text-2xl z-100" icon={faPlus} />
        </div>
      )}
      <button
        type="button"
        onClick={() => {
          if (current === 0) return;
          setCurrent((prev) => prev - 1);
        }}
        className="absolute left-0 ml-5"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <button
        type="button"
        onClick={() => {
          if (current > images.length - 2) return;
          setCurrent((prev) => prev + 1);
        }}
        className="absolute right-0 mr-5"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
      <div
        data-is-loaded={areImagesLoaded || null}
        className="bg-gray-400 z-100 w-full animate-pulse h-full absolute data-[is-loaded]:hidden"
      />
    </div>
  );
}

Image.propTypes = {
  attachment: PropTypes.shape({}).isRequired,
};
