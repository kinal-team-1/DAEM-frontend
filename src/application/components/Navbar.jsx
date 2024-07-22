import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { DropDown } from "./DropDown";
import { SUPPORTED_LANGUAGES } from "../../config";
import logo from "../../assets/logo.png";
import { useLocaleService } from "../../services/locale";
import { useAuthService } from "../../services/auth";

export function Navbar({ role }) {
  const { locale } = useLocaleService();
  const isUser = role === "user";
  const isAdmin = role === "admin";
  const isAnonymous = role === "";

  // /////////////////////////////////////////////////////////////////////////////////
  // Las partes comentadas del navbar se deben a que al usar el navbar en el login,
  // causa un error porque este ocupa informacion del usuario logueado
  // /////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="flex py-2 px-3 gap-2 justify-between items-center bg-[#1b1a1a] text-white z-10">
      <div className="flex gap-3">
        {/* <img className="size-[60px]" src={guatemalaShield} alt="" /> */}
        <Link
          to={`/${isAnonymous ? '' : locale}/public-case`}
          className="max-w-[min(100%,60px)]"
        >
          <img
            className="w-full aspect-square sm:size-[60px]"
            src={logo}
            alt="Logo"
          />
        </Link>
        <div className="max-w-[100px] hidden sm:block">
          <h2 className="text-3xl text-center font-bold">DAEM</h2>
          <p className="text-[7px] text-center">
            Denuncias Anonimas contra explotacion de menores
          </p>
        </div>
        <div className="border h-[60px]" />
      </div>
      <div className="justify-self-end">
        <TopBarButtons role={role} />
      </div>
    </div>
  );
}

function TopBarButtons({ role }) {
  const { locale } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const isUser = role === "user";
  const isAdmin = role === "admin";
  const isAnonymous = role === "anonymous";
  const isLogin = role === "";

  // const { user } = useAuthService();

  // const iName = user.name ? user.name[0] : '';
  // const iLastname = user.lastname ? user.lastname[0] : '';

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const handleLogout = () => {
    // localStorage.removeItem("token");
  };

  return (
    <div className="flex gap-2 items-center text-sm">
      <Link
        to={`/${locale}/publish`}
        style={{ display: isLogin || isAdmin ? 'none' : 'block' }}
        className="bg-black text-white  text-nowrap rounded-full px-5 py-3 flex justify-center"
      >
        Presentar caso
      </Link>
      <Link
        to={`/${locale}/admin/user`}
        style={{ display: isAdmin ? 'block' : 'none' }}
        className="bg-black text-white  text-nowrap rounded-full px-5 py-3 flex justify-center"
      >
        Usuarios
      </Link>
      <DropDown
        onChange={(lang, options) => {
          const lastRoute = currentPath.split("/").pop();

          if (options.includes(lastRoute)) {
            const pathRoutes = currentPath.split("/");
            pathRoutes.pop();
            pathRoutes.push(lang);
            navigate(pathRoutes.join("/") + location.search);
            return;
          }

          console.log({ options, currentPath });
          const regex = new RegExp(`/(${options.join("|")})/`, "g");
          navigate(currentPath.replace(regex, `/${lang}/`) + location.search);
        }}
        defaultOption={locale}
        options={SUPPORTED_LANGUAGES}
      />
      <button
        type="button"
        onClick={toggleDropdown}
        disabled={isAnonymous || isLogin}
        style={{ display: isAnonymous || isLogin ? 'none' : 'block' }}
        className="border bg-black px-2 py-1 size-[calc(120px/3)] cursor-pointer rounded-full"
      >
        {/* <span className="text-sm font-bold">{iName}{iLastname}</span> */}
      </button>
      {dropdownOpen && (
        <div className="absolute z-20 right-0 mt-32 mr-2 w-52 bg-white border shadow-lg border-none">
          <Link
            to={`/${locale}/edit-profile`}
            className="bg-vulcan-950  block p-3 text-md hover:bg-gray-600  font-bold"
          >Profile</Link>
          <Link
            to={`/${locale}/login`}
            onClick={handleLogout}
            className="bg-vulcan-950 block p-3 text-md hover:bg-red-500 font-bold"
          >Log out</Link>
        </div>
      )}
    </div>
  );
}
