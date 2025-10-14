/**
 * Markilia Services API
 * GET /api/services - Listet Services (optional gefiltert nach Salon)
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
 * GET - Listet Services
 * Query Params:
 * - salon_id: Filter nach Salon
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const salonId = searchParams.get('salon_id');

    let query = supabase
      .from('services')
      .select(`
        *,
        salons:salon_id (name, slug)
      `)
      .eq('is_active', true)
      .order('name', { ascending: true });

    if (salonId) {
      query = query.eq('salon_id', salonId);
    }

    const { data: services, error } = await query;

    if (error) {
      console.error('Supabase Error:', error);
      return errorResponse('Fehler beim Abrufen der Services', 500);
    }

    return new Response(
      JSON.stringify({ success: true, data: services }),
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

