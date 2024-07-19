import { useNavigate, useParams } from "react-router-dom";
import { DropDown } from "./DropDown";
import { SOPORTED_LANGUAGES } from "../../config";
import logo from "../../assets/logo.png";
import guatemalaShield from "../../assets/escudo-guatemala.png";

export function TobBar() {
  return (
    <div className="flex py-2 px-3 gap-2 justify-between items-center bg-[#1b1a1a] text-white z-10">
      <div className="flex gap-3">
        <img className="size-[60px]" src={guatemalaShield} alt="" />
        <img className="size-[60px]" src={logo} alt="Logo" />
        <div className="max-w-[100px]">
          <h2 className="text-3xl text-center font-bold">DAEM</h2>
          <p className="text-[7px] text-center">
            Denuncias Anonimas contra explotacion de menores
          </p>
        </div>
        <div className="border h-[60px]" />
      </div>
      <div className="justify-self-end">
        <TopBarButtons />
      </div>
    </div>
  );
}

function TopBarButtons() {
  const { locale } = useParams();
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
        className="border px-2 py-1 size-[calc(120px/3)] cursor-pointer rounded-full"
      >
        <span className="text-sm">LC</span>
      </button>
    </div>
  );
}
