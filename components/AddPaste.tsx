// components/AddPaste.tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import MDEditor from "@uiw/react-md-editor";
import {
  Code,
  FileText,
  Layout,
  StickyNote,
  Link as LinkIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CodeEditor from "@/components/CodeEditor";
import LivePreview from "@/components/LivePreview";
import { Paste, ContentType, CONTENT_TYPES } from "@/types";
import { detectLanguage } from "@/utils/highlight";

interface AddPasteProps {
  onSave: (paste: Paste) => void;
}

export const TAGS = [
  { name: "Code", color: "bg-blue-50 text-blue-600 border-blue-100" },
  { name: "Markdown", color: "bg-green-50 text-green-600 border-green-100" },

  { name: "Note", color: "bg-red-50 text-red-600 border-red-100" },
  {
    name: "Link",
    color: "bg-indigo-50 text-indigo-600 border-indigo-100",
  },
] as const;

const CONTENT_TYPE_ICONS = {
  code: Code,
  markdown: FileText,
  html: Layout,
  note: StickyNote,
  link: LinkIcon,
} as const;

export default function AddPaste({ onSave }: AddPasteProps) {
  const [paste, setPaste] = useState<Paste>({
    title: "",
    content: "",
    tag: "",
    contentType: "code",
    language: "plaintext",
  });

  const handleContentChange = (value: string) => {
    if (paste.contentType === "code") {
      const detectedLang = detectLanguage(value);
      setPaste((prev) => ({
        ...prev,
        content: value,
        language: detectedLang,
      }));
    } else {
      setPaste((prev) => ({ ...prev, content: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paste.title || !paste.content || !paste.tag) return;

    // For link type, validate URL
    if (paste.contentType === "link" && !isValidUrl(paste.content)) {
      alert("Please enter a valid URL");
      return;
    }

    onSave({
      ...paste,
      createdAt: Date.now(),
    });

    setPaste({
      title: "",
      content: "",
      tag: "",
      contentType: "code",
      language: "plaintext",
    });
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const renderContentEditor = () => {
    const contentType = paste.contentType as ContentType;
    const placeholder = CONTENT_TYPES.find(
      (t) => t.id === contentType
    )?.placeholder;

    switch (contentType) {
      case "markdown":
        return (
          <MDEditor
            value={paste.content}
            onChange={(value) => handleContentChange(value || "")}
            preview="live"
            className="w-full h-[300px] border-none"
            hideToolbar={false}
            textareaProps={{
              placeholder,
            }}
          />
        );

      case "html":
        return (
          <div className="grid md:grid-cols-2 gap-4 h-[300px]">
            <CodeEditor
              value={paste.content}
              onChange={handleContentChange}
              language="html"
              placeholder={placeholder}
            />
            <LivePreview content={paste.content} />
          </div>
        );

      case "note":
        return (
          <Textarea
            value={paste.content}
            onChange={(e) => handleContentChange(e.target.value)}
            placeholder={placeholder}
            className="min-h-[300px] bg-gray-50 border-none focus:ring-2 focus:ring-gray-900 resize-none"
          />
        );

      case "link":
        return (
          <div className="space-y-4">
            <Input
              type="url"
              value={paste.content}
              onChange={(e) => handleContentChange(e.target.value)}
              placeholder={placeholder}
              className="bg-gray-50 border-none focus:ring-2 focus:ring-gray-900"
            />
            {paste.content && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">
                  {isValidUrl(paste.content)
                    ? "✓ Valid URL"
                    : "Enter a valid URL (e.g., https://example.com)"}
                </p>
              </div>
            )}
          </div>
        );

      default: // code
        return (
          <CodeEditor
            value={paste.content}
            onChange={handleContentChange}
            language={paste.language}
            placeholder={placeholder}
          />
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-200"
    >
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Title Section */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <Input
            placeholder="Enter a title..."
            value={paste.title}
            onChange={(e) =>
              setPaste((prev) => ({ ...prev, title: e.target.value }))
            }
            className="w-full bg-gray-50 border-none focus:ring-2 focus:ring-gray-900"
          />
        </div>

        {/* Content Type Selector */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Content Type
          </label>
          <div className="flex flex-wrap gap-2">
            {CONTENT_TYPES.map((type) => {
              const Icon = CONTENT_TYPE_ICONS[type.id];
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() =>
                    setPaste((prev) => ({
                      ...prev,
                      contentType: type.id,
                      content: "", // Clear content when switching types
                    }))
                  }
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                    ${
                      paste.contentType === type.id
                        ? "bg-gray-900 text-white"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  {type.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Editor Section */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <div className="min-h-[300px] rounded-lg overflow-hidden">
            {renderContentEditor()}
          </div>
        </div>

        {/* Tags Section */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Tag</label>
          <div className="flex flex-wrap gap-2">
            {TAGS.map((tag) => (
              <button
                key={tag.name}
                type="button"
                onClick={() => setPaste((prev) => ({ ...prev, tag: tag.name }))}
                className={`
                  px-4 py-2 rounded-lg border transition-all
                  ${
                    paste.tag === tag.name
                      ? `${tag.color} border-current`
                      : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300"
                  }
                `}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={!paste.title || !paste.content || !paste.tag}
            className="w-full px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800
                     transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Paste
          </button>
        </div>
      </form>
    </motion.div>
  );
}
