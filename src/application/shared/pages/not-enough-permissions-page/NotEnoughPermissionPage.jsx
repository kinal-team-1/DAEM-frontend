import { useNavigate } from "react-router-dom";
import { Navbar } from "../../../components/Navbar";

export function NotEnoughPermissionPage() {
  const navigate = useNavigate();

  return (
    <div className="h-dvh flex flex-col">
      <div className="h-screen w-full fixed -z-10 top-0 left-0">
        <img
          className="min-h-full absolute object-cover"
          src="/background-login-children.png"
          alt="Background children"
        />
        <div className="bg-black/30 w-full h-full absolute" />
      </div>
      <Navbar />
      <div className="overflow-hidden overflow-y-scroll grow shrink-0 py-5">
        <div className="flex flex-col gap-10 justify-center items-center h-full w-full">
          <div className="flex justify-center items-center h-full w-full">
            <div className="bg-black/60 p-5 rounded-xl flex flex-col gap-5">
              <h1 className="text-2xl text-center text-white">
                Not Enough Permissions
              </h1>
              <p className="text-center text-white">
                You do not have enough permissions to access this page.
              </p>
              <button
                className="bg-black text-white px-4 py-2 rounded-xl w-full"
                onClick={() => navigate(-1)}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
