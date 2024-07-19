// @ts-check

/**
 * @typedef { import('../i18n-types.js').Translation } Translation
 */

import { login } from "./client/login";
import { signup } from "./client/signup.js";

/** @satisfies { Translation } */
const es = {
  // TODO: your translations go here
  PAGES: {
    LOGIN: login,
    SIGNUP: signup,
  },
};

// eslint-disable-next-line import/no-default-export
export default es;
