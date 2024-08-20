export const StoreServicesShimmer = () => {
  return (
    <div className="px-4 pb-16 pt-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="grid max-w-screen-lg mx-auto space-y-6 lg:grid-cols-2 lg:space-y-0 lg:divide-x gap-x-20">
        <div className="mr-5">
          <div className="py-2 text-center">
            <div className="my-3 w-1/2 m-auto h-12 rounded-lg bg-slate-200 bg-gradient-to-r from-slate-300 animate-pulse"></div>
            <hr className="border-b border-b-gray-300" />
            <div className="mt-5 mb-2 h-4 w-full rounded-lg bg-slate-200 bg-gradient-to-r from-slate-300 animate-pulse"></div>
            <div className="mt-5 mb-2 h-4 w-3/4 rounded-lg bg-slate-200 bg-gradient-to-r from-slate-300 animate-pulse"></div>
          </div>
          <div className="mb-5">
            {Array.from({ length: 1 }, (_, index) => (
              <ServiceItemShimmer key={index} />
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
              <ServiceItemShimmer key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ServiceItemShimmer = () => {
  return (
    <div className="py-3 w-full">
      <div className="my-3 w-40 h-8 rounded-lg bg-slate-200 bg-gradient-to-r from-slate-300 animate-pulse"></div>
      <div className="my-3 w-full h-4 rounded-lg bg-slate-200 bg-gradient-to-r from-slate-300 animate-pulse"></div>
      <div className="my-3 w-3/4 h-4 rounded-lg bg-slate-200 bg-gradient-to-r from-slate-300 animate-pulse"></div>
    </div>
  );
};
