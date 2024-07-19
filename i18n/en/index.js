// @ts-check

/**
 * @typedef { import('../i18n-types.js').BaseTranslation } BaseTranslation
 */

import { login } from "./client/login";
import { signup } from "./client/signup";

/** @satisfies { BaseTranslation } */
const en = {
  // TODO: your translations go here
  PAGES: {
    LOGIN: login,
    SIGNUP: signup,
  },
};

// eslint-disable-next-line import/no-default-export
export default en;
