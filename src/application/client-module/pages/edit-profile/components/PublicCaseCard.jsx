import { Image } from "../../../../components/Image";

export function PublicCaseCard({
  id,
  title,
  description,
  reported_at,
  attachment,
}) {
  console.log({ attachment });

  return (
    <div className="bg-black/20 rounded-lg shadow-lg p-4 flex gap-5 h-[180px] min-w-0 w-full">
      <div className="border rounded h-full min-w-[40%] grow bg-white ">
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
          <button className="p-2 px-5 bg-black rounded-full">aportar</button>
        </div>
      </div>
    </div>
  );
}
