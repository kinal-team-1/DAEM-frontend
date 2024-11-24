import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPublicCaseById } from "../../../actions/GET/get-case-by-id";
import { AttachmentInput } from "../../../components/AttachmentInput";
import { getContributionsByPublicCaseId } from "../../../actions/GET/get-contributions-by-public-case-id";
import { ContributionCard } from "./components/ContributionCard";
import { Image } from "../../../components/Image";

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
    <div className="flex flex-col no-scrollbar md:grid grid-cols-5 w-full h-full text-white grow-0">
      <div className="col-span-3 shrink-0 bg-[#1b1a1a] flex flex-col gap-5 py-5 sm:px-20 px-4 md:px-10 lg:px-32 overflow-y-hidden">
        <h1 className="text-4xl shrink-0">{publicCase.title}</h1>
        <div className="grow ">
          <Image showLength={false} attachment={publicCase.attachment} />
        </div>
        <div className="flex flex-col shrink-0">
          <p className="flex gap-2 text-2xl">
            <span>{publicCase.submitter.name}</span>
            <span> {publicCase.submitter.lastname}</span>
          </p>
          <div>{publicCase.location.address}</div>
          <div>{publicCase.reported_at}</div>
        </div>

        <p className="shrink-0">{publicCase.description}</p>
      </div>
      <div className="col-span-2 h-full shrink-0 bg-black/50 overflow-y-scroll">
        <div className="px-5 py-5 h-full flex flex-col gap-3">
          <div className="">
            <AttachmentInput publicCaseId={id} />
          </div>
          <div className="grow">
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

  if (isLoading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="border-b-green-400 rounded-full size-[80px] border-vulcan-500 border-8 animate-spin" />
      </div>
    );

  if (isError) {
    return <div>ERROR</div>;
  }

  return (
    <div className="w-full h-full flex flex-col gap-2">
      {contributions.map((contribution) => {
        console.log({ attachment: contribution.attachment, contribution });

        return (
          <ContributionCard
            // eslint-disable-next-line no-underscore-dangle
            key={contribution._id}
            // eslint-disable-next-line no-underscore-dangle
            id={contribution._id}
            user_id={contribution.user_id}
            attachment={contribution.attachment}
            content={contribution.content}
            created_at={contribution.created_at}
          />
        );
      })}
    </div>
  );
}
