/**
 * Markilia Salons API
 * GET /api/salons - Listet alle aktiven Salons
 */

import { supabase } from '@/lib/supabase';
import { errorResponse, getCorsHeaders } from '@/lib/utils';

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders()
  });
}

/**
 * GET - Listet alle aktiven Salons
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    let query = supabase
      .from('salons')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (slug) {
      query = query.eq('slug', slug).single();
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase Error:', error);
      return errorResponse('Fehler beim Abrufen der Salons', 500);
    }

    return new Response(
      JSON.stringify({ success: true, data }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...getCorsHeaders()
        }
      }
    );

  } catch (error) {
    console.error('API Error:', error);
    return errorResponse('Interner Server-Fehler', 500);
  }
}

