import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_LOJA1_URL;
const supabaseKey = process.env.SUPABASE_LOJA1_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Variáveis de ambiente da Loja 1 não configuradas');
}

export const supabaseLoja1 = createClient(supabaseUrl, supabaseKey);