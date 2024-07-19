// @ts-check

/**
 * @typedef { import('../i18n-types.js').BaseTranslation } BaseTranslation
 */

import { login } from "./client/login";

/** @satisfies { BaseTranslation } */
const en = {
  // TODO: your translations go here
  PAGES: {
    LOGIN: login,
  },
};

// eslint-disable-next-line import/no-default-export
export default en;
