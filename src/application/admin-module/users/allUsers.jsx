import { useQuery } from "@tanstack/react-query";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Pagination } from "./components/Pagination.jsx";
import { getUsers } from "../../actions/GET/get-users.js"
import { ListUsers } from "./components/ListUsers.jsx";
import { useLocaleService } from "../../../../services/locale.jsx";;

export function allUsers(){
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const mapSearchParams = [...searchParams.entries()].reduce(
    (acc, [key, value]) => {
      if (key === "options") return acc;
      if (key === "tab") return acc;
      acc[key] = value;
      return acc;
    },
    {},
  );

  //   const isListTab = searchParams.get("tab") === "list";

  const {
    data: [users, message, _, total] = [],
    isLoading,
    error,
  } = useQuery({
    // eslint-disable-next-line no-underscore-dangle
    queryKey: ["public-case", { params: mapSearchParams }],
    queryFn: getUsers,
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log({ users });

  return (
    <div className="flex flex-col relative grow h-full">
      {/* <Tabs isListTab={isListTab} />{is} */}
      <div className="grow flex flex-col overflow-y-scroll">
        <ListUsers loading={isLoading} publicCases={users} />
        {/* <div className="flex justify-center">
          <Pagination total={total} />
        </div> */}
      </div>
    </div>
  );
}
