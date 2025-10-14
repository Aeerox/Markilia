/**
 * Markilia Single Booking API
 * GET /api/bookings/[id] - Holt eine einzelne Buchung
 * PUT /api/bookings/[id] - Updated eine Buchung (z.B. Status ändern)
 * DELETE /api/bookings/[id] - Storniert eine Buchung
 */

import { supabase } from '@/lib/supabase';
import { errorResponse, successResponse, getCorsHeaders } from '@/lib/utils';

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders()
  });
}

/**
 * GET - Einzelne Buchung abrufen
 */
export async function GET(request, { params }) {
  try {
    const { id } = params;

    const { data: booking, error } = await supabase
      .from('bookings')
      .select(`
        *,
        salons:salon_id (name, slug, email, phone),
        services:service_id (name, price, duration_minutes)
      `)
      .eq('id', id)
      .single();

    if (error || !booking) {
      return errorResponse('Buchung nicht gefunden', 404);
    }

    return new Response(
      JSON.stringify({ success: true, data: booking }),
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

/**
 * PUT - Buchung aktualisieren (z.B. Status ändern)
 */
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const updates = await request.json();

    // Nur bestimmte Felder erlauben
    const allowedFields = ['status', 'notes', 'appointment_time'];
    const cleanUpdates = {};

    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        cleanUpdates[field] = updates[field];
      }
    }

    if (Object.keys(cleanUpdates).length === 0) {
      return errorResponse('Keine gültigen Update-Felder gefunden', 400);
    }

    const { data: booking, error } = await supabase
      .from('bookings')
      .update(cleanUpdates)
      .eq('id', id)
      .select()
      .single();

    if (error || !booking) {
      return errorResponse('Buchung konnte nicht aktualisiert werden', 400);
    }

    return new Response(
      JSON.stringify({ success: true, data: booking }),
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

/**
 * DELETE - Buchung stornieren (Soft Delete = Status auf 'cancelled')
 */
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const { data: booking, error } = await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', id)
      .select()
      .single();

    if (error || !booking) {
      return errorResponse('Buchung konnte nicht storniert werden', 400);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Buchung wurde storniert',
        data: booking 
      }),
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

