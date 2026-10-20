import { createClient, SupabaseClient } from "@supabase/supabase-js";

const rawSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
export const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "").trim();

// Sanitasi URL Supabase: hilangkan /rest/v1 atau trailing slash jika ikut ter-paste
export const supabaseUrl = rawSupabaseUrl
  .trim()
  .replace(/\/rest\/v1\/?$/i, "")
  .replace(/\/+$/, "");

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith("http") &&
    !supabaseUrl.includes("your-project-id")
  );
};

export const supabase: SupabaseClient | null = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
