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
      <div style={{ marginLeft: `${sidebarWidth}px` }}>
        <AdminNav />
      </div>
      <div style={{ width: `${sidebarWidth}px` }}>
        <SideBar />
      </div>
      <div className="px-6 pb-6" style={{ marginLeft: `${sidebarWidth}px` }}>
        {children}
      </div>
    </main>
  );
}
