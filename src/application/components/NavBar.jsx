import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faClose,
  faFileInvoice,
  faHome,
  faMoneyBillWave,
  faRetweet,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDarkModeService } from "../../services/dark-mode";
import { useLocaleService } from "../../services/locale";
import { useNavbarMobileService } from "../../services/navbar-mobile-service";

export function Navbar() {
  const { isDark } = useDarkModeService();
  const { LL, locale } = useLocaleService();
  const { isNavbarOpen, setIsNavbarOpen } = useNavbarMobileService();

  const routes = [
    {
      name: LL?.NAVBAR?.HOME(),
      icon: faHome,
      link: `/${locale}`,
    },
    {
      name: LL?.NAVBAR?.SERVICES(),
      icon: faFileInvoice,
      link: `/${locale}/services`,
    },
    {
      name: LL?.NAVBAR?.MOVEMENTS(),
      icon: faRetweet,
      link: `/${locale}/movements`,
    },
    {
      name: LL?.NAVBAR?.CURRENCIES(),
      icon: faMoneyBillWave,
      link: `/${locale}/currencies`,
    },
    {
      name: LL?.NAVBAR?.FAVORITE_ACCOUNTS(),
      icon: faStar,
      link: `/${locale}/favorite-accounts`,
    },
  ];

  return (
    <div
      data-isopen={isNavbarOpen || null}
      className="md:w-[250px] shrink-0 w-0 overflow-hidden transition-[width_padding] data-[isopen]:flex md:data-[isopen]:w-[250px] data-[isopen]:w-full md:flex dark:text-silver-400 data-[isopen]:border-r md:border-r border-r-silver-400 data-[isopen]:px-3 md:px-3 py-5 flex-col justify-between"
    >
      <div className="flex flex-col gap-5 h-full">
        <div className="md:invisible">
          <button
            type="button"
            onClick={() => {
              setIsNavbarOpen(false);
            }}
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
        <div className="flex gap-2 justify-center">
          <img src="/logo-2.svg" className="h-[70px]" alt="" />
          <img
            src={`/letters-${isDark ? "dark" : "light"}.svg`}
            className="h-[70px]"
            alt=""
          />
        </div>
        <div>
          {routes.map((route) => (
            <Link
              to={route.link}
              key={route.link}
              className="px-3 py-2 flex gap-2 items-center border rounded hover:bg-vulcan-900"
            >
              <FontAwesomeIcon icon={route.icon} />
              <span>{route.name}</span>
            </Link>
          ))}
        </div>
      </div>
      {/* MIGHT CHANGE TO <Link /> */}
      <button type="button" className="flex gap-2 items-center">
        <FontAwesomeIcon icon={faArrowRightToBracket} />
        <span>{LL?.NAVBAR?.LOG_OUT()}</span>
      </button>
    </div>
  );
}
