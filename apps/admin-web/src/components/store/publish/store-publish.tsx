"use client";

import { Button } from "@/components/ui/button";
import { useAxios } from "@/hooks/use-axios";
import { useToast } from "@/hooks/use-toast";
import { CheckIcon } from "@radix-ui/react-icons";
import { StoreStatus } from "@repo/ui/types";
import { StorePage } from "@repo/ui/user/pages";
import { useRouter } from "next/navigation";

export const StorePublish = ({
  storeId,
  storeStatus,
}: {
  storeId: string;
  storeStatus?: StoreStatus;
}) => {
  const axios = useAxios();
  const { toast } = useToast();
  const router = useRouter();

  const handlePublishStore = () => {
    return axios.put(`/store/${storeId}/status/${StoreStatus.ACTIVE}`).then(
      async () => {
        toast({
          title: "Success!",
          duration: 5000,
          description: "Store is published successfully!",
        });
        router.push("/store/list");
      },
      () => {
        toast({
          variant: "destructive",
          duration: 5000,
          title: "Failure!",
          description: "Store is not published. Please try again.",
        });
      },
    );
  };

  return (
    <div className="sm:max-w-screen-lg m-auto pt-3">
      <div className="flex items-center justify-between pb-2 border-b border-b-slate-200 dark:border-strokedark">
        <h4 className="text-xl">
          Store Preview
          <span className="text-xs text-slate-500 dark:text-slate-400 pl-2">
            (Below is how users would see your store.)
          </span>
        </h4>
        <div className="flex items-center gap-3">
          {storeStatus !== StoreStatus.ACTIVE ? (
            <Button
              type="submit"
              className="bg-deep-purple-accent-400"
              onClick={handlePublishStore}
            >
              <CheckIcon className="w-5 h-5" />
              <span className="pl-2">Publish Store</span>
            </Button>
          ) : (
            <div className="flex items-center gap-2 py-2 text-deep-purple-accent-700">
              <CheckIcon className="w-5 h-5" /> Already Published
            </div>
          )}
        </div>
      </div>
      <div className="-ml-8 -mr-8 mt-6">
        <StorePage store={storeId} isPreview={true} />
      </div>
    </div>
  );
};
