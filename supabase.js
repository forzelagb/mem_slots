const SUPABASE_URL = "https://kmaqaiwpcwdouqjbywkb.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_KI675YDMhEM5DAPOcMP66g_n9SXIxvd";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);