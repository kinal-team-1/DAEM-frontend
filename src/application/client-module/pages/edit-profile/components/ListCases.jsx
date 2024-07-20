import { useQuery } from "@tanstack/react-query";
import { useAuthService } from "../../../../../services/auth";
import { getPublicCasesByUserId } from "../../../../actions/GET/get-public-cases-by-user-id";
import { PublicCaseCard } from "./PublicCaseCard.jsx";

export function ListPublicCases() {
  const { user } = useAuthService();

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
        {publicCases.map((pubCase) => (
          <PublicCaseCard
            key={pubCase._id}
            title={pubCase.title}
            description={pubCase.description}
            reported_at={pubCase.reported_at}
            id={pubCase._id}
            attachment={pubCase.attachment}
          />
        ))}
      </div>
    </div>
  );
}
