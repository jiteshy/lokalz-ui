import DefaultLayout from "@/components/layout/default-layout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative bg-slate-100 min-h-screen">
      <DefaultLayout>{children}</DefaultLayout>
    </main>
  );
}
