import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useDarkModeService } from "../../services/dark-mode";
import { DropDown } from "./DropDown";
import { SOPORTED_LANGUAGES } from "../../config";
import logo from "../../assets/logo.png";
import guatemalaShield from "../../assets/escudo-guatemala.png";

export function TobBar() {
  return (
    <div className="flex py-2 px-3 gap-2 justify-between items-center bg-black/80 text-white">
      <div className="flex gap-3">
        <img className="size-[80px]" src={guatemalaShield} alt="" />
        <div className="border h-[80px]" />
        <img className="size-[80px]" src={logo} alt="Logo" />
        <div className="max-w-[95px]">
          <h2 className="text-3xl text-center">DAEM</h2>
          <p className="text-[8px] text-center">
            Denuncias Anonimas contra explotacion de menores
          </p>
        </div>
      </div>
      <div className="justify-self-end">
        <TopBarButtons />
      </div>
    </div>
  );
}

function TopBarButtons() {
  const { locale } = useParams();
  const { isDark, setIsDark } = useDarkModeService();
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  return (
    <div className="flex gap-2">
      <DropDown
        onChange={(lang, options) => {
          const lastRoute = currentPath.split("/").pop();

          if (options.includes(lastRoute)) {
            const pathRoutes = currentPath.split("/");
            pathRoutes.pop();
            pathRoutes.push(lang);
            navigate(pathRoutes.join("/"));
            return;
          }

          const regex = new RegExp(`/(${options.join("|")})/`, "g");
          navigate(currentPath.replace(regex, `/${lang}/`));
        }}
        defaultOption={locale}
        options={SOPORTED_LANGUAGES}
      />
      <button
        type="button"
        onClick={() => {
          setIsDark(!isDark);
        }}
        className="px-2 py-1 size-[calc(100px/3)] rounded border cursor-pointer"
      >
        <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
      </button>
      <button
        type="button"
        className="rounded border px-2 py-1 size-[calc(100px/3)] cursor-pointer"
      >
        <span className="text-sm">LC</span>
      </button>
    </div>
  );
}
