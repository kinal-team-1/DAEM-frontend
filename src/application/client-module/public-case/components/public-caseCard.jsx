import PropTypes from "prop-types";
import { useLocaleService } from "../../../../services/locale";

// HIGHER ORDER COMPONENT
export function PublicCaseCard({ submitter, title, description }) {
  const { LL } = useLocaleService();
  return (
    <form className="flex flex-col justify-between border border-gray-200 rounded-md p-4 shadow-sm">
      <div className="">
        <h3 className="text-lg font-semibold">
          <span className="text-primary-400">
            {LL?.PAGES?.PUBLICATIONS?.SUBMITTER?.()}
          </span>
        </h3>
        <p className="text-gray-500">
          <span className="text-primary-400">
            {LL?.PAGES?.PUBLICATIONS?.TITLE?.()}
          </span>
        </p>
        <div className="text-gray-500">
          <span className="text-primary-400">
            {LL?.PAGES?.PUBLICATIONS?.DESCRIPTION?.()}
          </span>
          <span className="text-lg font-semibold text-gray-900" />
        </div>
      </div>
    </form>
  );
}
PublicCaseCard.propTypes = {
  // eslint-disable-next-line react/require-default-props
  submitter: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  title: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  description: PropTypes.string,
};
