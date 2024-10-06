"use client";

import { useState } from "react";
import { StoreForm } from "@/components/store/details/store-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import {
  ArrowLeftIcon,
  CalendarIcon,
  IdCardIcon,
  LightningBoltIcon,
  ReaderIcon,
} from "@radix-ui/react-icons";
import { MenuForm } from "@/components/store/menu/menu-form";
import { Button } from "@/components/ui/button";
import { ScheduleForm } from "@/components/store/schedule/schedule-form";
import { StorePublish } from "@/components/store/publish/store-publish";
import { StoreStatus } from "@repo/ui/types";

export default function StoreCreateUpdatePage() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab");
  const storeStatus = searchParams.get("status") as StoreStatus;
  const storeName = searchParams.get("name");
  const [activeTab, setActiveTab] = useState<string>(initialTab || "store");

  let { storeId } = useParams<{ storeId: string }>();
  if (storeId === "new") {
    storeId = "";
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    router.push(
      `${pathName}?tab=${value}&name=${storeName}&status=${storeStatus}`,
    );
  };

  return (
    <div className="bg-white border border-text-300 w-full p-6 text-slate-700 dark:text-slate-200 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-strokedark">
        <div>
          <h4 className="text-2xl font-semibold pb-1">
            {storeId ? "Update" : "Add"} Store{" "}
            <span className="text-indigo-500">
              {storeName ? ` (${storeName})` : ""}
            </span>
          </h4>
          <div className="text-sm text-slate-500 dark:text-slate-400">
            Please provide details for the Store
          </div>
        </div>
        <div className="pt-1">
          <Link href={"/store/list"}>
            <Button>
              <ArrowLeftIcon className="w-5 h-5" />
              <span className="pl-2">Go Back</span>
            </Button>
          </Link>
        </div>
      </div>

      <Tabs
        value={activeTab}
        defaultValue="store"
        onValueChange={handleTabChange}
        className="w-full pt-5"
      >
        <TabsList className="grid sm:max-w-screen-lg m-auto grid-cols-4 h-12 mb-3 px-[6px] text-center bg-gradient-to-r from-indigo-100 via-pink-50 to-indigo-100 dark:from-boxdark-0 dark:to-boxdark-0">
          <TabsTrigger value="store" className="py-2">
            <div className="flex gap-2 text-slate-900 dark:text-slate-200">
              <IdCardIcon className="w-5 h-5" />
              Store Details
            </div>
          </TabsTrigger>
          <TabsTrigger value="menu" className="py-2" disabled={!storeId}>
            <div className="flex gap-2 text-slate-900 dark:text-slate-200">
              <ReaderIcon className="w-5 h-5" />
              Menu
            </div>
          </TabsTrigger>
          <TabsTrigger value="schedule" className="py-2" disabled={!storeId}>
            <div className="flex gap-2 text-slate-900 dark:text-slate-200">
              <CalendarIcon className="w-5 h-5" />
              Schedule
            </div>
          </TabsTrigger>
          <TabsTrigger value="publish" className="py-2" disabled={!storeId}>
            <div className="flex gap-2 text-slate-900 dark:text-slate-200">
              <LightningBoltIcon className="w-5 h-5" />
              {storeStatus === StoreStatus.ACTIVE ? "Preview" : "Publish"}
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="store" className="pt-3">
          <StoreForm storeId={storeId} storeName={storeName!} />
        </TabsContent>
        <TabsContent value="menu" className="pt-3">
          <MenuForm storeId={storeId} />
        </TabsContent>
        <TabsContent value="schedule" className="pt-3">
          <ScheduleForm storeId={storeId} />
        </TabsContent>
        <TabsContent value="publish" className="pt-3">
          <StorePublish storeId={storeId} storeStatus={storeStatus} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
