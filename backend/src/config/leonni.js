import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_LEONNI_URL;
const supabaseKey = process.env.SUPABASE_LEONNI_ANON_KEY;


if (!supabaseUrl || !supabaseKey) {
  throw new Error('Variáveis de ambiente da Leonni não configuradas');
}

export const supabaseLeonni = createClient(supabaseUrl, supabaseKey);