import { supabaseClosetChic } from './closetChic.js';
import { supabaseLeonni } from './leonni.js';

export const getSupabaseClient = (lojaId) => {
  switch (lojaId) {
    case 'ClosetChic':
    case '1':
      if (!supabaseClosetChic) throw new Error('ClosetChic não configurada');
      return supabaseClosetChic;
    case 'Leonni':
    case '2':
      if (!supabaseLeonni) throw new Error('Leonni não configurada. Configure SUPABASE_LEONNI_URL e SUPABASE_LEONNI_ANON_KEY no .env');
      return supabaseLeonni;
    default:
      throw new Error(`Loja inválida: ${lojaId}. Use: ClosetChic ou Leonni`);
  }
};

export { supabaseClosetChic, supabaseLeonni };