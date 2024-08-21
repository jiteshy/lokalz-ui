import { APIS } from "@repo/ui/config";
import { type Store } from "@repo/ui/types";
import { StorePage } from "@repo/ui/user/pages";

export async function generateStaticParams() {
  const stores = await fetch(`${APIS.STORE.STORES_LIST}/32258`).then((res) => res.json())
 
  return stores.map((store: Store) => ({
    store: store.id,
  }))
}

export default function Store({ params }: { params: { store: string } }) {
  const { store } = params;
  return <StorePage store={store} />;
}
