import { useQuery } from "@tanstack/react-query";
import { useAuthService } from "../../../../../services/auth";
import { getContributionsByUserId } from "../../../../actions/GET/get-contributions-by-user-id";

export function ListContributions() {
  const { user } = useAuthService();

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
      // spinner
      <div>Loading ...</div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-white text-2xl">Mis contribuciones</h2>
      <div className="flex flex-col gap-3">
        {contributions.map((contribution) => (
          <div key={contribution._id} className="flex flex-col gap-2">
            <span className="text-white text-lg">{contribution.title}</span>
            <span className="text-white text-sm">
              {contribution.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
