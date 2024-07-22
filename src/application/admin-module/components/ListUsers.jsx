import * as PropTypes from "prop-types";
import { UserCard } from "./UserCard";

export function ListUsers({ loading, users }) {
  return (
    <div className="flex flex-col gap-3 items-center relative grow">
      {!loading && (
        <div className="flex flex-col gap-3 h-full  no-scrollbar w-full max-w-[800px] py-10 px-3">
          {users.map((us) => {
            return (
              <UserCard
                key={us._id}
                name={us.name}
                lastname={us.lastnam}
                email={us.email}
                DPI={us.DPI}
                phone_number={phone_number}
                className="bg-black/70 text-white"
              />
            );
          })}
        </div>
      )}
      {loading && (
        <div className="w-full h-full flex justify-center items-center">
          <div className="border-b-green-400 rounded-full size-[80px] border-vulcan-500 border-8 animate-spin" />
        </div>
      )}
    </div>
  );
}

ListUsers.prototype = {
  loading: PropTypes.bool,
  publicCases: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      lastname: PropTypes.string,
      email: PropTypes.string,
      DPI: PropTypes.string,
      phone_number: PropTypes.string,
    }),
  ),
};
