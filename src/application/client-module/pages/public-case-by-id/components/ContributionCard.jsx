import { Link, useParams } from "react-router-dom";
import { Image } from "../../../../components/Image";

export function ContributionCard({
  id,
  user_id,
  created_at,
  content,
  attachment,
  rowMode = false,
  isLink = false,
  case_id = null,
}) {
  const { locale } = useParams();

  const jsxContent = (
    <>
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <span>{user_id.name}</span>
          <span>{user_id.lastname}</span>
        </div>
        <span className="text-xs">
          {Intl.DateTimeFormat("es-ES", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }).format(new Date(created_at))}
        </span>
      </div>
      <div
        data-row-mode={rowMode || null}
        className="text-xs flex flex-col gap-2 h-[200px] data-[row-mode]:h-[300px] sm:data-[row-mode]:h-[200px] sm:data-[row-mode]:flex-row sm:data-[row-mode]:gap-5"
      >
        <div
          data-row-mode={rowMode || null}
          className="rounded grow h-full overflow-hidden data-[row-mode]:px-5 sm:data-[row-mode]:w-[300px] sm:data-[row-mode]:shrink-0"
        >
          <Image showLength={false} attachment={attachment} />
        </div>
        <div data-row-mode={rowMode || null} className="data-[row-mode]:py-4">
          {content}
        </div>
      </div>
    </>
  );

  return (
    <>
      {!isLink && (
        <div
          // eslint-disable-next-line no-underscore-dangle
          key={id}
          className="bg-black/70 p-3 px-6 rounded-xl flex flex-col gap-2"
        >
          {jsxContent}
        </div>
      )}
      {isLink && (
        <Link
          to={`/${locale}/public-case/${case_id}`}
          // eslint-disable-next-line no-underscore-dangle
          key={id}
          className="bg-black/70 p-3 px-6 rounded-xl flex flex-col gap-2"
        >
          {jsxContent}
        </Link>
      )}
    </>
  );
}
