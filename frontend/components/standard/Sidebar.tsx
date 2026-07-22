export default function Sidebar({
  standard,
  selectedVersion,
  setSelectedVersion,
  activeSection,
  searchTerm,
  setSearchTerm,
}: any) {
  return (
    <aside className="col-span-3 sticky top-28 self-start">

      <input
  type="text"
  placeholder="Search"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="w-full rounded-xl border border-gray-700 bg-transparent px-4 py-3 outline-none"
/>

      <div className="mt-8">

        <h3 className="text-sm text-gray-400 mb-3">
          Version
        </h3>

        <select
  className="w-full rounded-xl border border-gray-700 bg-transparent px-4 py-3 outline-none"
  value={selectedVersion?._id || ""}
  onChange={(e) => {
    const version = standard.versions.find(
      (v: any) => v._id === e.target.value
    );

    setSelectedVersion(version);
  }}
>
  {standard?.versions?.map((version: any) => (
    <option key={version._id} value={version._id}>
      {version.version}
    </option>
  ))}
</select>

    <p className="text-sm text-gray-400 mt-3">
  Release Date:{" "}
  {selectedVersion
    ? new Date(selectedVersion.releaseDate).toLocaleDateString()
    : "-"}
</p>

      </div>

      <div className="mt-10 max-h-[60vh] overflow-y-auto pr-2">

        <ul className="space-y-4 text-sm">
  {selectedVersion?.sections
    ?.sort((a: any, b: any) => a.order - b.order)
    .map((section: any) => (
      <li key={section._id}>
        <a
            href={`#${section.title
                .toLowerCase()
                .replace(/\./g, "")
                .replace(/\s+/g, "-")}`}
            className={`block transition-all duration-200 ${
                activeSection === section.title
                ? "text-red-500 font-semibold"
                : "text-gray-400 hover:text-red-500"
            }`}
            >
            {section.title}
            </a>
      </li>
    ))}
</ul>

      </div>

    </aside>
  );
}