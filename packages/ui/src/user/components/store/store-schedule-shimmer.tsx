export const StoreScheduleShimmer = () => {
  return (
    <>
      {Array.from({ length: 3 }, (_, index) => (
        <div
          key={index}
          className="p-2 min-h-[72px] pt-3 text-center w-full mb-2 shadow rounded border-l-8 border-l-slate-300 bg-slate-50"
        >
          <div className="flex gap-3 items-center">
            <div className="w-16 text-center h-12 rounded-lg bg-slate-200 bg-gradient-to-r from-slate-300 animate-pulse"></div>
            <div className="text-sm text-left w-full h-12 rounded-lg bg-slate-200 bg-gradient-to-r from-slate-300 animate-pulse">
              <div className="text-lg text-slate-800 mb-2"></div>
              <div className="text-slate-500"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
