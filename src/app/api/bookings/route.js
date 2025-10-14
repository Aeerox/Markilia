/**
 * Markilia Bookings API
 * POST /api/bookings - Erstellt eine neue Buchung
 * GET /api/bookings - Listet alle Buchungen (optional: mit Salon-Filter)
 */

import { supabase } from '@/lib/supabase';
import { validateBooking, sanitizeInput } from '@/lib/validations';
import { errorResponse, successResponse, getCorsHeaders } from '@/lib/utils';

// CORS für externe Aufrufe (z.B. von Tabea-Salon)
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders()
  });
}

/**
 * POST - Erstellt eine neue Buchung
 */
export async function POST(request) {
  try {
    const data = await request.json();

    // Input bereinigen
    const cleanData = {
      salon_id: data.salon_id,
      service_id: data.service_id || null,
      customer_name: sanitizeInput(data.customer_name),
      customer_email: sanitizeInput(data.customer_email),
      customer_phone: sanitizeInput(data.customer_phone || ''),
      appointment_time: data.appointment_time,
      duration_minutes: parseInt(data.duration_minutes) || 60,
      status: 'pending',
      notes: sanitizeInput(data.notes || '')
    };

    // Validierung
    const validation = validateBooking(cleanData);
    if (!validation.isValid) {
      return errorResponse(validation.errors.join(', '), 400);
    }

    // Prüfen ob Salon existiert
    const { data: salon, error: salonError } = await supabase
      .from('salons')
      .select('id, name, is_active')
      .eq('id', cleanData.salon_id)
      .single();

    if (salonError || !salon) {
      return errorResponse('Salon nicht gefunden', 404);
    }

    if (!salon.is_active) {
      return errorResponse('Dieser Salon ist aktuell nicht verfügbar', 403);
    }

    // Prüfen ob Zeitslot noch verfügbar ist (optional)
    const { data: existingBookings } = await supabase
      .from('bookings')
      .select('id')
      .eq('salon_id', cleanData.salon_id)
      .eq('appointment_time', cleanData.appointment_time)
      .eq('status', 'confirmed');

    if (existingBookings && existingBookings.length > 0) {
      return errorResponse('Dieser Zeitslot ist bereits gebucht', 409);
    }

    // Buchung erstellen
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert([cleanData])
      .select()
      .single();

    if (bookingError) {
      console.error('Supabase Error:', bookingError);
      return errorResponse('Fehler beim Erstellen der Buchung', 500);
    }

    // Success Response mit CORS Headers
    return new Response(
      JSON.stringify({ success: true, data: booking }),
      {
        status: 201,
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
 * GET - Listet Buchungen
 * Query Params:
 * - salon_id: Filter nach Salon
 * - status: Filter nach Status
 * - from_date: Ab Datum
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const salonId = searchParams.get('salon_id');
    const status = searchParams.get('status');
    const fromDate = searchParams.get('from_date');

    let query = supabase
      .from('bookings')
      .select(`
        *,
        salons:salon_id (name, slug),
        services:service_id (name, price, duration_minutes)
      `)
      .order('appointment_time', { ascending: true });

    // Filter anwenden
    if (salonId) {
      query = query.eq('salon_id', salonId);
    }

    if (status) {
      query = query.eq('status', status);
    }

    if (fromDate) {
      query = query.gte('appointment_time', fromDate);
    }

    const { data: bookings, error } = await query;

    if (error) {
      console.error('Supabase Error:', error);
      return errorResponse('Fehler beim Abrufen der Buchungen', 500);
    }

    return new Response(
      JSON.stringify({ success: true, data: bookings }),
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

