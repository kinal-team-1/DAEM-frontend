import { useQuery } from "@tanstack/react-query";
import { useLocation, useSearchParams } from "react-router-dom";
import { getUsers } from "../../actions/GET/get-users.js";
import { ListUsers } from "../components/ListUsers.jsx";

// import { Tabs } from "../../client-module/pages/public-case/publicCase.jsx";

export function AllUsers() {
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

  const isUsersTab = searchParams.get("tab") === "list";

  // useEffect(() => {
  //   if (["list"].includes(searchParams.get("tab"))) return;
  //
  //   searchParams.set("tab", "list");
  //   setSearchParams(new URLSearchParams(searchParams));
  // }, [location]);

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

  return (
    <div className="flex flex-col relative grow  h-full">
      {/* <Tabs isUsersTab={isUsersTab} /> */}
      {/* {isUsersTab && ( */}
      <div className="grow flex flex-col overflow-y-scroll">
        <ListUsers loading={isLoading} users={users} />
      </div>
      {/* )} */}
    </div>
  );
}
