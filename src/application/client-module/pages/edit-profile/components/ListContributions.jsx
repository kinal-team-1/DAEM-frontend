import { useQuery } from "@tanstack/react-query";
import { getContributionsByUserId } from "../../../../actions/GET/get-contributions-by-user-id";
import { useLocaleService } from "../../../../../services/locale";
import { ContributionCard } from "../../public-case-by-id/components/ContributionCard.jsx";

export function ListContributions({ user }) {
  const { LL } = useLocaleService();

  const {
    data: [contributions, message] = [],
    isLoading,
    error,
  } = useQuery({
    // eslint-disable-next-line no-underscore-dangle
    queryKey: ["contributions", { userId: user._id }],
    queryFn: getContributionsByUserId,
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

  console.log({ contributions });

  return (
    <div className="flex flex-col gap-3 items-center">
      <h2 className="text-white text-2xl">
        {LL?.PAGES.EDIT_PROFILE.TABS.CONTRIBUTIONS.SUBTITLE()}
      </h2>
      <div className="flex flex-col max-w-[700px] gap-3">
        {contributions.map((contribution) => (
          <ContributionCard
            // eslint-disable-next-line no-underscore-dangle
            key={contribution._id}
            // eslint-disable-next-line no-underscore-dangle
            id={contribution._id}
            user_id={user}
            attachment={
              contribution.attachment ? { _id: contribution.attachment } : null
            }
            content={contribution.content}
            created_at={contribution.created_at}
            case_id={contribution.case_id}
            isLink
          />
        ))}

        {contributions.length === 0 && (
          <div className="text-white py-10">
            {LL?.PAGES.EDIT_PROFILE.TABS.CONTRIBUTIONS.NO_CONTRIBUTIONS_MESSAGE()}
          </div>
        )}
      </div>
    </div>
  );
}
