import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signup } from "../../../../actions/POST/signup";
import { login } from "../../../../actions/POST/login";
import { useAuthService } from "../../../../../services/auth";
import { useLocaleService } from "../../../../../services/locale";

export function SignupForm() {
  const { LL } = useLocaleService();
  const { locale } = useParams();
  const navigate = useNavigate();
  const { setUser } = useAuthService();
  const [form, setForm] = useState({
    name: "",
    lastname: "",
    DPI: "",
    phone_number: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const mutationLogin = useMutation({
    mutationFn: login,
    onSuccess: ([user, message, status, token]) => {
      localStorage.setItem("token", token);
      setUser(user);
      navigate(`/${locale}/publish`);
    },
  });

  const mutationSignup = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      mutationLogin.mutate(form);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!mutationSignup.isIdle) return;

        if (form.password !== form.confirmPassword) return;
        mutationSignup.mutateAsync(form).finally(() => {
          setTimeout(() => mutationSignup.reset(), 3000);
        });
      }}
      className="md:bg-black/70 flex flex-col gap-2 md:flex-row md:gap-0 h-fit"
    >
      <div className="size-[400px] bg-black/70 md:bg-[transparent] max-w-[90vw] p-7 text-white flex flex-col gap-10 text-xl justify-center [&_input]:placeholder:text-white/80">
        <input
          className="border-b border-white bg-[transparent] outline-none"
          placeholder={LL?.PAGES.SIGNUP.PLACEHOLDERS.NAME()}
          type="text"
          value={form.name}
          onChange={(e) => {
            setForm({ ...form, name: e.target.value });
          }}
        />
        <input
          className="border-b border-white bg-[transparent] outline-none"
          placeholder={LL?.PAGES.SIGNUP.PLACEHOLDERS.LASTNAME()}
          type="text"
          value={form.lastname}
          onChange={(e) => {
            setForm({ ...form, lastname: e.target.value });
          }}
        />
        <input
          className="border-b border-white bg-[transparent] outline-none"
          placeholder={LL?.PAGES.SIGNUP.PLACEHOLDERS.DPI()}
          type="text"
          value={form.DPI}
          onChange={(e) => {
            setForm({ ...form, DPI: e.target.value });
          }}
        />
        <input
          className="border-b border-white bg-[transparent] outline-none"
          placeholder={LL?.PAGES.SIGNUP.PLACEHOLDERS.PHONE_NUMBER()}
          type="text"
          value={form.phone_number}
          onChange={(e) => {
            setForm({ ...form, phone_number: e.target.value });
          }}
        />
      </div>
      <div className="border md:grow" />
      <div className="size-[400px] bg-black/70 md:bg-[transparent] max-w-[90vw] p-7 text-white flex flex-col gap-10 text-xl justify-center [&_input]:placeholder:text-white/80">
        <input
          className="border-b border-white bg-[transparent] outline-none"
          placeholder={LL?.PAGES.SIGNUP.PLACEHOLDERS.EMAIL()}
          type="text"
          value={form.email}
          onChange={(e) => {
            setForm({ ...form, email: e.target.value });
          }}
        />
        <input
          className="border-b border-white bg-[transparent] outline-none"
          placeholder={LL?.PAGES.SIGNUP.PLACEHOLDERS.PASSWORD()}
          type="password"
          value={form.password}
          onChange={(e) => {
            setForm({ ...form, password: e.target.value });
          }}
        />
        <input
          className="border-b border-white bg-[transparent] outline-none"
          placeholder={LL?.PAGES.SIGNUP.PLACEHOLDERS.PASSWORD_CONFIRMATION()}
          type="password"
          value={form.confirmPassword}
          onChange={(e) => {
            setForm({ ...form, confirmPassword: e.target.value });
          }}
        />
        <button
          type="submit"
          className="py-4 px-3 bg-black rounded-xl text-white flex justify-center items-center gap-2"
        >
          {mutationSignup.isIdle && (
            <span>{LL?.PAGES.SIGNUP.BUTTONS.SUBMIT()}</span>
          )}
          {mutationSignup.isPending && (
            <>
              <span>{LL?.PAGES.SIGNUP.BUTTONS.SUBMIT_LOADING()}</span>
              <FontAwesomeIcon className="animate-spin" icon={faSpinner} />
            </>
          )}
          {mutationSignup.isError && (
            <span>{LL?.PAGES.SIGNUP.BUTTONS.SUBMIT_ERROR()}</span>
          )}
        </button>
      </div>
    </form>
  );
}
