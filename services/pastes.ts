// services/pastes.ts
import { createClient } from "@/lib/db";
import { Paste } from "@/types";

export const pastesService = {
  async getPastes(userId: string) {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("pastes")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async createPaste(paste: Omit<Paste, "id">) {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("pastes")
      .insert([paste])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updatePaste(id: string, updates: Partial<Paste>) {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("pastes")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deletePaste(id: string) {
    const supabase = createClient();

    const { error } = await supabase.from("pastes").delete().eq("id", id);

    if (error) throw error;
    return true;
  },
};
