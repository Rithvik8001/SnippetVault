// app/dashboard/page.tsx
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AddPaste from "@/components/AddPaste";
import PasteList from "@/components/PasteList";
import { Paste } from "@/types";
import { Search, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Dashboard() {
  const [pastes, setPastes] = useState<Paste[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const savedPastes = localStorage.getItem("pastes");
    if (savedPastes) {
      setPastes(JSON.parse(savedPastes));
    }
  }, []);

  const savePaste = (paste: Paste) => {
    const newPastes = [{ ...paste, id: Date.now().toString() }, ...pastes];
    setPastes(newPastes);
    localStorage.setItem("pastes", JSON.stringify(newPastes));
    setIsAdding(false);
  };

  const updatePaste = (updatedPaste: Paste) => {
    const newPastes = pastes.map((paste) =>
      paste.id === updatedPaste.id ? updatedPaste : paste
    );
    setPastes(newPastes);
    localStorage.setItem("pastes", JSON.stringify(newPastes));
  };

  const deletePaste = (id: string) => {
    const newPastes = pastes.filter((paste) => paste.id !== id);
    setPastes(newPastes);
    localStorage.setItem("pastes", JSON.stringify(newPastes));
  };

  const filteredPastes = pastes.filter(
    (paste) =>
      paste.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paste.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paste.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-gray-200 z-50">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-xl font-semibold text-gray-900">
              SnippetVault
            </h1>
          </Link>
          <div className="flex items-center space-x-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search pastes..."
                className="pl-10 bg-gray-50 border-none h-9 rounded-lg focus:ring-2 focus:ring-gray-900"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="flex items-center h-9 px-4 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors"
            >
              {isAdding ? (
                <X className="h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto px-6 pt-24 pb-12">
        <motion.div
          initial={false}
          animate={{ height: isAdding ? "auto" : 0 }}
          className="overflow-hidden"
        >
          {isAdding && <AddPaste onSave={savePaste} />}
        </motion.div>

        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Your Pastes
            </h2>
            <span className="text-sm text-gray-500">
              {filteredPastes.length}{" "}
              {filteredPastes.length === 1 ? "paste" : "pastes"}
            </span>
          </div>
          <PasteList
            pastes={filteredPastes}
            onUpdate={updatePaste}
            onDelete={deletePaste}
          />
        </div>
      </main>
    </div>
  );
}
