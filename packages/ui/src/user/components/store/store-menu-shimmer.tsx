export const StoreMenuShimmer = () => {
  return (
    <>
      <div className="ui-grid ui-max-w-screen-lg ui-mx-auto ui-space-y-6 lg:ui-grid-cols-2 lg:ui-space-y-0 ui-gap-x-20">
        <div className="ui-mr-5">
          <div className="ui-py-2 ui-text-center">
            <div className="ui-my-3 ui-w-1/2 ui-m-auto ui-h-12 ui-rounded-lg ui-bg-slate-200 ui-bg-gradient-to-r ui-from-slate-300 ui-animate-pulse"></div>
            <hr className="ui-border-b ui-border-b-gray-300" />
            <div className="ui-mt-5 ui-mb-2 ui-h-4 ui-w-full ui-rounded-lg ui-bg-slate-200 ui-bg-gradient-to-r ui-from-slate-300 ui-animate-pulse"></div>
            <div className="ui-mt-5 ui-mb-2 ui-h-4 ui-w-3/4 ui-rounded-lg ui-bg-slate-200 ui-bg-gradient-to-r ui-from-slate-300 ui-animate-pulse"></div>
          </div>
          <div className="ui-mb-5">
            {Array.from({ length: 1 }, (_, index) => (
              <MenuItemShimmer key={index} />
            ))}
          </div>
        </div>
        <div className="ui-mr-5 ui-hidden lg:ui-block">
          <div className="ui-py-2 ui-text-center">
            <div className="ui-my-3 ui-w-1/2 ui-m-auto ui-h-12 ui-rounded-lg ui-bg-slate-200 ui-bg-gradient-to-r ui-from-slate-300 ui-animate-pulse"></div>
            <hr className="ui-border-b ui-border-b-gray-300" />
            <div className="ui-mt-5 ui-mb-2 ui-h-4 ui-w-full ui-rounded-lg ui-bg-slate-200 ui-bg-gradient-to-r ui-from-slate-300 ui-animate-pulse"></div>
            <div className="ui-mt-5 ui-mb-2 ui-h-4 ui-w-3/4 ui-rounded-lg ui-bg-slate-200 ui-bg-gradient-to-r ui-from-slate-300 ui-animate-pulse"></div>
          </div>
          <div className="ui-mb-5">
            {Array.from({ length: 2 }, (_, index) => (
              <MenuItemShimmer key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const MenuItemShimmer = () => {
  return (
    <div className="ui-py-3 ui-w-full">
      <div className="ui-my-3 ui-w-40 ui-h-8 ui-rounded-lg ui-bg-slate-200 ui-bg-gradient-to-r ui-from-slate-300 ui-animate-pulse"></div>
      <div className="ui-my-3 ui-w-full ui-h-4 ui-rounded-lg ui-bg-slate-200 ui-bg-gradient-to-r ui-from-slate-300 ui-animate-pulse"></div>
      <div className="ui-my-3 ui-w-3/4 ui-h-4 ui-rounded-lg ui-bg-slate-200 ui-bg-gradient-to-r ui-from-slate-300 ui-animate-pulse"></div>
    </div>
  );
};
