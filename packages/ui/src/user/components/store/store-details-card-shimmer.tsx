export const StoreDetailsCardShimmer = () => {
  return (
    <>
      <div className="flex flex-col max-w-screen-lg overflow-hidden border rounded shadow lg:flex-row sm:mx-auto">
        <div className="relative h-48 md:h-96 lg:w-1/2 bg-slate-200 bg-gradient-to-r from-slate-300 animate-pulse">
          <svg
            className="absolute top-0 -right-1 hidden h-full text-white lg:inline-block"
            viewBox="0 0 20 104"
            fill="currentColor"
          >
            <polygon points="17.3036738 5.68434189e-14 20 5.68434189e-14 20 104 0.824555778 104" />
          </svg>
        </div>
        <div className="flex flex-col justify-start px-6 py-12 bg-white lg:w-1/2">
          <div className="w-40 h-8 rounded-full bg-slate-200 bg-gradient-to-r from-slate-300 animate-pulse"></div>
          <div className="my-3 w-80 h-12 rounded-lg bg-slate-200 bg-gradient-to-r from-slate-300 animate-pulse"></div>
          <div className="mt-5 mb-2 h-4 w-full rounded-lg bg-slate-200 bg-gradient-to-r from-slate-300 animate-pulse"></div>
          <div className="mb-2 h-4 w-full rounded-lg bg-slate-200 bg-gradient-to-r from-slate-300 animate-pulse"></div>
          <div className="w-3/4 h-4 rounded-lg bg-slate-200 bg-gradient-to-r from-slate-300 animate-pulse"></div>
        </div>
      </div>
    </>
  );
};
