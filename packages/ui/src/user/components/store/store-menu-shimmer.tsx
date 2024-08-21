export const StoreMenuShimmer = () => {
  return (
    <>
      <div className="grid max-w-screen-lg mx-auto space-y-6 lg:grid-cols-2 lg:space-y-0 gap-x-20">
        <div className="mr-5">
          <div className="py-2 text-center">
            <div className="my-3 w-1/2 m-auto h-12 rounded-lg bg-slate-200 bg-gradient-to-r from-slate-300 animate-pulse"></div>
            <hr className="border-b border-b-gray-300" />
            <div className="mt-5 mb-2 h-4 w-full rounded-lg bg-slate-200 bg-gradient-to-r from-slate-300 animate-pulse"></div>
            <div className="mt-5 mb-2 h-4 w-3/4 rounded-lg bg-slate-200 bg-gradient-to-r from-slate-300 animate-pulse"></div>
          </div>
          <div className="mb-5">
            {Array.from({ length: 1 }, (_, index) => (
              <MenuItemShimmer key={index} />
            ))}
          </div>
        </div>
        <div className="mr-5 hidden lg:block">
          <div className="py-2 text-center">
            <div className="my-3 w-1/2 m-auto h-12 rounded-lg bg-slate-200 bg-gradient-to-r from-slate-300 animate-pulse"></div>
            <hr className="border-b border-b-gray-300" />
            <div className="mt-5 mb-2 h-4 w-full rounded-lg bg-slate-200 bg-gradient-to-r from-slate-300 animate-pulse"></div>
            <div className="mt-5 mb-2 h-4 w-3/4 rounded-lg bg-slate-200 bg-gradient-to-r from-slate-300 animate-pulse"></div>
          </div>
          <div className="mb-5">
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
    <div className="py-3 w-full">
      <div className="my-3 w-40 h-8 rounded-lg bg-slate-200 bg-gradient-to-r from-slate-300 animate-pulse"></div>
      <div className="my-3 w-full h-4 rounded-lg bg-slate-200 bg-gradient-to-r from-slate-300 animate-pulse"></div>
      <div className="my-3 w-3/4 h-4 rounded-lg bg-slate-200 bg-gradient-to-r from-slate-300 animate-pulse"></div>
    </div>
  );
};
