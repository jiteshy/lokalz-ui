"use client";

import { StoreForm } from "@/components/store/store-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeftIcon,
  CalendarIcon,
  IdCardIcon,
  ReaderIcon,
} from "@radix-ui/react-icons";

export default function StoreCreateUpdatePage() {
  let { storeId } = useParams<{ storeId: string }>();
  if (storeId === "new") {
    storeId = "";
  }

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
          <Link
            href={"/store/list"}
            className="px-3 py-2 flex text-sm bg-slate-700 text-slate-200 rounded hover:bg-slate-900"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="pl-2">Go Back</span>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="store" className="w-full pt-5">
        <TabsList className="grid sm:w-3/4 m-auto grid-cols-3 h-12 mb-3 px-[6px] text-center bg-slate-200">
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
        </TabsList>
        <TabsContent value="store" className="pt-3">
          <StoreForm storeId={storeId} />
        </TabsContent>
        <TabsContent value="menu" className="pt-3">
          Update Menu
        </TabsContent>
        <TabsContent value="schedule" className="pt-3">
          Update Schedule
        </TabsContent>
      </Tabs>
    </div>
  );
}
