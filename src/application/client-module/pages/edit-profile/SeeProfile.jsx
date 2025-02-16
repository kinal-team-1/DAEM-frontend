import { Link, useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect } from "react";
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

export function SeeProfile({ user }) {
  const { user: userLogged } = useAuthService();
  const [searchParams, setSearchParams] = useSearchParams();
  const { LL } = useLocaleService();
  const tab = searchParams.get("tab");
  const isCasesTab = tab === "cases";
  const isContributionsTab = tab === "contributions";
  const canEdit = userLogged.role === "admin" || user._id === userLogged._id;
  const isEdit = searchParams.has("isEdit") && canEdit;

  const iName = user.name ? user.name[0] : "";
  const iLastname = user.lastname ? user.lastname[0] : "";

  useEffect(() => {
    if (tab) return;

    const newSearchParam = new URLSearchParams(searchParams);
    newSearchParam.set("tab", "cases");
    setSearchParams(newSearchParam);
  }, []);

  return (
    <div className="flex flex-col min-[900px]:flex-row h-full overflow-y-scroll min-[900px]:overflow-y-hidden text-white">
      <div className="bg-black/30 grow h-full min-[900px]:w-[350px] min-[900px]:grow-0 shrink-0 flex flex-col items-center py-5 gap-2 px-10">
        <div className="flex justify-center">
          <div className="min-[900px]:size-[150px] size-[200px] rounded-full bg-black border-2 text-6xl font-bold flex items-center justify-center">
            {iName}
            {iLastname}
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
            {canEdit && (
              <Link
                to={`./?${isEdit ? removeQueryParams(searchParams, "isEdit") : addQueryParams(searchParams, "isEdit")}`}
                className="px-10 py-2 bg-black rounded-lg w-fit"
              >
                {LL?.PAGES.EDIT_PROFILE.BUTTONS.EDIT_PROFILE()}
              </Link>
            )}
          </>
        )}
        {isEdit && <FormEditProfile searchParams={searchParams} user={user} />}
      </div>
      <div className="grow min-h-full shrink-0 min-[900px]:shrink flex flex-col relative min-[900px]:overflow-y-scroll">
        <div className="grid grid-cols-2 sticky top-0 z-10">
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
          {isCasesTab && <ListPublicCases user={user} />}
          {isContributionsTab && <ListContributions user={user} />}
        </div>
      </div>
    </div>
  );
}

SeeProfile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string,
    DPI: PropTypes.string,
    phone_number: PropTypes.string,
    role: PropTypes.string,
    _id: PropTypes.string,
  }),
};
