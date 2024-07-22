import * as PropTypes from "prop-types";
import { UserCard } from "./UserCard.jsx";

export function ListUsers({ loading, users }) {
  return (
    <div className="flex flex-col gap-3 items-center relative grow">
      {!loading && (
        <div className="flex flex-col gap-3 h-full  no-scrollbar w-full max-w-[900px] py-10 px-3">
          {users.map((us) => {
            return (
              <UserCard
                key={us._id}
                name={us.name}
                lastname={us.lastname}
                email={us.email}
                DPI={us.DPI}
                phone_number={us.phone_number}
                id={us._id}
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

ListUsers.propTypes = {
  loading: PropTypes.bool,
  users: PropTypes.arrayOf(
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
