import { useQuery } from "@tanstack/react-query";
import { getPublicCase } from "../../actions/GET/get-public-case";
import { PublicCaseCard } from "../pages/edit-profile/components/PublicCaseCard";

export function PublicCase() {
  const {
    data: [publicCases, message] = [],
    isLoading,
    error,
  } = useQuery({
    // eslint-disable-next-line no-underscore-dangle
    queryKey: ["public-case"],
    queryFn: getPublicCase,
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
  console.log({ publicCases });
  return (
    <div className="flex flex-col gap-3 items-center">
      <h2 className="text-white text-2xl">Mis contribuciones</h2>
      <div className="flex flex-col gap-3 max-w-[2000px]">
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
