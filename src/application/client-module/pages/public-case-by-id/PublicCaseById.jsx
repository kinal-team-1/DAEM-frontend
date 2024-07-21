import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPublicCaseById } from "../../../actions/GET/get-case-by-id";
import { Image } from "../../../components/Image";
import { AttachmentInput } from "../../../components/AttachmentInput";
import { getContributionsByPublicCaseId } from "../../../actions/GET/get-contributions-by-public-case-id.js";

export function PublicCaseById() {
  const { id } = useParams();

  const { data: [publicCase] = [], isLoading } = useQuery({
    queryKey: ["public-case", { id }],
    queryFn: getPublicCaseById,
  });

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="border-b-green-400 rounded-full size-[80px] border-vulcan-500 border-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-y-scroll no-scrollbar md:grid grid-cols-5 w-full h-full text-white">
      <div className="col-span-3 h-full shrink-0 bg-[#1b1a1a] flex flex-col gap-5 py-5 px-32">
        <h1 className="text-4xl">{publicCase.title}</h1>
        <div className="w-full grow">
          <Image attachment={publicCase.attachment} />
        </div>
        <div className="flex flex-col">
          <p className="flex gap-2 text-2xl">
            <span>{publicCase.submitter.name}</span>
            <span> {publicCase.submitter.lastname}</span>
          </p>
          <div>{publicCase.location.address}</div>
          <div>{publicCase.reported_at}</div>
        </div>

        <p className="">{publicCase.description}</p>
      </div>
      <div className="col-span-2 h-full shrink-0 bg-black/50">
        <div className="px-5 py-5 h-full flex flex-col gap-3">
          <div className="">
            <AttachmentInput publicCaseId={id} />
          </div>
          <div className="grow overflow-hidden overflow-y-scroll no-scrollbar">
            <ListContributions id={id} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ListContributions({ id }) {
  const {
    data: [contributions] = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["contributions", { publicCase: id }],
    queryFn: getContributionsByPublicCaseId,
  });

  if (isLoading) return <div>Spinner...</div>;

  if (isError) {
    return <div>ERROR</div>;
  }

  return (
    <div className="w-full h-full flex flex-col gap-2">
      {contributions.map((contribution) => (
        <div
          // eslint-disable-next-line no-underscore-dangle
          key={contribution._id}
          className="bg-black/70 p-3 px-6 rounded-xl flex flex-col gap-2"
        >
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <span>{contribution.user_id.name}</span>
              <span>{contribution.user_id.lastname}</span>
            </div>
            <span className="text-xs">
              {Intl.DateTimeFormat("es-ES", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              }).format(new Date(contribution.created_at))}
            </span>
          </div>
          <div className="text-xs flex flex-col gap-2 h-[200px]">
            <div className="rounded grow overflow-hidden">
              <Image attachment={contribution.attachment} />
            </div>
            <div>{contribution.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
