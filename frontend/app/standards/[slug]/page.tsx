"use client";
console.log("PAGE RENDERED");

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/standard/Hero";
import Sidebar from "@/components/standard/Sidebar";
import Content from "@/components/standard/Content";
import axios from "axios";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";


export default function StandardDetail() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const [standard, setStandard] = useState<any>(null);
  const [selectedVersion, setSelectedVersion] = useState<any>(null);
  const [activeSection, setActiveSection] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  

  useEffect(() => {
  console.log("2. useEffect started");

  if (!slug) {
    console.log("3. slug is empty");
    return;
  }

  console.log("4. slug =", slug);
  

  async function load() {
    console.log("5. About to call API");

    try {
      const res = await axios.get(
  `${process.env.NEXT_PUBLIC_API_URL}/api/standards/${slug}`
);

      console.log("6. SUCCESS", res.data);

      const data = res.data.data;

      setStandard(data);

      if (data.versions && data.versions.length > 0) {
        setSelectedVersion(data.versions[0]);
      }
    } catch (err) {
      console.error("7. ERROR", err);
    }
  }

  load();
}, [slug]);

  if (!standard) {
    return (
      <>
        <Navbar />
        <main className="max-w-7xl mx-auto py-20">
          <h1>Loading...</h1>
        </main>
        <Footer />
      </>
    );
  }
  console.log("Standard:", standard);
  console.log("Selected Version:", selectedVersion);
  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-8 py-20">

  <Link
    href="/"
    className="mb-2 inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 text-sm text-gray-300 transition-all duration-300 hover:border-white hover:bg-zinc-800 hover:text-white"
  >
    <ArrowLeft size={18} />
    All Standards
  </Link>

  <Hero
    title={standard.title}
    description={standard.shortDescription}
  />

      <div className="grid grid-cols-12 gap-12">

        <Sidebar
          standard={standard}
          selectedVersion={selectedVersion}
          setSelectedVersion={setSelectedVersion}
          activeSection={activeSection}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

      <Content
        selectedVersion={selectedVersion}
        setActiveSection={setActiveSection}
        searchTerm={searchTerm}
      />

      </div>

    </main>

      <Footer />
    </>
  );
}