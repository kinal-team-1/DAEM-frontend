import { Link, useSearchParams } from "react-router-dom";
import { ListPublicCases } from "./components/ListCases";
import { ListContributions } from "./components/ListContributions";

const removeQueryParams = (searchParams, param) => {
  const newSearchParams = new URLSearchParams(searchParams);
  newSearchParams.delete(param);
  return newSearchParams.toString();
};

const addQueryParams = (searchParams, param, value) => {
  const newSearchParams = new URLSearchParams(searchParams);
  newSearchParams.set(param, value || "");
  return newSearchParams.toString().replace(/=(?=&|$)/gm, "");
};

export function EditProfile() {
  const DPI = "1234567890123";
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const isCasesTab = tab === "cases";
  const isContributionsTab = tab === "contributions";
  const isEdit = searchParams.has("isEdit");

  return (
    <div className="flex h-full text-white">
      <div className="bg-black/30 grow h-full max-w-[350px] flex flex-col gap-2 px-10">
        <div className="flex justify-center">
          <div className="size-[200px] rounded-full bg-gray-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Juan Luis</h2>
          <h6 className="text-sm flex gap-1">
            {DPI.split("").map((char) => (
              <span>{char}</span>
            ))}
          </h6>
        </div>
        {!isEdit && (
          <>
            <p>admin@email.com</p>
            <p>502+ 12345678 </p>
            <Link
              to={`./?${isEdit ? removeQueryParams(searchParams, "isEdit") : addQueryParams(searchParams, "isEdit")}`}
              className="px-10 py-2 bg-black rounded-lg w-fit"
            >
              Editar
            </Link>
          </>
        )}
        {isEdit && (
          <div className="flex flex-col gap-5 [&_input]:border-2">
            <input
              placeholder="hola"
              type="text"
              className="border p-2 rounded-lg bg-[transparent] outline-none"
            />
            <input
              placeholder="hola"
              type="text"
              className="border p-2 rounded-lg bg-[transparent] outline-none"
            />
            <input
              placeholder="hola"
              type="text"
              className="border p-2 rounded-lg bg-[transparent] outline-none"
            />
            <div className="flex gap-2">
              <button className="px-10 py-2 bg-white text-black rounded-lg grow">
                Save
              </button>
              <Link
                to={`./?${removeQueryParams(searchParams, "isEdit")}`}
                className="px-10 py-2 bg-black rounded-lg grow"
              >
                cancelar
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className="grow h-full flex flex-col">
        <div className="flex">
          <div className="grow">
            <Link
              to={`./?${addQueryParams(searchParams, "tab", "cases")}`}
              data-is-selected={isCasesTab || null}
              className="button py-5 flex justify-center items-center bg-black data-[is-selected]:border-b border-b-green-400 data-[is-selected]:text-green-400"
            >
              Casos
            </Link>
          </div>
          <div className="grow">
            <Link
              to={`./?${addQueryParams(searchParams, "tab", "contributions")}`}
              data-is-selected={isContributionsTab || null}
              className="button py-5 flex justify-center items-center bg-black data-[is-selected]:border-b border-b-green-400 data-[is-selected]:text-green-400"
            >
              Contribuciones
            </Link>
          </div>
        </div>
        <div className="px-10 py-5">
          {isCasesTab && <ListPublicCases />}
          {isContributionsTab && <ListContributions />}
        </div>
      </div>
    </div>
  );
}
