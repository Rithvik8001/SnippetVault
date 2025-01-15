// app/settings/profile/page.tsx
"use client";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ProfileSettings() {
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [fullName, setFullName] = useState("");
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
        setFullName(user?.user_metadata?.full_name || "");
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  const updateProfile = async () => {
    try {
      setUpdating(true);
      const { error } = await supabase.auth.updateUser({
        data: { full_name: fullName },
      });

      if (error) throw error;
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
      >
        <h1 className="text-2xl font-semibold mb-6">Profile Settings</h1>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <Input
              type="email"
              value={user?.email}
              disabled
              className="bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <Input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="bg-gray-50 border-none focus:ring-2 focus:ring-gray-900"
            />
          </div>

          <Button
            onClick={updateProfile}
            disabled={updating}
            className="w-full bg-gray-900 text-white hover:bg-gray-800"
          >
            {updating ? "Updating..." : "Update Profile"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
