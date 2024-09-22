"use client";

import { useState } from "react";
import { StoreForm } from "@/components/store/store-form";
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

export default function StoreCreateUpdatePage() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState<string>(initialTab || "store");

  let { storeId } = useParams<{ storeId: string }>();
  if (storeId === "new") {
    storeId = "";
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    router.push(`${pathName}?tab=${value}`);
  };

  return (
    <div className="bg-white border border-text-300 w-full p-6 text-slate-700">
      <div className="flex justify-between pb-2 border-b border-slate-200">
        <div>
          <h4 className="text-2xl font-semibold pb-1">
            {storeId ? "Update" : "Add"} Store
          </h4>
          <div className="text-sm text-slate-500">
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
        <TabsList className="grid sm:max-w-screen-lg m-auto grid-cols-4 h-12 mb-3 px-[6px] text-center bg-slate-100">
          <TabsTrigger value="store" className="py-2">
            <div className="flex gap-2">
              <IdCardIcon className="w-5 h-5" />
              Store Details
            </div>
          </TabsTrigger>
          <TabsTrigger value="menu" className="py-2" disabled={!storeId}>
            <div className="flex gap-2">
              <ReaderIcon className="w-5 h-5" />
              Menu
            </div>
          </TabsTrigger>
          <TabsTrigger value="schedule" className="py-2" disabled={!storeId}>
            <div className="flex gap-2">
              <CalendarIcon className="w-5 h-5" />
              Schedule
            </div>
          </TabsTrigger>
          <TabsTrigger value="publish" className="py-2" disabled={!storeId}>
            <div className="flex gap-2">
              <LightningBoltIcon className="w-5 h-5" />
              Publish
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="store" className="pt-3">
          <StoreForm storeId={storeId} />
        </TabsContent>
        <TabsContent value="menu" className="pt-3">
          <MenuForm storeId={storeId} />
        </TabsContent>
        <TabsContent value="schedule" className="pt-3">
          <ScheduleForm storeId={storeId} />
        </TabsContent>
        <TabsContent value="publish" className="pt-3">
          <StorePublish storeId={storeId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
