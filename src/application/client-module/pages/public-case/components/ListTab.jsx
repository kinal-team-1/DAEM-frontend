import * as PropTypes from "prop-types";
import { PublicCaseCard } from "../../edit-profile/components/PublicCaseCard";

export function ListTab({ loading, publicCases }) {
  console.log(publicCases);

  return (
    <div className="flex flex-col gap-3 items-center relative grow">
      {!loading && (
        <div className="flex flex-col gap-3 h-full  no-scrollbar w-full max-w-[800px] py-10 px-3">
          {publicCases.map((pubCase) => {
            return (
              <PublicCaseCard
                key={pubCase._id}
                title={pubCase.title}
                description={pubCase.description}
                reported_at={pubCase.reported_at}
                id={pubCase._id}
                attachment={pubCase.attachment}
                submitter={pubCase.submitter}
                className="bg-black/70 text-white"
              />
            );
          })}
        </div>
      )}
      {loading && (
        <div className="w-full h-full flex justify-center items-center">
          <div className="border-b-green-400 rounded-full size-[80px] border-vulcan-500 border-8 animate-spin" />
        </div>
      )}
    </div>
  );
}

ListTab.propTypes = {
  loading: PropTypes.bool,
  publicCases: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      reported_at: PropTypes.string,
      attachment: PropTypes.string,
    }),
  ),
};
