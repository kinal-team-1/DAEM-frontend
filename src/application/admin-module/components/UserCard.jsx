import { Link, useParams } from "react-router-dom";

export function UserCard({
  id,
  email,
  name, 
  lastname,
  DPI,
  phone_number
}) {
  const { locale } = useParams();
  const iName = name ? name[0] : '';
  const iLastname = lastname ? lastname[0] : '';
  const phonea = phone_number ? phone_number.substring(0, 4) : '';
  const phoneb = phone_number ? phone_number.substring(4, 8) : '';


  return (
    <div className="bg-black/60 rounded-2xl p-4 flex flex-col gap-5 min-[430px]:flex-row w-full min-[430px]:h-[150px]">
      <div className=" w-full md:w-auto flex items-center justify-center pr-3 pl-3">
        <div className="min-w-28 h-28 w-28 max-w-28 rounded-full bg-black border border-white flex items-center justify-center text-white text-5xl font-bold">
          {iName}{iLastname}
        </div>
      </div>
      <div className="text-white p-4 rounded-md w-full">
        <Link
          to={`/${locale}/user/${id}`}
          className="hover:text-green-500 hover:underline font-bold text-2xl"
        >
          {name} {lastname}
        </Link>
        <p className="text-xl mt-2">{email}</p>
        <p>+502 {phonea}-{phoneb}</p>
      </div>
    </div>
  );
}
