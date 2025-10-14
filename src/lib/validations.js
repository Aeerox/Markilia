/**
 * Validierungs-Funktionen für Markilia
 * Wird von API Routes und Client-Code verwendet
 */

/**
 * Validiert eine Email-Adresse
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validiert eine Telefonnummer (international)
 */
export function isValidPhone(phone) {
  if (!phone) return true; // Optional
  const phoneRegex = /^[\d\s\+\-\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 6;
}

/**
 * Validiert ein Buchungs-Objekt
 */
export function validateBooking(data) {
  const errors = [];

  if (!data.salon_id) {
    errors.push('Salon ID ist erforderlich');
  }

  if (!data.customer_name || data.customer_name.trim().length < 2) {
    errors.push('Kundenname muss mindestens 2 Zeichen lang sein');
  }

  if (!data.customer_email || !isValidEmail(data.customer_email)) {
    errors.push('Gültige Email-Adresse ist erforderlich');
  }

  if (data.customer_phone && !isValidPhone(data.customer_phone)) {
    errors.push('Telefonnummer ist ungültig');
  }

  if (!data.appointment_time) {
    errors.push('Terminzeit ist erforderlich');
  } else {
    const appointmentDate = new Date(data.appointment_time);
    const now = new Date();
    
    if (isNaN(appointmentDate.getTime())) {
      errors.push('Ungültiges Datumsformat');
    } else if (appointmentDate < now) {
      errors.push('Termin kann nicht in der Vergangenheit liegen');
    }
  }

  if (data.duration_minutes && (data.duration_minutes < 5 || data.duration_minutes > 480)) {
    errors.push('Dauer muss zwischen 5 und 480 Minuten liegen');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Bereinigt Input-Daten
 */
export function sanitizeInput(str) {
  if (typeof str !== 'string') return str;
  return str.trim().substring(0, 500); // Max 500 Zeichen
}

/**
 * Formatiert einen Salon-Slug
 */
export function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

