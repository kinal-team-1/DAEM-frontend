import { Link, useSearchParams } from "react-router-dom";
import { ListPublicCases } from "./components/ListCases";
import { ListContributions } from "./components/ListContributions";
import { FormEditProfile } from "./components/FormEditProfile";
import { useAuthService } from "../../../../services/auth";
import { useLocaleService } from "../../../../services/locale";

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
  const [searchParams] = useSearchParams();
  const { LL } = useLocaleService();
  const tab = searchParams.get("tab");
  const isCasesTab = tab === "cases";
  const isContributionsTab = tab === "contributions";
  const isEdit = searchParams.has("isEdit");
  const { user } = useAuthService();

  const iName = user.name ? user.name[0] : '';
  const iLastname = user.lastname ? user.lastname[0] : '';

  return (
    <div className="flex flex-col min-[900px]:flex-row h-full text-white">
      <div className="bg-black/30 grow h-full min-[900px]:w-[350px] min-[900px]:grow-0 shrink-0 flex flex-col items-center py-5 gap-2 px-10">
        <div className="flex justify-center">
          <div className="min-[900px]:size-[150px] size-[200px] rounded-full bg-black border-2 text-6xl font-bold flex items-center justify-center">
            {iName}{iLastname}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold flex gap-2">
            <span>{user.name}</span>
            <span>{user.lastname}</span>
          </h2>
          <h6 className="text-sm flex gap-1">
            {user.DPI.split("").map((char) => (
              <span>{char}</span>
            ))}
          </h6>
        </div>
        {!isEdit && (
          <>
            <p>{user.email}</p>
            <p>502+ {user.phone_number} </p>
            <Link
              to={`./?${isEdit ? removeQueryParams(searchParams, "isEdit") : addQueryParams(searchParams, "isEdit")}`}
              className="px-10 py-2 bg-black rounded-lg w-fit"
            >
              {LL?.PAGES.EDIT_PROFILE.BUTTONS.EDIT_PROFILE()}
            </Link>
          </>
        )}
        {isEdit && <FormEditProfile searchParams={searchParams} />}
      </div>
      <div className="grow h-full shrink-0 min-[900px]:shrink flex flex-col">
        <div className="grid grid-cols-2">
          <div className="col-span-1">
            <Link
              to={`./?${addQueryParams(searchParams, "tab", "cases")}`}
              data-is-selected={isCasesTab || null}
              className="button py-5 flex justify-center items-center bg-black data-[is-selected]:border-b border-b-green-400 data-[is-selected]:text-green-400"
            >
              {LL?.PAGES.EDIT_PROFILE.TABS.CASES.TITLE()}
            </Link>
          </div>
          <div className="col-span-1">
            <Link
              to={`./?${addQueryParams(searchParams, "tab", "contributions")}`}
              data-is-selected={isContributionsTab || null}
              className="button py-5 flex justify-center items-center bg-black data-[is-selected]:border-b border-b-green-400 data-[is-selected]:text-green-400"
            >
              {LL?.PAGES.EDIT_PROFILE.TABS.CONTRIBUTIONS.TITLE()}
            </Link>
          </div>
        </div>
        <div className="px-3 min-w-[900px]:px-10 py-5 grow">
          {isCasesTab && <ListPublicCases />}
          {isContributionsTab && <ListContributions />}
        </div>
      </div>
    </div>
  );
}
