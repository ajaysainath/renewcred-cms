"use client";

import { useEffect } from "react";
import { Link2 } from "lucide-react";
import { toast } from "sonner";

function slugify(title: string) {
  return title.trim().toLowerCase().replace(/\./g, "").replace(/\s+/g, "-");
}

export default function Content({
  selectedVersion,
  setActiveSection,
  searchTerm,
}: any) {
  useEffect(() => {
    if (!selectedVersion) return;

    const sections = document.querySelectorAll("section[data-section]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [selectedVersion, setActiveSection]);

  const filteredSections = selectedVersion?.sections
    ?.filter((section: any) => {
      if (!searchTerm.trim()) return true;

      const query = searchTerm.toLowerCase();

      return (
        section.title.toLowerCase().includes(query) ||
        section.content.toLowerCase().includes(query)
      );
    })
    .sort((a: any, b: any) => a.order - b.order);

  async function copyLink(sectionId: string) {
    const url = `${window.location.origin}${window.location.pathname}#${sectionId}`;

    await navigator.clipboard.writeText(url);
    toast.success("Section link copied!");
  }

  if (!selectedVersion) {
    return (
      <section className="col-span-9">
        <p>No Version Selected</p>
      </section>
    );
  }

  if (filteredSections.length === 0) {
    return (
      <section className="col-span-9 flex items-center justify-center py-20">
        <h2 className="text-2xl text-gray-400">No matching sections found.</h2>
      </section>
    );
  }

  return (
    <section className="col-span-9">
      

      {filteredSections.map((section: any) => {
        const sectionId = slugify(section.title);

        return (
          <section key={section._id} id={sectionId} data-section className="mb-16">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-3xl font-semibold">{section.title}</h2>

              <button
                onClick={() => copyLink(sectionId)}
                className="rounded-full border border-gray-700 p-2 text-gray-400 transition hover:border-red-500 hover:text-red-500"
              >
                <Link2 size={18} />
              </button>
            </div>

            <div
              className="
                prose
                prose-invert
                max-w-none
                prose-headings:text-white
                prose-p:text-gray-300
                prose-li:text-gray-300
              "
              dangerouslySetInnerHTML={{
                __html: section.content,
              }}
            />
          </section>
        );
      })}
    </section>
  );
}