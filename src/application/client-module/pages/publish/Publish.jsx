import { CaseForm } from "./components/CaseForm";
import { useLocaleService } from "../../../../services/locale";

export function Publish() {
  const { LL } = useLocaleService();

  return (
    <div className="flex flex-col md:grid grid-cols-2 gap-5 h-full min-h-fit">
      <div className="w-full p-4 bg-black/60 text-white  shrink-0 flex flex-col justify-between gap-5 px-10 text-xl">
        <div className="flex flex-col gap-5 grow justify-center">
          <p>{LL?.PAGES.PUBLISH.PARAGRAPH_ONE()}</p>
          <p>{LL?.PAGES.PUBLISH.PARAGRAPH_TWO()}</p>
          <p>{LL?.PAGES.PUBLISH.PARAGRAPH_THREE()}</p>
        </div>
        <p className="text-lg text-silver-500">
          {LL?.PAGES.PUBLISH.REMINDER()}
        </p>
      </div>
      <div className="w-full flex justify-center items-center py-10 px-3 md:p-10">
        <CaseForm className="grow w-full" />
      </div>
    </div>
  );
}
