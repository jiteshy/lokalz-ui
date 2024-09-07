import { AdminNav } from "@/components/nav";
import { SideBar } from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarWidth = "76";
  return (
    <main className="relative bg-slate-100 min-h-screen">
      <div className={`ml-[${sidebarWidth}px]`}>
        <AdminNav />
      </div>
      <div>
        <SideBar width={sidebarWidth} />
        <div className={`ml-[${sidebarWidth}px] px-6 pb-6`}>{children}</div>
      </div>
    </main>
  );
}
