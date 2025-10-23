import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_CLOSETCHIC_URL;
const supabaseKey = process.env.SUPABASE_CLOSETCHIC_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Variáveis de ambiente da ClosetChic não configuradas');
}

export const supabaseClosetChic = createClient(supabaseUrl, supabaseKey);