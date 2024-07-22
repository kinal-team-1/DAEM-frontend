import { useQuery } from "@tanstack/react-query";
import { useAuthService } from "../../../../../services/auth";
import { getContributionsByUserId } from "../../../../actions/GET/get-contributions-by-user-id";
import { useLocaleService } from "../../../../../services/locale";

export function ListContributions() {
  const { user } = useAuthService();
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

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-white text-2xl">
        {LL?.PAGES.EDIT_PROFILE.TABS.CONTRIBUTIONS.SUBTITLE()}
      </h2>
      <div className="flex flex-col gap-3">
        {contributions.map((contribution) => (
          <div key={contribution._id} className="flex flex-col gap-2">
            <span className="text-white text-lg">{contribution.title}</span>
            <span className="text-white text-sm">
              {contribution.description}
            </span>
          </div>
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
