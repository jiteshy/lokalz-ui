import { StorePage } from "@repo/ui/user/pages";

export default function Store({ params }: { params: { store: string } }) {
  return <StorePage store={params.store} />;
}
