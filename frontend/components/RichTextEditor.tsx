"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

const TOOLBAR_BUTTON_CLASS =
  "px-3 py-2 rounded-lg bg-gray-100 text-[#4A0E2E] font-semibold hover:bg-[#4A0E2E] hover:text-white transition";

function getToolbarActions(editor: Editor) {
  return [
    {
      label: "B",
      onClick: () => editor.chain().focus().toggleBold().run(),
    },
    {
      label: "I",
      onClick: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      label: "H1",
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      label: "H2",
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      label: "• List",
      onClick: () => editor.chain().focus().toggleBulletList().run(),
    },
  ];
}

export default function RichTextEditor({
  content,
  onChange,
}: {
  content: string;
  onChange: (value: string) => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  return (
    <div className="rounded-2xl border border-gray-300">
      <div className="flex gap-2 border-b p-3">
        {getToolbarActions(editor).map((action) => (
          <button
            key={action.label}
            type="button"
            onClick={action.onClick}
            className={TOOLBAR_BUTTON_CLASS}
          >
            {action.label}
          </button>
        ))}
      </div>

      <div className="min-h-[250px] p-5 text-[#4A0E2E] bg-white prose max-w-none">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}