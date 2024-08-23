import { StorePage } from "@repo/ui/user/pages";

// TO-DO Unused as of now. Use again when dynamic routes can be used.
export default function Store({ params }: { params: { store: string } }) {
  return <StorePage store={params.store} />;
}
