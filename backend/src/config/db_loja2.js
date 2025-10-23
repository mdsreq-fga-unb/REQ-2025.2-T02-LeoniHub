import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_LOJA2_URL;
const supabaseKey = process.env.SUPABASE_LOJA2_ANON_KEY;

// Temporário: criar cliente apenas se as credenciais estiverem configuradas
let supabaseLoja2 = null;

if (supabaseUrl && supabaseKey && supabaseUrl.startsWith('http')) {
  supabaseLoja2 = createClient(supabaseUrl, supabaseKey);
} else {
  console.warn('⚠️  AVISO: Loja 2 não configurada. Configure SUPABASE_LOJA2_URL e SUPABASE_LOJA2_ANON_KEY no .env');
}

export { supabaseLoja2 };