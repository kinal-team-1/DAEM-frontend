import { Link, useParams } from "react-router-dom";
import { Image } from "../../../../components/Image";

export function PublicCaseCard({
  id,
  title,
  description,
  reported_at,
  attachment,
  className,
}) {
  const { locale } = useParams();

  return (
    <div
      className={`bg-black/20 rounded-lg shadow-lg p-4 flex gap-5 h-[180px] w-full ${className}`}
    >
      <div className="rounded h-full w-full shrink-0 max-w-[min(200px,50%)] bg-white ">
        <Image attachment={attachment} />
      </div>
      <div className="grow h-full flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl">{title}</h2>
          <p className="line-clamp-4 text-xs">{description}</p>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs">
            {Intl.DateTimeFormat("es-ES", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            }).format(new Date(reported_at))}
          </span>
          <Link
            to={`/${locale}/public-case/${id}`}
            className="p-2 px-5 bg-black rounded-full"
          >
            aportar
          </Link>
        </div>
      </div>
    </div>
  );
}
