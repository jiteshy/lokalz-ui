"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { type Store } from "@repo/ui/types";
import { StorePage } from "@repo/ui/user/pages";
import { Suspense, useEffect } from "react";

export default function StoreContainer() {
  return (
    <Suspense>
      <Store />
    </Suspense>
  );
}

function Store() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const storeId = searchParams?.get("id");

  useEffect(() => {
    if (!storeId) router.push("/");
  }, []);

  return storeId && <StorePage store={storeId} />;
}
