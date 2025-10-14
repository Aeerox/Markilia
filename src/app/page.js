'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('Max Mustermann');
  const [userRole, setUserRole] = useState('user'); // 'user' or 'salon_owner'
  const [salonName, setSalonName] = useState('Tabea Salon');
  const [markiliaCoins, setMarkiliaCoins] = useState(1250);
  const [friends, setFriends] = useState(['Lisa', 'Tom', 'Sarah']);

  const sections = [
    {
      id: 'beauty',
      title: 'Für dich',
      description: 'Für dich',
      color: 'from-red-500 to-red-600',
      bgColor: 'from-red-500/20 to-red-600/20',
      borderColor: 'border-red-300/40',
      textColor: 'text-red-100',
      hoverColor: 'hover:border-red-400/60',
      priority: 1 // Business first!
    },
    {
      id: 'focus',
      title: 'FOCUS',
      icon: '💪',
      description: 'Gym, Fitness, Trainer',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-300/40',
      textColor: 'text-blue-100',
      hoverColor: 'hover:border-blue-400/60',
      priority: 2
    },
    {
      id: 'Social',
      title: 'Socials',
      description: 'LGBTQ+, Events, Nightlife',
      color: 'from-pink-500 to-purple-500',
      bgColor: 'from-pink-500/20 to-purple-500/20',
      borderColor: 'border-pink-300/40',
      textColor: 'text-pink-100',
      hoverColor: 'hover:border-pink-400/60',
      priority: 3
    }
  ];

  const renderHomePage = () => (
    <motion.div 
      className="text-center mb-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <motion.h1 
        className="text-8xl font-light mb-8 bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent drop-shadow-lg cursor-pointer"
        whileHover={{ 
          scale: 1.05,
          textShadow: "0 0 30px rgba(239, 68, 68, 0.6)"
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        Markilia
      </motion.h1>
      <motion.p 
        className="text-2xl text-red-100 max-w-4xl mx-auto leading-relaxed mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        whileHover={{ 
          color: 'rgb(254, 202, 202)',
          textShadow: "0 0 15px rgba(239, 68, 68, 0.4)"
        }}
      >
        Deine 3 Lebenswelten in einer Plattform ✨
        <br />
        <span className="text-lg text-red-200/80">
          BEAUTY • FOCUS • PARTY
        </span>
      </motion.p>

      {/* Section Cards - Beauty first! */}
      <motion.div 
        className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
      >
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            className={`bg-gradient-to-br ${section.bgColor} backdrop-blur-sm p-8 rounded-2xl border ${section.borderColor} shadow-2xl cursor-pointer ${section.hoverColor} ${
              section.id === 'beauty' ? 'ring-2 ring-red-400/50' : ''
            }`}
            whileHover={{ 
              scale: 1.05,
              rotateY: 5,
              boxShadow: `0 25px 50px -12px ${
                section.id === 'beauty' ? 'rgba(239, 68, 68, 0.4)' : 
                section.id === 'focus' ? 'rgba(59, 130, 246, 0.4)' : 
                'rgba(236, 72, 153, 0.4)'
              }`
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 20 
            }}
            onClick={() => setActiveSection(section.id)}
          >
            {section.id === 'beauty' && (
              <motion.div 
                className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs px-2 py-1 rounded-full"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💰 BUSINESS
              </motion.div>
            )}
            
            <motion.div 
              className="text-6xl mb-6"
              whileHover={{ 
                scale: 1.2,
                rotate: [0, -10, 10, 0]
              }}
              transition={{ duration: 0.6 }}
            >
              {section.icon}
            </motion.div>
            <motion.h3 
              className={`text-3xl font-light mb-4 ${section.textColor}`}
              whileHover={{ 
                color: section.id === 'beauty' ? 'rgb(254, 202, 202)' : 
                       section.id === 'focus' ? 'rgb(147, 197, 253)' : 
                       'rgb(251, 207, 232)'
              }}
            >
              {section.title}
            </motion.h3>
            <motion.p 
              className={`${section.textColor}/80 leading-relaxed text-lg`}
              whileHover={{ 
                color: section.id === 'beauty' ? 'rgba(254, 202, 202, 0.9)' : 
                       section.id === 'focus' ? 'rgba(147, 197, 253, 0.9)' : 
                       'rgba(251, 207, 232, 0.9)'
              }}
            >
              {section.description}
            </motion.p>
            
            {/* Click indicator */}
            <motion.div 
              className="mt-6 text-sm opacity-60"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              👆 Klicken zum Betreten
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );

  const renderBeautySection = () => {
    const section = sections.find(s => s.id === 'beauty');
    
    // User's own bookings
    const userBookings = [
      { time: '14:00', service: 'Friseur', salon: 'Tabea Salon', status: 'confirmed', price: 45 },
      { time: '16:30', service: 'Nageln', salon: 'Beauty Corner', status: 'pending', price: 35 }
    ];

    // Tabea Salon's bookings (only visible to salon owners)
    const tabeaSalonBookings = [
      { time: '09:00', service: 'Haarschnitt', client: 'Anna M.', price: 45, status: 'confirmed' },
      { time: '10:30', service: 'Färben', client: 'Tom K.', price: 85, status: 'pending' },
      { time: '12:00', service: 'Styling', client: 'Lisa S.', price: 35, status: 'confirmed' },
      { time: '14:00', service: 'Haarschnitt', client: 'Max M.', price: 45, status: 'confirmed' },
      { time: '15:30', service: 'Bart', client: 'Sarah L.', price: 25, status: 'pending' }
    ];

    const tabeaSalonRevenue = tabeaSalonBookings
      .filter(booking => booking.status === 'confirmed')
      .reduce((total, booking) => total + booking.price, 0);

    if (userRole === 'user') {
      return (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back Button */}
          <motion.button
            className="mb-8 flex items-center gap-2 text-red-200 hover:text-red-100 transition-colors"
            onClick={() => setActiveSection('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-2xl">←</span>
            <span>Zurück zur Übersicht</span>
          </motion.button>

          {/* User Dashboard */}
          <div className="text-center mb-12">
            <motion.h1 
              className="text-6xl font-light mb-4 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              👤 Meine Buchungen
            </motion.h1>
            <motion.p 
              className="text-xl text-red-100 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Deine persönlichen Termine und Services
            </motion.p>
          </div>

          {/* User's Bookings */}
          <motion.div 
            className="p-8 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-2xl border border-red-300/40 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-2xl font-light mb-6 text-center text-red-100">
              📅 Meine Termine
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {userBookings.map((booking, index) => (
                <motion.div
                  key={index}
                  className={`p-4 bg-white/10 backdrop-blur-sm rounded-lg border ${
                    booking.status === 'confirmed' ? 'border-green-400/40' : 'border-yellow-400/40'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-red-100">{booking.time}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      booking.status === 'confirmed' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'
                    }`}>
                      {booking.status === 'confirmed' ? '✓' : '⏳'}
                    </span>
                  </div>
                  <div className="text-sm text-red-200">{booking.service}</div>
                  <div className="text-xs text-red-300/80">{booking.salon}</div>
                  <div className="text-sm font-bold text-red-100 mt-1">€{booking.price}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions for Users */}
          <motion.div 
            className="p-8 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-2xl border border-red-300/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <h3 className="text-2xl font-light mb-6 text-center text-red-100">
              🚀 Neue Buchung
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <motion.button
                className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-red-300/40 text-red-100 hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-2xl mb-2">✂️</div>
                <div className="font-medium">Friseur buchen</div>
                <div className="text-sm opacity-80 mt-1">Tabea Salon</div>
              </motion.button>
              
              <motion.button
                className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-red-300/40 text-red-100 hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-2xl mb-2">💅</div>
                <div className="font-medium">Nageln buchen</div>
                <div className="text-sm opacity-80 mt-1">Beauty Corner</div>
              </motion.button>

              <motion.button
                className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-red-300/40 text-red-100 hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-2xl mb-2">🎨</div>
                <div className="font-medium">Tattoo buchen</div>
                <div className="text-sm opacity-80 mt-1">Art Studio</div>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      );
    }

    // Salon Owner Dashboard (Tabea Salon)
    return (
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
      >
        {/* Back Button */}
        <motion.button
          className="mb-8 flex items-center gap-2 text-red-200 hover:text-red-100 transition-colors"
          onClick={() => setActiveSection('home')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-2xl">←</span>
          <span>Zurück zur Übersicht</span>
        </motion.button>

        {/* Salon Owner Header */}
        <div className="text-center mb-12">
          <motion.h1 
            className="text-6xl font-light mb-4 bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            💄 Tabea Salon Dashboard
          </motion.h1>
          <motion.p 
            className="text-xl text-purple-100 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Dein Business-Dashboard mit Buchungen und Revenue
          </motion.p>
        </div>

        {/* Revenue Summary */}
        <motion.div 
          className="p-8 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-2xl border border-purple-300/40 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-2xl font-light mb-6 text-center text-purple-100">
            💰 Heute's Revenue
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-white/10 rounded-xl">
              <div className="text-3xl font-bold text-green-400 mb-2">€{tabeaSalonRevenue}</div>
              <div className="text-purple-200">Bestätigte Einnahmen</div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-xl">
              <div className="text-3xl font-bold text-yellow-400 mb-2">€{tabeaSalonBookings.filter(b => b.status === 'pending').reduce((sum, b) => sum + b.price, 0)}</div>
              <div className="text-purple-200">Ausstehende Einnahmen</div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-xl">
              <div className="text-3xl font-bold text-purple-400 mb-2">{tabeaSalonBookings.length}</div>
              <div className="text-purple-200">Gesamte Buchungen</div>
            </div>
          </div>
        </motion.div>

        {/* Salon's Bookings */}
        <motion.div 
          className="p-8 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-2xl border border-purple-300/40 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-2xl font-light mb-6 text-center text-purple-100">
            📅 Tabea Salon - Heute's Termine
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tabeaSalonBookings.map((booking, index) => (
              <motion.div
                key={index}
                className={`p-4 bg-white/10 backdrop-blur-sm rounded-lg border ${
                  booking.status === 'confirmed' ? 'border-green-400/40' : 'border-yellow-400/40'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-purple-100">{booking.time}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    booking.status === 'confirmed' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'
                  }`}>
                    {booking.status === 'confirmed' ? '✓' : '⏳'}
                  </span>
                </div>
                <div className="text-sm text-purple-200">{booking.service}</div>
                <div className="text-xs text-purple-300/80">{booking.client}</div>
                <div className="text-sm font-bold text-purple-100 mt-1">€{booking.price}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Salon Owner Actions */}
        <motion.div 
          className="p-8 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-2xl border border-purple-300/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <h3 className="text-2xl font-light mb-6 text-center text-purple-100">
            🚀 Business Actions
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <motion.button
              className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-purple-300/40 text-purple-100 hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-2xl mb-2">📊</div>
              <div className="font-medium">Revenue Analytics</div>
              <div className="text-sm opacity-80 mt-1">Detaillierte Auswertung</div>
            </motion.button>
            
            <motion.button
              className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-purple-300/40 text-purple-100 hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-2xl mb-2">📅</div>
              <div className="font-medium">Termin verwalten</div>
              <div className="text-sm opacity-80 mt-1">Buchungen bearbeiten</div>
            </motion.button>

            <motion.button
              className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-purple-300/40 text-purple-100 hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-2xl mb-2">👥</div>
              <div className="font-medium">Kunden verwalten</div>
              <div className="text-sm opacity-80 mt-1">Stammkunden</div>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const renderSectionContent = (sectionId) => {
    if (sectionId === 'beauty') {
      return renderBeautySection();
    }

    const section = sections.find(s => s.id === sectionId);
    
    const sectionContent = {
      focus: {
        title: 'FOCUS Zone 💪',
        subtitle: 'Deine Fitness- und Trainer-Welt',
        features: [
          { icon: '🏋️‍♀️', title: 'Gym & Fitness', desc: 'Trainingspläne, Workouts, Progress Tracking' },
          { icon: '👨‍🏫', title: 'Trainer buchen', desc: 'Personal Trainer, Yoga, Pilates' },
          { icon: '📊', title: 'Progress', desc: 'Ziele verfolgen und erreichen' },
          { icon: '📱', title: 'Apps', desc: 'Fitness-Apps integrieren' }
        ]
      },
      party: {
        title: 'PARTY Zone 🌈',
        subtitle: 'Deine LGBTQ+ und Event-Welt',
        features: [
          { icon: '🎉', title: 'Events', desc: 'Party-Events, LGBTQ+ Treffen, Nightlife' },
          { icon: '👥', title: 'Community', desc: 'Connect mit deiner Community' },
          { icon: '🍸', title: 'Venues', desc: 'Bars, Clubs, Events in deiner Nähe' },
          { icon: '💃', title: 'Social', desc: 'Meet & Greet, Dating, Friends' }
        ]
      }
    };

    const content = sectionContent[sectionId];

    return (
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
      >
        {/* Back Button */}
        <motion.button
          className="mb-8 flex items-center gap-2 text-red-200 hover:text-red-100 transition-colors"
          onClick={() => setActiveSection('home')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-2xl">←</span>
          <span>Zurück zur Übersicht</span>
        </motion.button>

        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h1 
            className={`text-6xl font-light mb-4 bg-gradient-to-r ${section.color} bg-clip-text text-transparent`}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            {content.title}
          </motion.h1>
          <motion.p 
            className={`text-xl ${section.textColor} max-w-2xl mx-auto`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {content.subtitle}
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {content.features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={`bg-gradient-to-br ${section.bgColor} backdrop-blur-sm p-6 rounded-xl border ${section.borderColor} shadow-lg cursor-pointer ${section.hoverColor}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                borderColor: section.id === 'focus' ? 'rgba(59, 130, 246, 0.6)' : 'rgba(236, 72, 153, 0.6)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className={`text-lg font-medium mb-2 ${section.textColor}`}>{feature.title}</h3>
              <p className={`text-sm ${section.textColor}/80`}>{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon */}
        <motion.div 
          className={`text-center p-8 bg-gradient-to-r ${section.bgColor} rounded-2xl border ${section.borderColor}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <h3 className={`text-2xl font-light mb-4 ${section.textColor}`}>
            🚧 In Entwicklung
          </h3>
          <p className={`${section.textColor}/80`}>
            Diese Sektion wird bald verfügbar sein! 
            <br />
            Melde dich für Updates an oder starte mit der Grundkonfiguration.
          </p>
          
          <motion.button
            className={`mt-4 px-6 py-3 bg-gradient-to-r ${section.color} text-white rounded-full font-medium hover:shadow-lg transition-all`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🎯 Jetzt starten
          </motion.button>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen text-white">
      {/* Top Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-red-300/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Login/User */}
            <div className="flex items-center gap-4">
              {!isLoggedIn ? (
                <div className="flex gap-2">
                  <motion.button
                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full text-sm font-medium hover:shadow-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setIsLoggedIn(true);
                      setUserRole('user');
                    }}
                  >
                    🔑 User Login
                  </motion.button>
                  <motion.button
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full text-sm font-medium hover:shadow-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setIsLoggedIn(true);
                      setUserRole('salon_owner');
                    }}
                  >
                    💄 Salon Owner
                  </motion.button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  {userRole === 'salon_owner' && (
                    <motion.div 
                      className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="text-sm">💄</span>
                      <span className="text-sm text-white font-bold">{salonName}</span>
                    </motion.div>
                  )}
                  <motion.div 
                    className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-sm">👥</span>
                    <span className="text-sm text-red-100">{friends.length}</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-sm">🪙</span>
                    <span className="text-sm font-bold">{markiliaCoins}</span>
                  </motion.div>
                </div>
              )}
            </div>

            {/* Center: Markilia Logo */}
            <motion.button
              className="text-2xl font-light bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent"
              onClick={() => setActiveSection('home')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Markilia
            </motion.button>
            
            {/* Right: Section Navigation + User */}
            <div className="flex items-center gap-4">
              {sections.map((section) => (
                <motion.button
                  key={section.id}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    activeSection === section.id 
                      ? `bg-gradient-to-r ${section.color} text-white shadow-lg` 
                      : `text-red-100 hover:bg-white/10`
                  }`}
                  onClick={() => setActiveSection(section.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section.icon} {section.title}
                </motion.button>
              ))}
              
              {isLoggedIn && (
                <motion.div 
                  className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setMarkiliaCoins(prev => prev + 100)}
                >
                  <span className="text-sm">👋</span>
                  <span className="text-sm text-red-100">{userName}</span>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      <div className="container mx-auto px-4 py-20 pt-32">
        <AnimatePresence mode="wait">
          {activeSection === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderHomePage()}
            </motion.div>
          ) : (
            <motion.div
              key={activeSection}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderSectionContent(activeSection)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="border-t border-red-300/20 py-8 text-center text-red-200/70 bg-gradient-to-r from-red-500/5 to-red-600/5 backdrop-blur-sm">
        <p>Made with 💝 for our beautiful community • Port 3001</p>
      </footer>
    </div>
  );
}