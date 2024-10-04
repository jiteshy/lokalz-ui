export const StoreScheduleShimmer = () => {
  return (
    <>
      {Array.from({ length: 3 }, (_, index) => (
        <div
          key={index}
          className="ui-p-2 ui-min-h-[72px] ui-pt-3 ui-text-center ui-w-full ui-mb-2 ui-shadow ui-rounded ui-border-l-8 ui-border-l-slate-300 ui-bg-slate-50"
        >
          <div className="ui-flex ui-gap-3 ui-items-center">
            <div className="ui-w-16 ui-text-center ui-h-12 ui-rounded-lg ui-bg-slate-200 ui-bg-gradient-to-r ui-from-slate-300 ui-animate-pulse"></div>
            <div className="ui-text-sm ui-text-left ui-w-full ui-h-12 ui-rounded-lg ui-bg-slate-200 ui-bg-gradient-to-r ui-from-slate-300 ui-animate-pulse">
              <div className="ui-text-lg ui-text-slate-800 ui-mb-2"></div>
              <div className="ui-text-slate-500"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
