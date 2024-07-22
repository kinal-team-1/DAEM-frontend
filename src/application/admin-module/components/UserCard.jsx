import { Link, useParams } from "react-router-dom";

export function UserCard({
  id,
  email,
  name, 
  lastname,
  DPI,
  phone_number
}) {
  const { locale } = UseParams();
  return (
    <div className="bg-primary-500 rounded-lg p-4 flex flex-col gap-5 min-[430px]:flex-row w-full min-[430px]:h-[240px]">
      <div className="">ESOOOOOO</div>
      <div className="bg-black p-4 rounded-md">
        <Link to={`/${locale}/user/${id}`}>
          {name} {lastname}
        </Link>
      </div>
    </div>
  );
}
