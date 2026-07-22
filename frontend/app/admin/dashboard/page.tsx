"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import StatsCard from "@/components/admin/StatsCard";

export default function Dashboard() {

  const [stats, setStats] = useState({
    totalStandards: 0,
    versions: 0,
    published: 0,
    drafts: 0,
  });

  useEffect(() => {

    async function loadStats() {

      const res = await axios.get(
  `${process.env.NEXT_PUBLIC_API_URL}/api/standards/dashboard/stats`
);
      setStats(res.data.data);

    }

    loadStats();

  }, []);

  return (

    <div className="flex bg-[#F8F4EE]">

      <Sidebar />

      <main className="flex-1 p-10">

        <Header />

        <div className="grid grid-cols-4 gap-6">

          <StatsCard
            title="Standards"
            value={stats.totalStandards}
          />

          <StatsCard
            title="Versions"
            value={stats.versions}
          />

          <StatsCard
            title="Published"
            value={stats.published}
          />

          <StatsCard
            title="Drafts"
            value={stats.drafts}
          />

        </div>

      </main>

    </div>

  );
}