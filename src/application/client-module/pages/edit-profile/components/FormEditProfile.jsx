import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocaleService } from "../../../../../services/locale";
import { editProfile } from "../../../../actions/PUT/edit-profile";
import { useAuthService } from "../../../../../services/auth";
// import { DAEMToast } from "../../../../components/DAEMToast";
import { useMutationWithToast } from "../../../../hooks/use-mutation-with-toast";

const removeQueryParams = (searchParams, param) => {
  const newSearchParams = new URLSearchParams(searchParams);
  newSearchParams.delete(param);
  return newSearchParams.toString();
};

export function FormEditProfile({ searchParams, user }) {
  const [form, setForm] = useState({
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const { setUser } = useAuthService();
  const { LL } = useLocaleService();
  const navigate = useNavigate();

  const editProfileMutation = useMutationWithToast(editProfile, {
    onSuccess: ([newUser]) => {
      setUser(newUser);
      navigate(`./?${removeQueryParams(searchParams, "isEdit")}`);
    },
  });

  useEffect(() => {
    if (!editProfileMutation.isError) return;
    setTimeout(() => editProfileMutation.reset(), 3000);
  }, [editProfileMutation.isError]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (Object.keys(form).some((key) => !form[key])) return;
        if (!editProfileMutation.isIdle) return;
        if (form.password !== form.confirmPassword) {
          return;
        }
        editProfileMutation.mutate({
          phone_number: form.phoneNumber,
          password: form.password,
          // eslint-disable-next-line no-underscore-dangle
          userId: user._id,
        });
      }}
      className="flex flex-col gap-5 [&_input]:border-2"
    >
      <input
        placeholder={LL?.PAGES.EDIT_PROFILE.FORM.PLACEHOLDERS.PHONE_NUMBER()}
        type="text"
        className="border p-2 rounded-lg bg-[transparent] outline-none"
        onChange={(e) => {
          setForm({ ...form, phoneNumber: e.target.value });
        }}
      />
      <input
        placeholder={LL?.PAGES.EDIT_PROFILE.FORM.PLACEHOLDERS.PASSWORD()}
        type="password"
        className="border p-2 rounded-lg bg-[transparent] outline-none"
        onChange={(e) => {
          setForm({ ...form, password: e.target.value });
        }}
      />
      <input
        placeholder={LL?.PAGES.EDIT_PROFILE.FORM.PLACEHOLDERS.CONFIRM_PASSWORD()}
        type="password"
        className="border p-2 rounded-lg bg-[transparent] outline-none"
        onChange={(e) => {
          setForm({ ...form, confirmPassword: e.target.value });
        }}
      />
      <div className="flex gap-2 text-sm">
        <button
          type="submit"
          className=" py-2 bg-white text-black rounded-lg grow flex justify-center items-center gap-2"
        >
          {editProfileMutation.isIdle && (
            <span>{LL?.PAGES.EDIT_PROFILE.FORM.BUTTONS.SUBMIT()}</span>
          )}
          {editProfileMutation.isPending && (
            <>
              <span>{LL?.PAGES.EDIT_PROFILE.FORM.BUTTONS.SUBMITTING()}</span>
              <FontAwesomeIcon className="animate-spin" icon={faSpinner} />
            </>
          )}
          {editProfileMutation.isError && (
            <span>{LL?.PAGES.EDIT_PROFILE.FORM.BUTTONS.ERROR()}</span>
          )}
        </button>
        <Link
          to={`./?${removeQueryParams(searchParams, "isEdit")}`}
          className="px-10 py-2 bg-black rounded-lg grow flex justify-center"
        >
          {LL?.PAGES.EDIT_PROFILE.FORM.BUTTONS.CANCEL()}
        </Link>
      </div>
    </form>
  );
}

FormEditProfile.propTypes = {
  searchParams: PropTypes.shape({}).isRequired,
};
