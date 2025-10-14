# 🏛 Markilia Platform

**Die moderne Multi-Salon Booking Platform**

Markilia ist die zentrale Plattform für Salon-Management, Buchungen und Partner-Verwaltung. Das System ermöglicht es mehreren Salons (wie Tabea Salon), ihre Buchungen über eine zentrale API zu verwalten.

---

## 🚀 Features

- ✅ **Multi-Salon-System** - Verwaltung mehrerer Partner-Salons
- ✅ **Smart Booking API** - RESTful API für Buchungen
- ✅ **Supabase Backend** - Skalierbare PostgreSQL-Datenbank
- ✅ **CORS Support** - Externe Aufrufe von Partner-Websites
- ✅ **Row Level Security** - Sichere Datenbankzugriffe
- 🔜 **Payment Integration** - Stripe & Crypto-Payments
- 🔜 **Admin Dashboard** - Verwaltung von Buchungen und Partnern

---

## 📦 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: TailwindCSS 4
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel
- **Language**: JavaScript/React

---

## 🛠 Setup & Installation

### 1. Repository klonen (falls noch nicht geschehen)

\`\`\`bash
git clone <your-repo-url>
cd markilia
\`\`\`

### 2. Dependencies installieren

\`\`\`bash
npm install
\`\`\`

### 3. Environment Variables einrichten

Kopiere `.env.example` zu `.env.local`:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Fülle die Werte in `.env.local`:

\`\`\`bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=Markilia
\`\`\`

### 4. Supabase Datenbank einrichten

1. Gehe zu [Supabase](https://supabase.com) und erstelle ein neues Projekt
2. Öffne den SQL Editor in Supabase
3. Kopiere den SQL-Code aus `src/lib/db-schema.js` (SETUP_SQL)
4. Führe den SQL-Code aus, um die Tabellen zu erstellen

### 5. (Optional) Test-Daten einfügen

Füge einen Test-Salon ein:

\`\`\`sql
INSERT INTO salons (name, slug, email, phone, address, description, is_active)
VALUES (
  'Tabea Salon',
  'tabea-salon',
  'info@tabea-salon.de',
  '+49 123 456789',
  'Musterstraße 123, 12345 Berlin',
  'Premium Friseur- und Beauty-Salon',
  true
);

-- Notiere die generierte ID für Tabea-Salon
\`\`\`

### 6. Development Server starten

\`\`\`bash
npm run dev
\`\`\`

Die App läuft jetzt auf **http://localhost:3001**

---

## 📡 API Endpoints

### Bookings

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/bookings` | Erstellt eine neue Buchung |
| `GET` | `/api/bookings` | Listet alle Buchungen (mit Filtern) |
| `GET` | `/api/bookings/:id` | Holt eine einzelne Buchung |
| `PUT` | `/api/bookings/:id` | Updated eine Buchung |
| `DELETE` | `/api/bookings/:id` | Storniert eine Buchung |

**Beispiel: Buchung erstellen**

\`\`\`bash
curl -X POST http://localhost:3001/api/bookings \\
  -H "Content-Type: application/json" \\
  -d '{
    "salon_id": "your-salon-id",
    "customer_name": "Max Mustermann",
    "customer_email": "max@example.com",
    "customer_phone": "+49 123 456789",
    "appointment_time": "2025-10-15T14:30:00",
    "duration_minutes": 60,
    "notes": "Bitte Fensterplatz"
  }'
\`\`\`

### Salons

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/salons` | Listet alle aktiven Salons |
| `GET` | `/api/salons?slug=tabea-salon` | Holt Salon per Slug |

### Services

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/services` | Listet alle Services |
| `GET` | `/api/services?salon_id=xxx` | Listet Services für einen Salon |

---

## 🗂 Projektstruktur

\`\`\`
markilia/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── api/             # API Routes
│   │   │   ├── bookings/    # Buchungs-API
│   │   │   ├── salons/      # Salon-API
│   │   │   └── services/    # Services-API
│   │   ├── page.js          # Startseite
│   │   └── layout.js        # Root Layout
│   ├── lib/                 # Utility-Funktionen
│   │   ├── supabase.js      # Supabase Client
│   │   ├── db-schema.js     # Datenbank-Schema + SQL
│   │   ├── validations.js   # Input-Validierungen
│   │   └── utils.js         # Helper-Funktionen
│   └── components/          # React-Komponenten (coming soon)
├── .env.local               # Environment-Variablen (lokal)
├── .env.example             # Beispiel für Env-Vars
└── package.json
\`\`\`

---

## 🔗 Integration mit Partner-Salons

Partner-Salons (wie **Tabea-Salon**) können die Markilia-API nutzen:

1. **Salon-ID notieren** aus der Supabase `salons`-Tabelle
2. **API-URL konfigurieren** in Partner-App (z.B. `http://localhost:3001`)
3. **Bookings erstellen** via `POST /api/bookings`

Siehe auch: [../tabea-salon/README.md](../tabea-salon/README.md)

---

## 🚢 Deployment (Vercel)

### 1. Projekt zu Vercel deployen

\`\`\`bash
npm install -g vercel
vercel
\`\`\`

### 2. Environment Variables in Vercel setzen

Gehe zu: **Vercel Dashboard → Settings → Environment Variables**

Füge alle Variablen aus `.env.local` hinzu.

### 3. Domain konfigurieren

- Production: `markilia.com`
- Staging: `staging.markilia.com`

---

## 🔒 Security

- **Row Level Security (RLS)** ist in Supabase aktiviert
- **API Keys** nie im Frontend-Code hardcoden
- **Service Role Key** nur in Server-Side Code verwenden
- **CORS** ist konfiguriert für Partner-Domains

---

## 🧪 Testing

\`\`\`bash
# API testen
npm run test

# Linting
npm run lint
\`\`\`

---

## 📈 Roadmap

- [x] Basis-Setup mit Next.js + Supabase
- [x] Booking-API (CRUD)
- [x] Salons & Services API
- [ ] Admin Dashboard
- [ ] Authentication (Clerk/Auth.js)
- [ ] Email-Benachrichtigungen
- [ ] Payment Integration (Stripe)
- [ ] Crypto-Payments
- [ ] Analytics Dashboard
- [ ] Mobile App (React Native)

---

## 👥 Partner

- **Tabea Salon** - Erstes Partner-Projekt ([Repo](../tabea-salon))
- Weitere folgen...

---

## 📞 Support

Bei Fragen oder Problemen:
- GitHub Issues
- Email: support@markilia.com

---

**Made with ❤️ by the Markilia Team**
