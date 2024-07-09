// @ts-check

/**
 * @typedef { import('../i18n-types.js').BaseTranslation } BaseTranslation
 */

/** @satisfies { BaseTranslation } */
const en = {
  // TODO: your translations go here
  HI: "Hi {name:string}!",
  TITLE: "Hello World!",
  NAVBAR: {
    HOME: "Home",
    SERVICES: "Services",
    MOVEMENTS: "Movements",
    CURRENCIES: "Currencies",
    LOG_OUT: "Log out",
    FAVORITE_ACCOUNTS: "Favorite Accounts",
  },
  ERROR: {
    SOMETHING_WENT_WRONG: "Something went wrong",
    PLEASE_TRY_AGAIN_LATER: "Please try again later",
  },
  TOAST: {
    SUCCESS: "Success",
  },
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
  },
};

// eslint-disable-next-line import/no-default-export
export default en;
