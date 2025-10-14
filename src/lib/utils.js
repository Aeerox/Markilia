/**
 * Utility-Funktionen für Markilia
 */

/**
 * Formatiert einen Preis
 */
export function formatPrice(price, currency = 'EUR') {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency
  }).format(price);
}

/**
 * Formatiert ein Datum/Zeit
 */
export function formatDateTime(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('de-DE', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date);
}

/**
 * Formatiert eine Dauer (Minuten -> "1h 30min")
 */
export function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) return `${mins} min`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}min`;
}

/**
 * Generiert eine eindeutige ID (fallback wenn UUID nicht verfügbar)
 */
export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Error Response Helper
 */
export function errorResponse(message, status = 400) {
  return Response.json(
    { success: false, error: message },
    { status }
  );
}

/**
 * Success Response Helper
 */
export function successResponse(data, status = 200) {
  return Response.json(
    { success: true, data },
    { status }
  );
}

/**
 * Prüft ob wir im Production-Mode sind
 */
export function isProduction() {
  return process.env.NODE_ENV === 'production';
}

/**
 * CORS Headers für API Routes
 */
export function getCorsHeaders(origin = '*') {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

