"use client";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Search, Plus, X, LogOut, Layout, User2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import AddPaste from "@/components/AddPaste";
import PasteList from "@/components/PasteList";
import { Paste } from "@/types";
import { toast } from "sonner";
import Pagination from "@/components/Pagination";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { User } from "@supabase/auth-helpers-nextjs";

export default function Dashboard() {
  const [pastes, setPastes] = useState<Paste[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [imageError, setImageError] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pastesPerPage = 10;

  useEffect(() => {
    setMounted(true);
    getUserAndPastes();
    return () => setMounted(false);
  }, []);

  const getUserAndPastes = async () => {
    try {
      setLoading(true);
      setLoadingProfile(true);

      // Get user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      setUser(user);
      setLoadingProfile(false);

      if (user) {
        // Get pastes
        const { data: pastes, error: pastesError } = await supabase
          .from("pastes")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (pastesError) throw pastesError;

        setPastes(pastes || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setLoadingProfile(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push("/sign-in");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const filteredPastes = pastes.filter(
    (paste) =>
      paste.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paste.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paste.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const indexOfLastPaste = currentPage * pastesPerPage;
  const indexOfFirstPaste = indexOfLastPaste - pastesPerPage;
  const currentPastes = filteredPastes.slice(
    indexOfFirstPaste,
    indexOfLastPaste
  );
  const totalPages = Math.ceil(filteredPastes.length / pastesPerPage);

  const savePaste = async (paste: Paste) => {
    try {
      const newPaste = {
        title: paste.title,
        content: paste.content,
        tag: paste.tag,
        content_type: paste.contentType || "text",
        language: paste.language || null,
        user_id: user?.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("pastes")
        .insert([newPaste])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setPastes((prev) => [data, ...prev]);
        setIsAdding(false);
        toast.success("Paste created successfully");
      }
    } catch (error) {
      toast.error("Failed to create paste");
      console.error("Error:", error);
    }
  };

  const updatePaste = async (updatedPaste: Paste) => {
    try {
      const { error } = await supabase
        .from("pastes")
        .update({
          ...updatedPaste,
          updated_at: new Date().toISOString(),
        })
        .eq("id", updatedPaste.id)
        .eq("user_id", user?.id);

      if (error) throw error;

      setPastes((prev) =>
        prev.map((paste) =>
          paste.id === updatedPaste.id ? updatedPaste : paste
        )
      );
    } catch (error) {
      console.error("Error updating paste:", error);
    }
  };

  const deletePaste = async (id: string) => {
    try {
      const { error } = await supabase
        .from("pastes")
        .delete()
        .eq("id", id)
        .eq("user_id", user?.id);

      if (error) throw error;

      setPastes((prev) => prev.filter((paste) => paste.id !== id));
    } catch (error) {
      console.error("Error deleting paste:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbfbfb] flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbfbfb]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-gray-200 z-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
              SnippetVault
            </h1>
          </Link>
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block w-64">
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
              className="flex items-center h-9 px-3 sm:px-4 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors"
            >
              {isAdding ? (
                <X className="h-4 w-4" />
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline ml-2">New Paste</span>
                </>
              )}
            </button>

            {loadingProfile ? (
              <div className="flex items-center space-x-3 py-2 px-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
                <div className="hidden sm:block">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-1" />
                  <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    {user?.user_metadata?.avatar_url ? (
                      <Image
                        src={user.user_metadata.avatar_url}
                        alt="Profile"
                        width={32}
                        height={32}
                        className="rounded-full"
                        onError={(e) => {
                          // Fallback to initials if image fails to load
                          e.currentTarget.style.display = "none";
                          setImageError(true);
                        }}
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-medium">
                        {(user?.email?.[0] || "?").toUpperCase()}
                      </div>
                    )}
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.user_metadata?.full_name ||
                          user?.email?.split("@")[0]}
                      </p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm text-gray-500">
                    Signed in as
                    <br />
                    <span className="font-medium text-gray-900">
                      {user?.email}
                    </span>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      <Layout className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings/profile" className="cursor-pointer">
                      <User2 className="h-4 w-4 mr-2" />
                      Profile Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="text-red-600 focus:text-red-600 cursor-pointer"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
        {/* Mobile Search */}
        <div className="sm:hidden px-4 py-2 border-t border-gray-200 bg-white">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search pastes..."
              className="pl-10 bg-gray-50 border-none h-9 rounded-lg focus:ring-2 focus:ring-gray-900 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-28 sm:pt-24 pb-12">
        <motion.div
          initial={false}
          animate={{ height: isAdding ? "auto" : 0 }}
          className="overflow-hidden"
        >
          {isAdding && <AddPaste onSave={savePaste} />}
        </motion.div>

        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Your Pastes
            </h2>
            <span className="text-sm text-gray-500">
              {filteredPastes.length}{" "}
              {filteredPastes.length === 1 ? "paste" : "pastes"}
            </span>
          </div>
          <PasteList
            pastes={currentPastes}
            onUpdate={updatePaste}
            onDelete={deletePaste}
          />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </main>
    </div>
  );
}
