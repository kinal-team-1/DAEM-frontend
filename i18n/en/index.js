// @ts-check

/**
 * @typedef { import('../i18n-types.js').BaseTranslation } BaseTranslation
 */

import { login } from "./client/login";
import { signup } from "./client/signup";
import { publish } from "./client/publish";
import { editProfile } from "./client/edit-profile";

/** @satisfies { BaseTranslation } */
const en = {
  // TODO: your translations go here
  PAGES: {
    SERVICE: {
      NAME: "Name",
      DESCRIPTION: "Description",
      PRICE: "Price",
    },
    FAVORITE_ACCOUNT: {
      ACCOUNT: "Account",
      OWNER: "Owner",
      ALIAS: "alias",
    },
    PUBLICATIONS: {
      SUBMITTER: "submitter",
      TITLE: "Title",
      DESCRIPTION: "Description",
    },
    LOGIN: login,
    SIGNUP: signup,
    PUBLISH: publish,
    EDIT_PROFILE: editProfile,
  },
};

// eslint-disable-next-line import/no-default-export
export default en;
