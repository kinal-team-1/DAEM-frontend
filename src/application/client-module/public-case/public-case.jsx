import { Link, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPublicCase } from "../../actions/GET/getPublic-case";
import { PublicCaseCard } from "./components/public-caseCard";

export function PublicCase() {
  const { locale } = useParams();
  const [params] = useSearchParams();
  const { data = [], isLoading } = useQuery({
    queryKey: ["public-case", { locale, params }],
    queryFn: getPublicCase,
  });

  if (isLoading) return <div>Loading...</div>;

  console.log("Data obtenida:", data);

  // Verifica que data sea un array y tenga al menos un elemento, si no, retorna null
  if (!Array.isArray(data) || data.length === 0) {
    console.error("Error: Data is not an array or is empty");
    return <div>Error: Data is not an array or is empty</div>;
  }

  // Asumiendo que data es un array, el primer elemento es publicCase
  const publicCase = data[0];

  console.log("publicCase:", publicCase);

  // Verifica que publicCase sea un array
  if (!Array.isArray(publicCase)) {
    console.error("Error: publicCase is not an array");
    return <div>Error: publicCase is not an array</div>;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-end">
        <Link
          className="bg-primary-400 rounded py-2 px-4 text-white"
          to="./create"
        >
          Crear
        </Link>
      </div>
      <div className="grow content-start overflow-y-scroll gap-5 md:px-4 grid grid-cols-[repeat(auto-fill,minmax(330px,1fr))]">
        {publicCase.map((publicCases) => (
          <PublicCaseCard
            submitter={publicCases.submitter}
            title={publicCases.title}
            description={publicCases.description}
            key={publicCases._id}
            id={publicCases._id}
          />
        ))}
      </div>
      {hiddenElements.size === publicCase.length && (
        <div className="flex text-3xl justify-center items-center h-full">
          <span>No elements found</span>
        </div>
      )}
    </div>
  );
}
