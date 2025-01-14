// components/PasteList.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Share2, Trash2, Edit2, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Paste } from "@/types";
import { TAGS } from "./AddPaste";

interface PasteListProps {
  pastes: Paste[];
  onUpdate: (paste: Paste) => void;
  onDelete: (id: string) => void;
}

export default function PasteList({
  pastes,
  onUpdate,
  onDelete,
}: PasteListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedPaste, setEditedPaste] = useState<Paste | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleEdit = (paste: Paste) => {
    setEditingId(paste.id!);
    setEditedPaste(paste);
  };

  const handleSave = () => {
    if (editedPaste) {
      onUpdate(editedPaste);
      setEditingId(null);
      setEditedPaste(null);
    }
  };

  const handleCopy = async (content: string, id: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopyFeedback(id);
      setTimeout(() => setCopyFeedback(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShare = async (paste: Paste) => {
    try {
      await navigator.share({
        title: paste.title,
        text: paste.content,
      });
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        console.error("Failed to share:", err);
      }
    }
  };

  const getTagColor = (tagName: string) => {
    const tag = TAGS.find((t) => t.name === tagName);
    return tag?.color || "bg-gray-50 text-gray-600 border-gray-100";
  };

  return (
    <div className="grid gap-4 sm:gap-6">
      <AnimatePresence mode="popLayout">
        {pastes.map((paste) => (
          <motion.div
            key={paste.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setHoveredId(paste.id!)}
            onMouseLeave={() => setHoveredId(null)}
            className="group"
          >
            <div
              className={`
              bg-white rounded-xl sm:rounded-2xl transition-all duration-300
              ${
                hoveredId === paste.id
                  ? "sm:shadow-lg sm:scale-[1.02]"
                  : "shadow-sm"
              }
              border border-gray-100 overflow-hidden
            `}
            >
              {editingId === paste.id ? (
                // Edit Mode
                <div className="p-4 sm:p-8">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <Input
                        value={editedPaste?.title}
                        onChange={(e) =>
                          setEditedPaste({
                            ...editedPaste!,
                            title: e.target.value,
                          })
                        }
                        className="text-base sm:text-lg font-medium border-none bg-gray-50 focus:ring-0 rounded-xl"
                        placeholder="Enter title..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tag
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {TAGS.map((tag) => (
                          <button
                            key={tag.name}
                            type="button"
                            onClick={() =>
                              setEditedPaste({ ...editedPaste!, tag: tag.name })
                            }
                            className={`
                              px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-sm font-medium transition-all
                              ${
                                editedPaste?.tag === tag.name
                                  ? tag.color
                                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                              }
                            `}
                          >
                            {tag.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Content
                      </label>
                      <Textarea
                        value={editedPaste?.content}
                        onChange={(e) =>
                          setEditedPaste({
                            ...editedPaste!,
                            content: e.target.value,
                          })
                        }
                        className="min-h-[150px] sm:min-h-[200px] font-mono text-sm bg-gray-50 border-none focus:ring-0 rounded-xl resize-none"
                        placeholder="Enter your content..."
                      />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // View Mode
                <div className="p-4 sm:p-8">
                  <div className="space-y-4 sm:space-y-0 sm:flex sm:justify-between sm:items-start mb-4">
                    <div className="space-y-2 sm:space-y-3">
                      <h3 className="text-lg sm:text-xl font-medium text-gray-900">
                        {paste.title}
                      </h3>
                      <span
                        className={`inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-sm font-medium ${getTagColor(
                          paste.tag
                        )}`}
                      >
                        {paste.tag}
                      </span>
                    </div>

                    <div
                      className={`
                      flex items-center justify-end space-x-1
                      sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200
                    `}
                    >
                      <button
                        onClick={() => handleCopy(paste.content, paste.id!)}
                        className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-all relative"
                        aria-label="Copy content"
                      >
                        <Copy className="h-4 sm:h-5 w-4 sm:w-5" />
                        {copyFeedback === paste.id && (
                          <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-500 whitespace-nowrap">
                            Copied!
                          </span>
                        )}
                      </button>
                      <button
                        onClick={() => handleShare(paste)}
                        className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-all"
                        aria-label="Share paste"
                      >
                        <Share2 className="h-4 sm:h-5 w-4 sm:w-5" />
                      </button>
                      <button
                        onClick={() => handleEdit(paste)}
                        className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-all"
                        aria-label="Edit paste"
                      >
                        <Edit2 className="h-4 sm:h-5 w-4 sm:w-5" />
                      </button>
                      <button
                        onClick={() => onDelete(paste.id!)}
                        className="p-2 text-gray-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all"
                        aria-label="Delete paste"
                      >
                        <Trash2 className="h-4 sm:h-5 w-4 sm:w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="relative">
                    <pre
                      className={`
                      text-sm font-mono text-gray-600 whitespace-pre-wrap break-words leading-relaxed
                      ${
                        paste.content.length > 300
                          ? "max-h-[300px] sm:max-h-[400px] overflow-y-auto"
                          : ""
                      }
                    `}
                    >
                      {paste.content}
                    </pre>
                    {paste.content.length > 300 && (
                      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {pastes.length === 0 && (
        <div className="text-center py-12 sm:py-20">
          <p className="text-base sm:text-lg text-gray-400">
            No pastes yet. Create your first paste to get started.
          </p>
        </div>
      )}
    </div>
  );
}
