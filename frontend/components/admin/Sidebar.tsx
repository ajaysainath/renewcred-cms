"use client";

import Link from "next/link";
import { LayoutDashboard, FileText, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Sidebar() {
    const router = useRouter();

    function handleLogout() {
  const confirmed = window.confirm(
    "Are you sure you want to logout?"
  );

  if (!confirmed) return;

  document.cookie =
    "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  toast.success("Logged out successfully!");

  router.push("/login");
}
  return (
    <aside className="w-72 min-h-screen bg-[#4A0E2E] text-[#E8DCC8] p-8">

      <h1 className="text-3xl font-heading italic mb-12">
        RenewCred CMS
      </h1>

      <nav className="space-y-4">

        <Link
          href="/admin/dashboard"
          className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-[#64163F] transition"
        >
          <LayoutDashboard size={20}/>
          Dashboard
        </Link>

        <Link
          href="/admin/standards"
          className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-[#64163F] transition"
        >
          <FileText size={20}/>
          Standards
        </Link>

      </nav>

      <button
      onClick={handleLogout}
        className="mt-16 flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-[#64163F] transition"
      >
        <LogOut size={20}/>
        Logout
      </button>

    </aside>
  );
}