import { supabaseLoja1 } from './db_loja1.js';
import { supabaseLoja2 } from './db_loja2.js';

export const getSupabaseClient = (lojaId) => {
  switch (lojaId) {
    case 'loja1':
    case '1':
      if (!supabaseLoja1) throw new Error('Loja 1 não configurada');
      return supabaseLoja1;
    case 'loja2':
    case '2':
      if (!supabaseLoja2) throw new Error('Loja 2 não configurada. Configure SUPABASE_LOJA2_URL e SUPABASE_LOJA2_ANON_KEY no .env');
      return supabaseLoja2;
    default:
      throw new Error(`Loja inválida: ${lojaId}. Use: loja1 ou loja2`);
  }
};

export { supabaseLoja1, supabaseLoja2 };