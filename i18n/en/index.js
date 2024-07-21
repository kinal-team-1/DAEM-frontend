// @ts-check

/**
 * @typedef { import('../i18n-types.js').BaseTranslation } BaseTranslation
 */

import { login } from "./client/login";
import { signup } from "./client/signup";
import { publish } from "./client/publish";
import { editProfile } from "./client/edit-profile";
import { publicCases } from "./client/public-cases";

/** @satisfies { BaseTranslation } */
const en = {
  // TODO: your translations go here
  PAGES: {
    LOGIN: login,
    SIGNUP: signup,
    PUBLISH: publish,
    EDIT_PROFILE: editProfile,
    PUBLIC_CASES: publicCases,
  },
};

// eslint-disable-next-line import/no-default-export
export default en;
