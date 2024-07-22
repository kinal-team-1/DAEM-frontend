import { Outlet, useLocation, useParams } from "react-router-dom";
import { Navbar } from "../../components/Navbar";

export function Layout() {
  const location = useLocation();
  const { locale } = useParams();

  const isProfilePage = location.pathname.startsWith(`/${locale}/edit-profile`);

  return (
    <div className="h-dvh flex flex-col">
      <div className="h-screen w-full fixed -z-10 top-0 left-0">
        <img
          className="min-h-full absolute object-cover"
          src={
            isProfilePage
              ? "/background-edit-profile.png"
              : "/background-children.png"
          }
          alt="Background children"
        />
        <div className="bg-black/30 w-full h-full absolute" />
      </div>
      <Navbar role="user" />
      <div className="overflow-hidden overflow-y-scroll grow no-scrollbar">
        <Outlet />
      </div>
    </div>
  );
}
