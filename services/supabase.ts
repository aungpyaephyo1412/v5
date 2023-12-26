import { createClient } from '@supabase/supabase-js';
const URL = process.env.SUPABASE_URL;
const ANON_KEY = process.env.SUPABASE_ANON_KEY;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(URL as string, ANON_KEY as string);
export const supabaseAdmin = createClient(URL as string, SERVICE_KEY as string);
export default supabase;
