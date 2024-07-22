import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { login } from "../../../../actions/POST/login";
import { useAuthService } from "../../../../../services/auth";
import { useLocaleService } from "../../../../../services/locale";

export function LoginForm() {
  const { LL, locale: localePage } = useLocaleService();
  const { locale } = useParams();
  const navigate = useNavigate();
  const { setUser } = useAuthService();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const mutationLogin = useMutation({
    mutationFn: login,
    onSuccess: ([user, message, status, token]) => {
      localStorage.setItem("token", token);
      setUser(user);
      if (user.role === "user") navigate(`/${locale}/public-case`);
      if (user.role === "admin") navigate(`/${locale}/admin`);
    },
  });

  useEffect(() => {
    if (!mutationLogin.isError) return;

    setTimeout(() => mutationLogin.reset(), 3000);
  }, [mutationLogin.isError]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!mutationLogin.isIdle) return;

        mutationLogin.mutate(form);
      }}
      className="bg-black/70 flex flex-col gap-2 md:flex-row md:gap-0 h-fit max-w-[90%] text-xl rounded"
    >
      <div className="size-[400px] py-10 px-5 sm:px-10 max-w-full flex flex-col gap-5 text-white [&_input]:placeholder:text-white/80">
        <h1 className="text-3xl text-center">{LL?.PAGES.LOGIN.TITLE()}</h1>
        <div className="flex grow flex-col gap-10 justify-center items-center">
          <input
            type="text"
            className="border-b border-white w-full max-w-full bg-[transparent] outline-none"
            placeholder={LL?.PAGES.LOGIN.PLACEHOLDERS.EMAIL()}
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
            }}
          />
          <input
            type="password"
            className="border-b border-white max-w-full bg-[transparent] outline-none"
            placeholder={LL?.PAGES.LOGIN.PLACEHOLDERS.PASSWORD()}
            value={form.password}
            onChange={(e) => {
              setForm({ ...form, password: e.target.value });
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Link
            to={`/${locale}/signup`}
            className="text-black shrink grow py-3 px-3 bg-white rounded-xl flex justify-center items-center gap-2"
          >
            <span>{LL?.PAGES.LOGIN.LINKS.SIGNUP()}</span>
          </Link>
          <button
            type="submit"
            className="shrink grow py-3 px-3 bg-black rounded-xl text-white flex justify-center items-center gap-2"
          >
            {mutationLogin.isIdle && (
              <span>{LL?.PAGES.LOGIN.BUTTONS.LOGIN()}</span>
            )}
            {mutationLogin.isPending && (
              <>
                <span>{LL?.PAGES.LOGIN.BUTTONS.LOGIN_LOADING()}</span>
                <FontAwesomeIcon className="animate-spin" icon={faSpinner} />
              </>
            )}
            {mutationLogin.isError && (
              <span>{LL?.PAGES.LOGIN.BUTTONS.LOGIN_ERROR()}</span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
