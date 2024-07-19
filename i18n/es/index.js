// @ts-check

/**
 * @typedef { import('../i18n-types.js').Translation } Translation
 */

import { login } from "./client/login";

/** @satisfies { Translation } */
const es = {
  // TODO: your translations go here
  PAGES: {
    LOGIN: login,
  },
};

// eslint-disable-next-line import/no-default-export
export default es;
