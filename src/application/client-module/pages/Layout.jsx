import { Outlet, useLocation, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { Navbar } from "../../components/Navbar";
import { useAuthService } from "../../../services/auth";

export function Layout({ alternativeBackground = false }) {
  const location = useLocation();
  const { locale } = useParams();
  const { user } = useAuthService();

  const isProfilePage =
    alternativeBackground ||
    location.pathname.startsWith(`/${locale}/edit-profile`);

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
      <Navbar role={user.role || ""} />
      <div className="overflow-hidden overflow-y-scroll grow no-scrollbar">
        <Outlet />
      </div>
    </div>
  );
}

Layout.propTypes = {
  alternativeBackground: PropTypes.bool,
};
