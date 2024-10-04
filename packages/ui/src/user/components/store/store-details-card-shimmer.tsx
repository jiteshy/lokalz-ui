export const StoreDetailsCardShimmer = () => {
  return (
    <>
      <div className="ui-flex ui-flex-col ui-max-w-screen-lg ui-overflow-hidden ui-border ui-rounded ui-shadow lg:ui-flex-row sm:ui-mx-auto">
        <div className="ui-relative ui-h-48 md:ui-h-96 lg:ui-w-1/2 ui-bg-slate-200 ui-bg-gradient-to-r ui-from-slate-300 ui-animate-pulse">
          <svg
            className="ui-absolute ui-top-0 -ui-right-1 ui-hidden ui-h-full ui-text-white lg:ui-inline-block"
            viewBox="0 0 20 104"
            fill="currentColor"
          >
            <polygon points="17.3036738 5.68434189e-14 20 5.68434189e-14 20 104 0.824555778 104" />
          </svg>
        </div>
        <div className="ui-flex ui-flex-col ui-justify-start ui-px-6 ui-py-12 ui-bg-white lg:ui-w-1/2">
          <div className="ui-w-40 ui-h-8 ui-rounded-full ui-bg-slate-200 ui-bg-gradient-to-r ui-from-slate-300 ui-animate-pulse"></div>
          <div className="ui-my-3 ui-w-80 ui-h-12 ui-rounded-lg ui-bg-slate-200 ui-bg-gradient-to-r ui-from-slate-300 ui-animate-pulse"></div>
          <div className="ui-mt-5 ui-mb-2 ui-h-4 ui-w-full ui-rounded-lg ui-bg-slate-200 ui-bg-gradient-to-r ui-from-slate-300 ui-animate-pulse"></div>
          <div className="ui-mb-2 ui-h-4 ui-w-full ui-rounded-lg ui-bg-slate-200 ui-bg-gradient-to-r ui-from-slate-300 ui-animate-pulse"></div>
          <div className="ui-w-3/4 ui-h-4 ui-rounded-lg ui-bg-slate-200 ui-bg-gradient-to-r ui-from-slate-300 ui-animate-pulse"></div>
        </div>
      </div>
    </>
  );
};
