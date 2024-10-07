import { useQuery } from "@tanstack/react-query";
import { getPublicCasesByUserId } from "../../../../actions/GET/get-public-cases-by-user-id";
import { PublicCaseCard } from "./PublicCaseCard";
import { useLocaleService } from "../../../../../services/locale";

export function ListPublicCases({ user }) {
  const { LL } = useLocaleService();

  const {
    data: [publicCases, message] = [],
    isLoading,
    error,
  } = useQuery({
    // eslint-disable-next-line no-underscore-dangle
    queryKey: ["public-case", { userId: user._id }],
    queryFn: getPublicCasesByUserId,
  });

  if (isLoading) {
    return (
      // spiner
      <div className="w-full h-full flex justify-center items-center">
        <div className="border-b-green-400 rounded-full size-[80px] border-vulcan-500 border-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col gap-3 items-center">
      <h2 className="text-white text-2xl">
        {LL?.PAGES.EDIT_PROFILE.TABS.CASES.SUBTITLE()}
      </h2>
      <div className="flex flex-col gap-3 max-w-[700px] shrink">
        {publicCases.map((pubCase) => (
          <PublicCaseCard
            key={pubCase._id}
            title={pubCase.title}
            description={pubCase.description}
            reported_at={pubCase.reported_at}
            id={pubCase._id}
            attachment={pubCase.attachment}
            submitter={pubCase.submitter}
          />
        ))}
        {publicCases.length === 0 && (
          <div className="text-white py-10">
            {LL?.PAGES.EDIT_PROFILE.TABS.CASES.NO_CONTRIBUTIONS_MESSAGE()}
          </div>
        )}
      </div>
    </div>
  );
}
