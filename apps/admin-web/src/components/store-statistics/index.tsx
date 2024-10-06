import {
  LayersIcon,
  LightningBoltIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import { CardDataStats } from "./card-data-stats";
import { StoreTypeStats } from "./store-type-stats";
import { StoreType } from "@repo/ui/types";

export type StoreStats = {
  new: number;
  active: number;
  total: number;
  typesCount: Record<StoreType, number>;
};

export const StoresStatistics = ({ stats }: { stats: StoreStats }) => {
  return (
    <div className="p-6 pt-3.5 min-h-screen">
      <div className="pb-3.5">
        <h3 className="text-lg font-medium text-slate-600 dark:text-whiter">
          Today's Statistics
        </h3>
        <h6 className="text-xs text-slate-400">
          {new Date().toLocaleString()}
        </h6>
      </div>
      <div className="flex gap-6 flex-col">
        <CardDataStats
          title="New Stores"
          total={stats.new.toString()}
          rate="2.59%"
          levelUp
        >
          <LightningBoltIcon className="h-5 w-5 text-deep-purple-accent-700" />
        </CardDataStats>
        <CardDataStats
          title="Active Stores"
          total={stats.active.toString()}
          rate="4.35%"
          levelUp
        >
          <RocketIcon className="h-5 w-5 text-green-accent-700" />
        </CardDataStats>
        <CardDataStats
          title="Total Stores"
          total={stats.total.toString()}
          subtitle="(including inactive)"
        >
          <LayersIcon className="h-5 w-5 text-amber-accent-700" />
        </CardDataStats>
        <div className="flex flex-1">
          <StoreTypeStats typeStats={stats.typesCount} />
        </div>
      </div>
    </div>
  );
};
