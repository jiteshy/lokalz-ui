import Link from "next/link";
import { AdminNav } from "@/components/nav";
import { Logo } from "@repo/ui/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuildingUser,
  faCircleUser,
  faEnvelopeCircleCheck,
  faInbox,
  faShop,
} from "@fortawesome/free-solid-svg-icons";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative bg-slate-100 min-h-screen">
      <div className="ml-[250px]">
        <AdminNav />
      </div>

      <div>
        <aside className="absolute top-0 left-0 bottom-0 w-[250px] min-h-screen bg-white border-r border-r-slate-300 text-slate-700">
          <Link href={"/admin"}>
            <div className="flex gap-2 items-end p-6 border-b border-b-slate-200">
              <Logo iconOnly={true} />
              <div className="text-2xl text-gray-900">
                Lokalz
                <span className="pl-2 text-xs text-slate-500">ADMIN</span>
              </div>
            </div>
          </Link>
          <ul className="p-3">
            <li className="p-3 text-slate-500 hover:text-slate-800">
              <Link href={"/admin"}>
                <div className="flex items-center">
                  <div className="w-6 h-6">
                    <FontAwesomeIcon icon={faShop} />
                  </div>
                  <div className="pl-2">Stores</div>
                </div>
              </Link>
            </li>
            <li className="p-3 text-slate-500">
              <div className="flex items-center">
                <div className="w-6 h-6">
                  <FontAwesomeIcon icon={faInbox} />
                </div>
                <span className="pl-2">Messages</span>
              </div>
            </li>
            <li className="py-3 px-8 text-slate-500 hover:text-slate-800">
              <Link href={"/admin/messages/user"}>
                <div className="flex items-center">
                  <div className="w-6 h-6">
                    <FontAwesomeIcon icon={faCircleUser} />
                  </div>
                  <span className="pl-2">Users</span>
                </div>
              </Link>
            </li>
            <li className="py-3 px-8 text-slate-500 hover:text-slate-800">
              <Link href={"/admin/messages/vendor"}>
                <div className="flex items-center">
                  <div className="w-6 h-6">
                    <FontAwesomeIcon icon={faBuildingUser} />
                  </div>
                  <span className="pl-2">Vendors</span>
                </div>
              </Link>
            </li>
            <li className="p-3 text-slate-500 hover:text-slate-800">
              <Link href={"/admin/subscription"}>
                <div className="flex items-center">
                  <div className="w-6 h-6">
                    <FontAwesomeIcon icon={faEnvelopeCircleCheck} />
                  </div>
                  <span className="pl-2">Mailing List</span>
                </div>
              </Link>
            </li>
          </ul>
        </aside>
        <div className="ml-[250px] px-6 py-3">{children}</div>
      </div>
    </main>
  );
}
