import DefaultLayout from "@/components/layout/default-layout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen">
      <DefaultLayout>{children}</DefaultLayout>
    </main>
  );
}
