import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faFaceSadTear,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { getAttachments } from "../actions/GET/get-attachments";

export function Image({
  attachment,
  showLength = true,
  showButtons = true,
  showLenghtOnHover = false,
}) {
  const counter = useRef(0);
  const [areImagesLoaded, setAreImagesLoaded] = useState(false);
  const [current, setCurrent] = useState(0);
  const {
    data: [images] = [],
    isLoading,
    isError,
  } = useQuery({
    // eslint-disable-next-line react/prop-types,no-underscore-dangle
    queryKey: ["image", attachment._id],
    queryFn: getAttachments,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
  });

  if (isLoading) {
    return <div className="bg-gray-400 w-full animate-pulse h-full" />;
  }

  if (isError) {
    return (
      <div className="bg-gray-400 w-full h-full flex justify-center items-center">
        <FontAwesomeIcon icon={faFaceSadTear} className="text-3xl" />
      </div>
    );
  }
  console.log({ images, isLoading });

  return (
    <div className="flex aspect-square h-full grow relative overflow-hidden items-center group">
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

      {showLength && images.length > 1 && (
        <div
          className={`font-bold w-full text-3xl flex justify-center items-center gap-1 absolute${showLenghtOnHover ? " group-[&:not(:hover)]:invisible" : ""}`}
        >
          <span className="z-100">{images.length}</span>
          <FontAwesomeIcon className="text-2xl z-100" icon={faPlus} />
        </div>
      )}
      {showButtons && (
        <>
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
        </>
      )}

      <div
        data-is-loaded={areImagesLoaded || null}
        className="bg-gray-400 z-100 w-full animate-pulse h-full absolute data-[is-loaded]:hidden"
      />
    </div>
  );
}

Image.propTypes = {
  attachment: PropTypes.shape({}).isRequired,
  showLength: PropTypes.bool,
  showButtons: PropTypes.bool,
};
