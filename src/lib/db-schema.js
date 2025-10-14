/**
 * Markilia Database Schema
 * 
 * Definiert die Struktur der Supabase-Tabellen
 * Diese Struktur muss in Supabase angelegt werden
 */

export const DATABASE_SCHEMA = {
  // 🏛 Salons (Partner wie Tabea Salon)
  salons: {
    id: 'uuid (primary key)',
    name: 'text',
    slug: 'text (unique)', // z.B. 'tabea-salon'
    email: 'text',
    phone: 'text',
    address: 'text',
    description: 'text',
    logo_url: 'text',
    website: 'text',
    is_active: 'boolean',
    created_at: 'timestamp',
    updated_at: 'timestamp'
  },

  // 💇‍♀️ Services (Dienstleistungen pro Salon)
  services: {
    id: 'uuid (primary key)',
    salon_id: 'uuid (foreign key -> salons.id)',
    name: 'text', // z.B. 'Haarschnitt'
    description: 'text',
    duration_minutes: 'integer', // z.B. 60
    price: 'numeric', // z.B. 45.00
    is_active: 'boolean',
    created_at: 'timestamp'
  },

  // 📅 Bookings (Buchungen von Kunden)
  bookings: {
    id: 'uuid (primary key)',
    salon_id: 'uuid (foreign key -> salons.id)',
    service_id: 'uuid (foreign key -> services.id, nullable)',
    customer_name: 'text',
    customer_email: 'text',
    customer_phone: 'text',
    appointment_time: 'timestamp',
    duration_minutes: 'integer',
    status: 'text', // 'pending', 'confirmed', 'cancelled', 'completed'
    notes: 'text',
    created_at: 'timestamp',
    updated_at: 'timestamp'
  },

  // 👥 Customers (Optional: für wiederkehrende Kunden)
  customers: {
    id: 'uuid (primary key)',
    email: 'text (unique)',
    name: 'text',
    phone: 'text',
    created_at: 'timestamp'
  }
};

/**
 * SQL für Supabase Table Creation
 * 
 * Diese SQL-Statements müssen in Supabase SQL Editor ausgeführt werden:
 */

export const SETUP_SQL = `
-- ========================================
-- MARKILIA DATABASE SCHEMA
-- ========================================

-- 1. Salons Table
CREATE TABLE IF NOT EXISTS salons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  email TEXT,
  phone TEXT,
  address TEXT,
  description TEXT,
  logo_url TEXT,
  website TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Services Table
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  salon_id UUID REFERENCES salons(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  duration_minutes INTEGER DEFAULT 60,
  price NUMERIC(10,2),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  salon_id UUID REFERENCES salons(id) ON DELETE CASCADE,
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  appointment_time TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Customers Table (Optional)
CREATE TABLE IF NOT EXISTS customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes für bessere Performance
CREATE INDEX IF NOT EXISTS idx_salons_slug ON salons(slug);
CREATE INDEX IF NOT EXISTS idx_services_salon_id ON services(salon_id);
CREATE INDEX IF NOT EXISTS idx_bookings_salon_id ON bookings(salon_id);
CREATE INDEX IF NOT EXISTS idx_bookings_appointment_time ON bookings(appointment_time);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);

-- Row Level Security (RLS) aktivieren
ALTER TABLE salons ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Public Read Access für Salons & Services
CREATE POLICY "Public can view active salons" ON salons
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active services" ON services
  FOR SELECT USING (is_active = true);

-- Public kann Bookings erstellen
CREATE POLICY "Public can create bookings" ON bookings
  FOR INSERT WITH CHECK (true);

-- Nur authentifizierte User können Bookings lesen
CREATE POLICY "Salon owners can view their bookings" ON bookings
  FOR SELECT USING (true);

-- Updated_at Trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_salons_updated_at BEFORE UPDATE ON salons
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
`;

