"use client";

import { useEffect, useState } from "react";
import RichTextEditor from "@/components/RichTextEditor";
import axios from "axios";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function StandardsPage() {
  const [standards, setStandards] = useState([]);

  // Standard modal state
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Version modal state
  const [showVersionModal, setShowVersionModal] = useState(false);
  const [selectedStandard, setSelectedStandard] = useState<any>(null);
  const [version, setVersion] = useState("");
  const [releaseDate, setReleaseDate] = useState("");

  // Section modal state
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<any>(null);
  const [sectionTitle, setSectionTitle] = useState("");
  const [sectionContent, setSectionContent] = useState("");
  const [sectionOrder, setSectionOrder] = useState(1);
  const [isEditingSection, setIsEditingSection] = useState(false);
  const [editingSectionId, setEditingSectionId] = useState("");

  useEffect(() => {
    fetchStandards();
  }, []);

  function getToken() {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
  }

  async function fetchStandards() {
    try {
      const res = await axios.get(
  `${process.env.NEXT_PUBLIC_API_URL}/api/standards`
);
      setStandards(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function createStandard() {
    try {
      const token = getToken();

      if (isEditing) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/standards/${editingId}`,
          {
            title,
            slug,
            shortDescription: description,
            published,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/standards`,
          {
            title,
            slug,
            shortDescription: description,
            published,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      fetchStandards();
      setShowModal(false);
      setIsEditing(false);
      setEditingId("");
      setTitle("");
      setSlug("");
      setDescription("");
      setPublished(false);
    } catch (err) {
      console.log(err);
      alert(isEditing ? "Failed to update standard" : "Failed to create standard");
    }
  }

  function editStandard(standard: any) {
    setIsEditing(true);
    setEditingId(standard._id);
    setTitle(standard.title);
    setSlug(standard.slug);
    setDescription(standard.shortDescription);
    setPublished(standard.published);
    setShowModal(true);
  }

  async function createVersion() {
    try {
      const token = getToken();

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/standards/${selectedStandard.slug}/version`,
        {
          version,
          releaseDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchStandards();
      setVersion("");
      setReleaseDate("");
      setShowVersionModal(false);
      alert("Version created successfully!");
    } catch (err) {
      console.log(err);
      alert("Failed to create version");
    }
  }

  
async function deleteSection(
   
        standard: any,
        version: any,
        sectionId: string
        ) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this section?"
        );

        if (!confirmed) return;

        try {
            const token = getToken();

            await axios.delete(
            `${process.env.NEXT_PUBLIC_API_URL}/api/standards/${standard.slug}/version/${version._id}/section/${sectionId}`,
            {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            }
            );

            await fetchStandards();

            toast.success("Section deleted successfully!");

        } catch (err) {
            console.log(err);
            toast.error("Failed to delete section.");
        }
        }
        async function deleteStandard(id: string) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this standard?"
  );

  if (!confirmed) return;

  try {
    const token = getToken();

    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/api/standards/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    await fetchStandards();

    toast.success("Standard deleted successfully!");

  } catch (err) {
    console.log(err);

    toast.error("Failed to delete standard.");
  }
}
async function saveSection() {
    try {
      const token = getToken();
      console.log(sectionContent);

      if (isEditingSection) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/standards/${selectedStandard.slug}/version/${selectedVersion._id}/section/${editingSectionId}`,
          {
            title: sectionTitle,
            content: sectionContent,
            order: sectionOrder,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(
          `http://localhost:5000/api/standards/${selectedStandard.slug}/version/${selectedVersion._id}/section`,
          {
            title: sectionTitle,
            content: sectionContent,
            order: sectionOrder,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } 

      await fetchStandards();
      setSectionTitle("");
      setSectionContent("");
      setSectionOrder(1);
      setShowSectionModal(false);
      setIsEditingSection(false);
      setEditingSectionId("");
      alert(
        isEditingSection
          ? "Section updated successfully!"
          : "Section created successfully!"
      );
    } catch (err) {
      console.log(err);
      alert(
        isEditingSection
          ? "Failed to update section"
          : "Failed to create section"
      );
    }
  }

  function editSection(standard: any, version: any, section: any) {
    setSelectedStandard(standard);
    setSelectedVersion(version);
    setEditingSectionId(section._id);
    setIsEditingSection(true);
    setSectionTitle(section.title);
    setSectionContent(section.content);
    setSectionOrder(section.order);
    setShowSectionModal(true);
  }

  return (
    
    <div className="min-h-screen bg-[#F7F2EA] p-10">

  {/* Breadcrumb */}
  <div className="mb-6 flex items-center gap-2 text-sm">
    <Link
      href="/admin/dashboard"
      className="text-gray-500 hover:text-[#5A123C] transition"
    >
      Dashboard
    </Link>

    <span className="text-gray-400">/</span>

    <span className="font-medium text-[#5A123C]">
      Standards
    </span>
  </div>

  {/* Header */}
  <div className="flex items-center justify-between">
    <div>
      <h1 className="font-heading text-6xl italic text-[#4A0E2E]">
        Standards
      </h1>

      <p className="mt-3 text-gray-500">
        Manage all sustainability standards.
      </p>
    </div>

    <button
      onClick={() => setShowModal(true)}
      className="rounded-2xl bg-[#4A0E2E] px-6 py-4 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105"
    >
      + New Standard
    </button>
  </div>



      <div className="mt-12 grid gap-6">
        {standards.map((standard: any) => (
          <div key={standard._id} className="rounded-3xl bg-white p-8 shadow-xl border">
            <div className="flex justify-between">
              <div>
                <h2 className="text-3xl font-semibold text-[#4A0E2E]">{standard.title}</h2>
                <p className="mt-3 text-gray-600">{standard.shortDescription}</p>
              </div>

              <div className="flex items-center gap-3">
                {standard.published ? (
                  <span className="rounded-full bg-green-100 px-4 py-2 text-green-700">
                    Published
                  </span>
                ) : (
                  <span className="rounded-full bg-yellow-100 px-4 py-2 text-yellow-700">
                    Draft
                  </span>
                )}

                <button
                  onClick={() => editStandard(standard)}
                  className="rounded-xl bg-blue-100 px-4 py-2 text-blue-700 transition-all duration-300 hover:scale-105"
                >
                  ✏ Edit
                </button>

                <button
                  onClick={() => {
                    setSelectedStandard(standard);
                    setShowVersionModal(true);
                  }}
                  className="rounded-xl bg-green-100 px-5 py-3 text-green-700 transition-all duration-300 hover:scale-105"
                >
                  + Version
                </button>

                <button
                    onClick={() => deleteStandard(standard._id)}
                    className="rounded-xl bg-red-100 px-4 py-2 text-red-700 transition-all duration-300 hover:scale-105"
                    >
                    🗑 Delete
                    </button>
              </div>
            </div>

            {standard.versions && standard.versions.length > 0 && (
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h3 className="mb-4 text-xl font-semibold text-[#4A0E2E]">Versions</h3>

                <div className="space-y-4">
                  {standard.versions.map((v: any) => (
                    <div key={v._id} className="rounded-2xl bg-[#F7F2EA] p-5">
                      {/* Version header row */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-[#4A0E2E]">{v.version}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(v.releaseDate).toLocaleDateString()}
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            setSelectedStandard(standard);
                            setSelectedVersion(v);
                            setIsEditingSection(false);
                            setEditingSectionId("");
                            setSectionTitle("");
                            setSectionContent("");
                            setSectionOrder(1);
                            setShowSectionModal(true);
                          }}
                          className="rounded-xl bg-[#4A0E2E] px-4 py-2 text-white transition-all duration-300 hover:scale-105"
                        >
                          + Section
                        </button>
                      </div>

                      {/* Sections list — its own block, wraps instead of overflowing */}
                      <div className="mt-4">
                        {v.sections && v.sections.length > 0 ? (
                          <div className="flex flex-wrap gap-3">
                            {v.sections.map((section: any) => (
                              <div
                                key={section._id}
                                className="flex min-w-[220px] flex-1 items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white px-4 py-3"
                              >
                                <div>
                                  <p className="font-medium text-[#4A0E2E]">
                                    {section.title}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    Order: {section.order}
                                  </p>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => editSection(standard, v, section)}
                                        className="rounded-lg bg-blue-100 px-3 py-2 text-blue-700 transition-all hover:scale-105"
                                    >
                                        ✏ Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                        deleteSection(
                                            standard,
                                            v,
                                            section._id
                                        )
                                        }
                                        className="rounded-lg bg-red-100 px-3 py-2 text-red-700 transition-all hover:scale-105"
                                    >
                                        🗑 Delete
                                    </button>
                                    </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-400">No sections yet.</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="w-full max-w-2xl rounded-[32px] bg-white p-10 shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
            <h2 className="font-heading text-5xl italic text-[#4A0E2E]">
              {isEditing ? "Edit Standard" : "Create Standard"}
            </h2>

            <p className="mt-2 text-gray-500">Add a new sustainability standard.</p>

            <div className="mt-10 space-y-6">
              <input
                placeholder="Standard Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 px-5 py-4 text-[#4A0E2E] placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-[#4A0E2E] focus:ring-2 focus:ring-[#4A0E2E]/20"
              />

              <input
                placeholder="Slug (example: electric-vehicles)"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 px-5 py-4 text-[#4A0E2E] placeholder:text-gray-400 outline-none resize-none transition-all duration-300 focus:border-[#4A0E2E] focus:ring-2 focus:ring-[#4A0E2E]/20"
              />

              <textarea
                rows={4}
                placeholder="Short Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 px-5 py-4 text-[#4A0E2E] placeholder:text-gray-400 outline-none resize-none transition-all duration-300 focus:border-[#4A0E2E] focus:ring-2 focus:ring-[#4A0E2E]/20"
              />

              <label className="flex items-center gap-3 text-[#4A0E2E] font-medium">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                />
                Published
              </label>

              <div className="flex justify-end gap-4 pt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-gray-300 px-6 py-3 text-[#4A0E2E] font-medium transition-all duration-300 hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  onClick={createStandard}
                  className="rounded-xl bg-[#4A0E2E] px-6 py-3 text-white transition-all duration-300 hover:scale-105"
                >
                  {isEditing ? "Update Standard" : "Create Standard"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showVersionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-[700px] max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-10 shadow-2xl">
            <h2 className="font-heading text-5xl italic text-[#4A0E2E]">Create Version</h2>
            <p className="mt-2 text-gray-500">Add a new version.</p>

            <div className="mt-8 space-y-6">
              <input
                placeholder="Version (v1.0.0)"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                className="w-full rounded-2xl border px-5 py-4 text-[#4A0E2E]"
              />

              <input
                type="date"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
                className="w-full rounded-2xl border px-5 py-4 text-[#4A0E2E]"
              />

              <div className="flex justify-end gap-4 pt-4">
                <button
                  onClick={() => setShowVersionModal(false)}
                  className="rounded-xl border px-6 py-3 text-[#4A0E2E]"
                >
                  Cancel
                </button>

                <button
                  onClick={createVersion}
                  className="rounded-xl bg-[#4A0E2E] px-6 py-3 text-white hover:scale-105 transition-all"
                >
                  Create Version
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSectionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-[600px] rounded-3xl bg-white p-10 shadow-2xl">
            <h2 className="font-heading text-5xl italic text-[#4A0E2E]">
              {isEditingSection ? "Edit Section" : "Create Section"}
            </h2>
            <p className="mt-2 text-gray-500">Add a new section to this version.</p>

            <div className="mt-8 space-y-6">
              <input
                placeholder="Section Title"
                value={sectionTitle}
                onChange={(e) => setSectionTitle(e.target.value)}
                className="w-full rounded-2xl border px-5 py-4 text-[#4A0E2E]"
              />

              <div className="max-h-[350px] overflow-y-auto rounded-2xl border">
                <RichTextEditor content={sectionContent} onChange={setSectionContent} />
              </div>

              <input
                type="number"
                min={1}
                placeholder="Order"
                value={sectionOrder}
                onChange={(e) => setSectionOrder(Number(e.target.value))}
                className="w-full rounded-2xl border px-5 py-4 text-[#4A0E2E]"
              />

              <div className="flex justify-end gap-4 pt-4">
                <button
                  onClick={() => {
                    setShowSectionModal(false);
                    setIsEditingSection(false);
                    setEditingSectionId("");
                    setSectionTitle("");
                    setSectionContent("");
                    setSectionOrder(1);
                  }}
                  className="rounded-xl border px-6 py-3 text-[#4A0E2E]"
                >
                  Cancel
                </button>

                <button
                  onClick={saveSection}
                  className="rounded-xl bg-[#4A0E2E] px-6 py-3 text-white hover:scale-105 transition-all"
                >
                  {isEditingSection ? "Update Section" : "Create Section"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    
  );
}