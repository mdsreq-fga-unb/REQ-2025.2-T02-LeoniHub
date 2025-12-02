import { createClient } from '@supabase/supabase-js';


// SELECIONA BANCO DO SUPABASE
const supabaseUrl = process.env.SUPABASE_LEONNI_URL;
const supabaseKey = process.env.SUPABASE_LEONNI_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Variáveis de ambiente da Leonni não configuradas');
}

export const supabaseLeonni = createClient(supabaseUrl, supabaseKey);

export const getSupabaseClient = () => {
  if (!supabaseLeonni) throw new Error('Leonni não configurada. Configure SUPABASE_LEONNI_URL e SUPABASE_LEONNI_ANON_KEY no .env');
  return supabaseLeonni;
}

// ===================================================================

// SCHEMA DO DB
const serviceKey = process.env.SUPABASE_LEONNI_SERVICE_KEY; 

if (!supabaseUrl || !serviceKey) {
  throw new Error('Variáveis de ambiente do Schema/Service Key não configuradas');
}
export const supabaseSchema = createClient(supabaseUrl, serviceKey, {
  db: {
    schema: 'Leoni-Hub'
  }
});
