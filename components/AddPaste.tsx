"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Paste } from "@/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface AddPasteProps {
  onSave: (paste: Paste) => void;
}

export const TAGS = [
  { name: "Code", color: "bg-blue-50 text-blue-600 border-blue-100" },
  { name: "Note", color: "bg-green-50 text-green-600 border-green-100" },
  { name: "Idea", color: "bg-purple-50 text-purple-600 border-purple-100" },
  { name: "Todo", color: "bg-amber-50 text-amber-600 border-amber-100" },
  { name: "Important", color: "bg-red-50 text-red-600 border-red-100" },
  {
    name: "Reference",
    color: "bg-indigo-50 text-indigo-600 border-indigo-100",
  },

  {
    name: "Other",
    color: "bg-cyan-50 text-gray-600 border-gray-100 border",
  },
] as const;

export default function AddPaste({ onSave }: AddPasteProps) {
  const [paste, setPaste] = useState<Paste>({
    title: "",
    content: "",
    tag: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paste.title || !paste.content || !paste.tag) return;
    onSave({
      ...paste,
      createdAt: Date.now(),
    });
    setPaste({ title: "", content: "", tag: "" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-8"
    >
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <Input
            placeholder="Enter a title..."
            value={paste.title}
            onChange={(e) => setPaste({ ...paste, title: e.target.value })}
            className="w-full bg-gray-50 border-none focus:ring-2 focus:ring-gray-900"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Tag</label>
          <div className="flex flex-wrap gap-2">
            {TAGS.map((tag) => (
              <button
                key={tag.name}
                type="button"
                onClick={() => setPaste({ ...paste, tag: tag.name })}
                className={`px-4 py-2 rounded-lg border transition-all ${
                  paste.tag === tag.name
                    ? `${tag.color} border-current`
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300"
                }`}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <Textarea
            placeholder="Enter your content..."
            value={paste.content}
            onChange={(e) => setPaste({ ...paste, content: e.target.value })}
            className="min-h-[200px] bg-gray-50 border-none focus:ring-2 focus:ring-gray-900"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!paste.title || !paste.content || !paste.tag}
            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Paste
          </button>
        </div>
      </form>
    </motion.div>
  );
}
