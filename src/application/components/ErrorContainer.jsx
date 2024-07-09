import { useLocaleService } from "../../services/locale";

export function ErrorContainer() {
  const { LL } = useLocaleService();

  return (
    <div className="flex justify-center items-center h-full">
      <div className="text-center">
        <h1 className="md:text-7xl text-4xl font-bold">
          {LL.ERROR.SOMETHING_WENT_WRONG()}
        </h1>
        <p className="md:text-2xl text-xl">
          {LL.ERROR.PLEASE_TRY_AGAIN_LATER()}
        </p>
      </div>
    </div>
  );
}
