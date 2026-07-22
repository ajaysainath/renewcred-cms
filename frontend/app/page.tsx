"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getStandards } from "@/services/standard.service";
import Link from "next/link";

interface Standard {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
}

export default function Home() {
  const [standards, setStandards] = useState<Standard[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getStandards();
      setStandards(res.data.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-8 pt-8 pb-20">

        <section className="pt-8 pb-16">

          <span className="border rounded-full px-4 py-2 text-sm">
            Standards
          </span>

          <h1 className="text-6xl italic mt-4">
            RenewCred Standards
          </h1>

          <p className="text-gray-500 mt-6 max-w-2xl">
            Explore sustainability standards and
            documentation managed through our CMS.
          </p>

        </section>

        <section className="space-y-20">

          {standards.map((standard) => (

            <div
              key={standard._id}
              className="border-b pb-12"
            >

              <div className="flex justify-between">

                <h2 className="text-4xl">
                  {standard.title}
                </h2>

                <Link
                  href={`/standards/${standard.slug}`}
                  className="underline"
                >
                  Read More
                </Link>

              </div>

              <p className="mt-8 text-gray-600 leading-8">
                {standard.shortDescription}
              </p>

            </div>

          ))}

        </section>

      </main>

      <Footer />
    </>
  );
}