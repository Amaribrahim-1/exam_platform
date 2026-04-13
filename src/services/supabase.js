import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://zejqsyzcgpjkcrecrujf.supabase.co";
const supabaseKey = "sb_publishable_F2TQ78-LcdqFRLW07VGGhw_bPCRYKPM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
