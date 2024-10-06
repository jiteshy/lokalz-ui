"use client";

import { Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo } from "react";
import { StoreType } from "@repo/ui/types";
import { STORE_TYPES } from "@repo/ui/constants";

const chartConfig = {
  [StoreType.FOOD_TRUCK]: {
    label: `${STORE_TYPES[StoreType.FOOD_TRUCK]}s`,
    color: "hsl(var(--chart-1))",
  },
  [StoreType.SHOP]: {
    label: `${STORE_TYPES[StoreType.SHOP]}s`,
    color: "hsl(var(--chart-2))",
  },
  [StoreType.HOME_VENDOR]: {
    label: `${STORE_TYPES[StoreType.HOME_VENDOR]}s`,
    color: "hsl(var(--chart-3))",
  },
  [StoreType.OTHER]: {
    label: `${STORE_TYPES[StoreType.OTHER]}s`,
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export const StoreTypeStats = ({
  typeStats,
}: {
  typeStats: Record<StoreType, number>;
}) => {
  const chartData = [
    {
      store: StoreType.FOOD_TRUCK,
      count: typeStats?.[StoreType.FOOD_TRUCK],
      fill: `var(--color-${StoreType.FOOD_TRUCK})`,
    },
    {
      store: StoreType.SHOP,
      count: typeStats?.[StoreType.SHOP],
      fill: `var(--color-${StoreType.SHOP})`,
    },
    {
      store: StoreType.HOME_VENDOR,
      count: typeStats?.[StoreType.HOME_VENDOR],
      fill: `var(--color-${StoreType.HOME_VENDOR})`,
    },
    {
      store: StoreType.OTHER,
      count: typeStats?.[StoreType.OTHER],
      fill: `var(--color-${StoreType.OTHER})`,
    },
  ];

  const totalStores = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, []);

  return (
    <div className="w-full rounded-sm border border-stroke bg-white pt-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[235px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="count"
            label={true}
            nameKey="store"
            innerRadius={40}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-title-md font-bold"
                      >
                        {totalStores.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 20}
                        className="fill-muted-foreground"
                      >
                        Stores
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
          <ChartLegend
            content={<ChartLegendContent nameKey="store" />}
            className="-translate-y-2 flex-wrap text-nowrap pt-6 gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
          />
        </PieChart>
      </ChartContainer>
      <div className="text-center pb-5">
        <span className="text-sm font-medium">Store Types Statistics</span>
      </div>
    </div>
  );
};
