'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Search, 
  PlusCircle, 
  User, 
  ExternalLink, 
  Send, 
  Copy, 
  Check, 
  AlertTriangle, 
  Box, 
  Cpu, 
  Star, 
  Truck, 
  Lock, 
  Globe, 
  ChevronRight, 
  X, 
  DollarSign, 
  HelpCircle, 
  MessageSquare,
  Sparkles,
  ArrowRight,
  RefreshCw,
  QrCode
} from 'lucide-react';

// Indirizzo Bitcoin Ufficiale AnonimBTC
const FIXED_BTC_ADDRESS = "bc1qxpxu4d580jehs444gphz8g0wmhsur4ftd3agjg";
const TELEGRAM_SUPPORT = "@gustavoeuro";

// Dizionario Internazionalizzazione
const translations = {
  it: {
    ticker: [
      "🛡️ Identità protetta al 100%. Nessun documento richiesto.",
      "⚡ Transazioni P2P decentralizzate esclusivamente in Bitcoin.",
      "🔒 Scambi privati e moderazione manuale su bot Telegram.",
      "📦 Spedizioni anonime con AnonimBTC Ship."
    ],
    slogan: "CHIEDI E TI SARÀ DATO",
    subtitle: "Marketplace Anonimo – Vendi, compra e chiedi qualsiasi cosa in modo sicuro e anonimo con Bitcoin.",
    searchPlaceholder: "Codice annuncio? (es. PRD-882193)",
    btnSearch: "Cerca",
    btnCreateAd: "Crea Annuncio",
    btnStartSelling: "Inizia a vendere",
    allAds: "Bacheca Annunci Verificati",
    digital: "Digitale",
    physical: "Fisico",
    sponsored: "Sponsorizzato",
    seller: "Venditore",
    date: "Data",
    price: "Prezzo",
    buyNow: "Acquista",
    details: "Dettagli",
    help: "Aiuto",
    feedback: "Dicci la tua",
    contactSupport: "Assistenza Telegram",
    rules: "Istruzioni & Regole",
    navHome: "Bacheca",
    navProfile: "Area Personale",
    navRules: "Regolamento",
    navContact: "Contatti",
    loginRegister: "Accedi / Registrati",
    logout: "Esci",
    kycFreeNotice: "AnonimBTC è senza KYC. Puoi registrarti con dati di fantasia. Non chiediamo mai documenti personali.",
  },
  en: {
    ticker: [
      "🛡️ 100% Protected Identity. Zero KYC required.",
      "⚡ P2P Decentralized trades exclusively with Bitcoin.",
      "🔒 Private exchanges with manual review via Telegram bot.",
      "📦 Stealth physical shipping with AnonimBTC Ship."
    ],
    slogan: "ASK AND IT SHALL BE GIVEN",
    subtitle: "Anonymous Marketplace – Buy, sell and request anything securely and privately using Bitcoin.",
    searchPlaceholder: "Ad Code? (e.g. PRD-882193)",
    btnSearch: "Search",
    btnCreateAd: "Create Ad",
    btnStartSelling: "Start Selling",
    allAds: "Verified Listings Board",
    digital: "Digital",
    physical: "Physical",
    sponsored: "Sponsored",
    seller: "Seller",
    date: "Date",
    price: "Price",
    buyNow: "Buy with BTC",
    details: "Details",
    help: "Help",
    feedback: "Feedback",
    contactSupport: "Telegram Support",
    rules: "Rules & Guide",
    navHome: "Marketplace",
    navProfile: "Dashboard",
    navRules: "Rules",
    navContact: "Contact",
    loginRegister: "Login / Register",
    logout: "Sign Out",
    kycFreeNotice: "AnonimBTC is strictly No-KYC. Pseudonymous and alias profiles are fully allowed. We never ask for IDs.",
  }
};

// Annunci Mock Predefiniti
const INITIAL_ADS = [
  {
    id: "PRD-948211",
    title: "Server VPS Off-shore No-Log preconfigurato Monero/BTC Node",
    description: "Configurazione bare-metal in giurisdizione off-shore. Hardening Linux avanzato, zero log, pagamento anonimo prepagato per 12 mesi. Assistenza setup inclusa.",
    price: 180,
    type: "digital",
    sponsored: true,
    seller: "CypherNode_99",
    sellerLevel: "Competente",
    ratingPositive: 99,
    ratingNegative: 1,
    dealsClosed: 42,
    date: "2026-09-08",
    telegram: "https://t.me/gustavoeuro",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "PRD-330194",
    title: "Coldcard Mk4 Hardware Wallet - Sigillato in Packaging Schermato",
    description: "Hardware wallet per Bitcoin air-gapped mai aperto, confezione originale termosaldata con sacchetto anti-manomissione. Spedizione anonima AnonimBTC Ship.",
    price: 165,
    type: "physical",
    sponsored: true,
    seller: "SatoshiVault",
    sellerLevel: "Veterano",
    ratingPositive: 154,
    ratingNegative: 0,
    dealsClosed: 120,
    date: "2026-09-07",
    telegram: "https://t.me/gustavoeuro",
    shippingInfo: "AnonimBTC Ship + Corriere Privato Fermopoint / Lockers",
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "PRD-512088",
    title: "Consulenza OPSEC & Bonifica Dispositivi Personali",
    description: "Sessione privata di 2 ore via call cifrata o chat PGP per bonifica profili digitali, configurazione Tails OS / Qubes OS e minimizzazione impronta telematica.",
    price: 90,
    type: "digital",
    sponsored: false,
    seller: "GhostProtocol",
    sellerLevel: "Principiante",
    ratingPositive: 14,
    ratingNegative: 0,
    dealsClosed: 14,
    date: "2026-09-06",
    telegram: "https://t.me/gustavoeuro",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
  }
];

export default function AnonimBTCApp() {
  const [lang, setLang] = useState<'it' | 'en'>('it');
  const t = translations[lang];

  // Stati di navigazione e modali
  const [activeView, setActiveView] = useState<'home' | 'rules' | 'contact' | 'profile'>('home');
  const [selectedAd, setSelectedAd] = useState<any>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isCloudflareVerified, setIsCloudflareVerified] = useState(false);
  const [isBuyingModalOpen, setIsBuyingModalOpen] = useState(false);
  const [isCreateAdOpen, setIsCreateAdOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'digital' | 'physical'>('all');
  const [copiedBtc, setCopiedBtc] = useState(false);
  const [copiedAdLink, setCopiedAdLink] = useState(false);
  const [purchaseStep, setPurchaseStep] = useState<'pay' | 'confirmed'>('pay');

  // Stato Utente Autenticato (Simulato)
  const [user, setUser] = useState<{
    isLoggedIn: boolean;
    alias: string;
    email: string;
    phone: string;
    btcAddress: string;
  } | null>(null);

  // Form Registrazione / Login
  const [authForm, setAuthForm] = useState({
    alias: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [authSuccessMsg, setAuthSuccessMsg] = useState(false);

  // Form Creazione Annuncio
  const [adForm, setAdForm] = useState({
    title: '',
    description: '',
    telegram: '',
    price: '',
    type: 'digital',
    promoTier: 'base' // base (10€), pro (15€), ultra (20€)
  });
  const [adSubmittedCode, setAdSubmittedCode] = useState<string | null>(null);

  // Form Contattaci
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    adCode: '',
    message: ''
  });
  const [contactSent, setContactSent] = useState(false);

  // Messaggi Marquee a rotazione
  const [tickerIndex, setTickerIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % t.ticker.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [t.ticker.length]);

  // Gestione Copia BTC Address
  const handleCopyBtc = () => {
    navigator.clipboard.writeText(FIXED_BTC_ADDRESS);
    setCopiedBtc(true);
    setTimeout(() => setCopiedBtc(false), 3000);
  };

  // Gestione Filtri e Ricerca Annunci
  const filteredAds = INITIAL_ADS.filter(ad => {
    const matchesFilter = filterType === 'all' || ad.type === filterType;
    const matchesSearch = ad.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ad.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Intercettazione Creazione Annuncio per non-loggati
  const handleOpenCreateAd = () => {
    if (!user?.isLoggedIn) {
      setAuthMode('register');
      setIsAuthModalOpen(true);
    } else {
      setIsCreateAdOpen(true);
    }
  };

  // Switch Cloudflare Simulata
  const handleCloudflareVerify = () => {
    setTimeout(() => {
      setIsCloudflareVerified(true);
    }, 800);
  };

  // Submit Registrazione
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authForm.password !== authForm.confirmPassword) {
      alert(lang === 'it' ? "Le password non coincidono!" : "Passwords do not match!");
      return;
    }
    setAuthSuccessMsg(true);
  };

  // Submit Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      isLoggedIn: true,
      alias: authForm.alias || "ShadowUser_404",
      email: authForm.email || "user@anonimbtc.onion",
      phone: authForm.phone || "+39 000 0000000",
      btcAddress: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
    });
    setIsAuthModalOpen(false);
    setAuthSuccessMsg(false);
  };

  // Submit Creazione Annuncio
  const handleAdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `PRD-${Math.floor(100000 + Math.random() * 900000)}`;
    setAdSubmittedCode(generatedId);
  };

  return (
    <div className="min-h-screen bg-dark-900 text-zinc-100 flex flex-col font-sans selection:bg-btc selection:text-black">
      
      {/* ================= TOP ANNOUNCEMENT BAR (MARQUEE) ================= */}
      <div className="bg-gradient-to-r from-btc-dark via-btc to-btc-dark text-black font-semibold text-xs py-2 px-4 shadow-md sticky top-0 z-50 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 truncate">
            <span className="inline-block w-2 h-2 rounded-full bg-black animate-pulse"></span>
            <span className="font-mono uppercase tracking-wider text-[11px] bg-black/20 px-1.5 py-0.5 rounded">
              AnonimBTC Network
            </span>
            <span className="transition-all duration-700 ease-in-out">
              {t.ticker[tickerIndex]}
            </span>
          </div>

          {/* Switch Lingua Obbligatorio */}
          <div className="flex items-center space-x-2 shrink-0 ml-4">
            <Globe className="w-3.5 h-3.5" />
            <button 
              onClick={() => setLang('it')}
              className={`px-2 py-0.5 rounded text-xs font-bold transition ${
                lang === 'it' ? 'bg-black text-white shadow' : 'bg-black/20 hover:bg-black/40 text-black'
              }`}
            >
              IT
            </button>
            <span className="text-black/50">/</span>
            <button 
              onClick={() => setLang('en')}
              className={`px-2 py-0.5 rounded text-xs font-bold transition ${
                lang === 'en' ? 'bg-black text-white shadow' : 'bg-black/20 hover:bg-black/40 text-black'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {/* ================= HEADER NAVBAR ================= */}
      <header className="border-b border-dark-600/80 bg-dark-800/90 backdrop-blur-md sticky top-8 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo Originale AnonimBTC (A stilizzata + Simbolo Bitcoin) */}
          <div 
            className="flex items-center space-x-3 cursor-pointer select-none shrink-0"
            onClick={() => { setActiveView('home'); setSelectedAd(null); }}
          >
            <div className="relative w-12 h-12 bg-gradient-to-br from-btc via-btc-hover to-black rounded-xl p-[2px] shadow-lg shadow-btc/20 group">
              <div className="w-full h-full bg-dark-900 rounded-[10px] flex items-center justify-center relative overflow-hidden">
                {/* SVG Logo Originale A + Bitcoin */}
                <svg viewBox="0 0 100 100" className="w-9 h-9 text-btc group-hover:scale-110 transition transform">
                  {/* Forma A Stilizzata Cyber */}
                  <polygon points="50,12 86,88 68,88 50,48 32,88 14,88" fill="currentColor" opacity="0.95" />
                  {/* Barra orizzontale della A fusa col simbolo Bitcoin */}
                  <line x1="28" y1="62" x2="72" y2="62" stroke="#07080B" strokeWidth="9" strokeLinecap="round"/>
                  {/* Linee verticali tipiche del Bitcoin */}
                  <line x1="45" y1="26" x2="45" y2="76" stroke="#07080B" strokeWidth="4" />
                  <line x1="55" y1="26" x2="55" y2="76" stroke="#07080B" strokeWidth="4" />
                </svg>
              </div>
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-wider text-white flex items-center">
                ANONIM<span className="text-btc">BTC</span>
              </span>
              <p className="text-[10px] tracking-tight text-zinc-400 font-mono hidden sm:block">
                Compra, vendi e chiedi in modo anonimo
              </p>
            </div>
          </div>

          {/* Navigazione Desktop */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <button 
              onClick={() => { setActiveView('home'); setSelectedAd(null); }}
              className={`hover:text-btc transition ${activeView === 'home' ? 'text-btc' : 'text-zinc-300'}`}
            >
              {t.navHome}
            </button>
            <button 
              onClick={() => setActiveView('rules')}
              className={`hover:text-btc transition ${activeView === 'rules' ? 'text-btc' : 'text-zinc-300'}`}
            >
              {t.navRules}
            </button>
            <button 
              onClick={() => setActiveView('contact')}
              className={`hover:text-btc transition ${activeView === 'contact' ? 'text-btc' : 'text-zinc-300'}`}
            >
              {t.navContact}
            </button>
          </nav>

          {/* Pulsanti CTA & Profilo */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleOpenCreateAd}
              className="bg-btc hover:bg-btc-hover text-black font-bold px-4 py-2 rounded-lg text-sm flex items-center space-x-2 transition shadow-lg shadow-btc/20 active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">{t.btnCreateAd}</span>
            </button>

            {user?.isLoggedIn ? (
              <button 
                onClick={() => setActiveView('profile')}
                className="flex items-center space-x-2 bg-dark-700 hover:bg-dark-600 border border-zinc-700 text-zinc-200 px-3 py-2 rounded-lg text-sm transition"
              >
                <div className="w-6 h-6 rounded-full bg-btc/20 text-btc flex items-center justify-center font-bold text-xs">
                  {user.alias[0].toUpperCase()}
                </div>
                <span className="hidden sm:inline font-mono">{user.alias}</span>
              </button>
            ) : (
              <button 
                onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); }}
                className="border border-btc/40 hover:border-btc hover:text-btc text-zinc-300 font-semibold px-4 py-2 rounded-lg text-sm transition flex items-center space-x-1.5"
              >
                <User className="w-4 h-4" />
                <span>{t.loginRegister}</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ================= CONTENUTO PRINCIPALE IN BASE ALLA VISTA ================= */}
      <main className="flex-grow">
        
        {/* VISTA 1: HOME MARKETPLACE */}
        {activeView === 'home' && !selectedAd && (
          <div>
            {/* HERO SECTION */}
            <section className="relative overflow-hidden pt-12 pb-16 border-b border-dark-600/50 bg-gradient-to-b from-dark-800 to-dark-900">
              <div className="absolute inset-0 bg-[radial-gradient(#F7931A_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="max-w-2xl text-center md:text-left">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-btc/10 border border-btc/30 text-btc text-xs font-mono mb-6">
                    <ShieldCheck className="w-4 h-4" />
                    <span>VERIFIED ZERO-LOG OPSEC PLATFORM</span>
                  </div>
                  <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-4">
                    {t.slogan}
                  </h1>
                  <p className="text-base sm:text-lg text-zinc-400 mb-8 leading-relaxed">
                    {t.subtitle}
                  </p>

                  {/* Barra di Ricerca Codice Annuncio */}
                  <div className="bg-dark-700/80 p-2 rounded-xl border border-dark-500 shadow-2xl flex flex-col sm:flex-row items-center gap-2 max-w-lg mx-auto md:mx-0">
                    <div className="relative flex-grow w-full">
                      <Search className="w-5 h-5 absolute left-3 top-3 text-zinc-400" />
                      <input 
                        type="text"
                        placeholder={t.searchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-dark-900/90 text-white pl-10 pr-4 py-2.5 rounded-lg border border-dark-600 text-sm focus:outline-none focus:border-btc font-mono"
                      />
                    </div>
                    <button 
                      onClick={() => {}}
                      className="w-full sm:w-auto bg-btc hover:bg-btc-hover text-black font-bold px-6 py-2.5 rounded-lg text-sm transition shrink-0"
                    >
                      {t.btnSearch}
                    </button>
                  </div>

                  <div className="mt-6 flex items-center justify-center md:justify-start space-x-4">
                    <button 
                      onClick={handleOpenCreateAd}
                      className="text-xs text-zinc-400 hover:text-btc flex items-center space-x-1"
                    >
                      <span>{t.btnStartSelling}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <span className="text-zinc-600">•</span>
                    <span className="text-xs text-zinc-400 font-mono">100% Bitcoin Settlement</span>
                  </div>
                </div>

                {/* Grafica Personaggio Anonymous + Bitcoin */}
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
                  <div className="absolute inset-0 bg-btc/20 rounded-full blur-3xl animate-pulse"></div>
                  <div className="relative z-10 w-full h-full bg-dark-800 border-2 border-btc/40 rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-2xl">
                    {/* SVG Maschera Anonymous Stilizzata + BTC */}
                    <svg viewBox="0 0 200 200" className="w-36 h-36 text-zinc-200 mb-4 drop-shadow-[0_10px_10px_rgba(247,147,26,0.3)]">
                      {/* Sagoma Volto */}
                      <path d="M50 60 C50 20, 150 20, 150 60 C150 110, 130 160, 100 180 C70 160, 50 110, 50 60 Z" fill="#0E1117" stroke="#F7931A" strokeWidth="4"/>
                      {/* Baffi stilizzati Guy Fawkes */}
                      <path d="M70 125 Q100 135 130 125 Q115 145 100 135 Q85 145 70 125 Z" fill="#F7931A"/>
                      {/* Pizzetto */}
                      <polygon points="95,145 105,145 100,165" fill="#F7931A" />
                      {/* Occhi cifrati */}
                      <path d="M68 82 Q80 75 92 85" stroke="#F7931A" strokeWidth="4" fill="none" strokeLinecap="round"/>
                      <path d="M108 85 Q120 75 132 82" stroke="#F7931A" strokeWidth="4" fill="none" strokeLinecap="round"/>
                      {/* Sopracciglia ironiche */}
                      <path d="M65 68 Q80 60 92 72" stroke="#ffffff" strokeWidth="2.5" fill="none"/>
                      <path d="M108 72 Q120 60 135 68" stroke="#ffffff" strokeWidth="2.5" fill="none"/>
                    </svg>
                    <span className="font-mono text-xs text-btc font-bold tracking-widest uppercase">
                      AnonimBTC Guardian
                    </span>
                    <span className="text-[11px] text-zinc-400 mt-1">
                      No KYC • No IP Log • Escrow Bot
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* SEZIONE ANNUNCI IN BACHECA */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-black text-white flex items-center space-x-2">
                    <span>{t.allAds}</span>
                    <span className="text-xs bg-btc/20 text-btc px-2 py-0.5 rounded font-mono">
                      {filteredAds.length} attivi
                    </span>
                  </h2>
                  <p className="text-sm text-zinc-400 mt-1">
                    Solo annunci approvati dal moderatore Telegram (@gustavoeuro).
                  </p>
                </div>

                {/* Filtri tipo */}
                <div className="flex items-center space-x-2 bg-dark-800 p-1 rounded-xl border border-dark-600">
                  <button 
                    onClick={() => setFilterType('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${filterType === 'all' ? 'bg-btc text-black' : 'text-zinc-400 hover:text-white'}`}
                  >
                    Tutti
                  </button>
                  <button 
                    onClick={() => setFilterType('digital')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center space-x-1 ${filterType === 'digital' ? 'bg-btc text-black' : 'text-zinc-400 hover:text-white'}`}
                  >
                    <Cpu className="w-3.5 h-3.5" />
                    <span>{t.digital}</span>
                  </button>
                  <button 
                    onClick={() => setFilterType('physical')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center space-x-1 ${filterType === 'physical' ? 'bg-btc text-black' : 'text-zinc-400 hover:text-white'}`}
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>{t.physical}</span>
                  </button>
                </div>
              </div>

              {/* Grid Card Annunci */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAds.map((ad) => (
                  <div 
                    key={ad.id}
                    onClick={() => setSelectedAd(ad)}
                    className="bg-dark-800 hover:bg-dark-700/80 border border-dark-600 hover:border-btc/60 rounded-2xl overflow-hidden transition duration-200 cursor-pointer flex flex-col group shadow-lg hover:shadow-btc/10"
                  >
                    {/* Immagine con Badges */}
                    <div className="relative h-48 w-full bg-dark-900 overflow-hidden">
                      <img 
                        src={ad.image} 
                        alt={ad.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300 opacity-80 group-hover:opacity-100"
                      />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow ${
                          ad.type === 'digital' ? 'bg-blue-600/90 text-white' : 'bg-emerald-600/90 text-white'
                        }`}>
                          {ad.type === 'digital' ? t.digital : t.physical}
                        </span>
                        {ad.sponsored && (
                          <span className="bg-btc text-black text-[10px] font-extrabold uppercase tracking-wider px-2 py-1 rounded-md shadow flex items-center space-x-1">
                            <Sparkles className="w-3 h-3" />
                            <span>{t.sponsored}</span>
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-md px-2 py-1 rounded font-mono text-xs text-zinc-300">
                        {ad.id}
                      </div>
                    </div>

                    {/* Contenuto Card */}
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="font-bold text-base text-white group-hover:text-btc transition line-clamp-2 mb-2">
                        {ad.title}
                      </h3>
                      <p className="text-xs text-zinc-400 line-clamp-2 mb-4">
                        {ad.description}
                      </p>

                      <div className="mt-auto pt-4 border-t border-dark-600 flex items-center justify-between">
                        <div>
                          <div className="text-xs text-zinc-500 font-mono">Alias Venditore</div>
                          <div className="text-xs font-semibold text-zinc-200 flex items-center space-x-1">
                            <span>{ad.seller}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-zinc-500 font-mono">Prezzo EUR</div>
                          <div className="text-lg font-black text-btc">
                            {ad.price} €
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* VISTA 2: DETTAGLIO ANNUNCIO */}
        {selectedAd && (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <button 
              onClick={() => setSelectedAd(null)}
              className="text-xs font-mono text-zinc-400 hover:text-btc mb-6 flex items-center space-x-1.5 transition"
            >
              <span>← Torna a tutti gli annunci</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Colonna Sinistra: Media e Dettagli */}
              <div className="lg:col-span-2 space-y-6">
                <div className="relative rounded-2xl overflow-hidden border border-dark-600 bg-dark-900 max-h-96">
                  <img src={selectedAd.image} alt={selectedAd.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-black/80 backdrop-blur-md px-3 py-1 rounded text-xs font-bold text-btc font-mono">
                      Codice: {selectedAd.id}
                    </span>
                    {selectedAd.sponsored && (
                      <span className="bg-btc text-black px-3 py-1 rounded text-xs font-extrabold uppercase">
                        Sponsorizzato
                      </span>
                    )}
                  </div>
                </div>

                <div className="bg-dark-800 border border-dark-600 rounded-2xl p-6">
                  <div className="flex items-center space-x-2 text-xs font-mono text-zinc-400 mb-2">
                    <span>Pubblicato il: {selectedAd.date}</span>
                    <span>•</span>
                    <span className="uppercase text-btc">{selectedAd.type}</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-white mb-4">
                    {selectedAd.title}
                  </h1>
                  <div className="border-t border-dark-600 pt-4">
                    <h4 className="text-xs uppercase font-mono tracking-wider text-zinc-400 mb-2">Descrizione Completa</h4>
                    <p className="text-zinc-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                      {selectedAd.description}
                    </p>
                  </div>

                  {/* Dettagli Spedizione Anonima se fisico */}
                  {selectedAd.type === 'physical' && (
                    <div className="mt-6 bg-dark-900/80 border border-dark-600 p-4 rounded-xl flex items-start space-x-3">
                      <Truck className="w-5 h-5 text-btc shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <div className="font-bold text-white mb-1">Spedizione AnonimBTC Ship Inclusa</div>
                        <p className="text-zinc-400">
                          {selectedAd.shippingInfo || "Spedizione schermata con imballo neutro stealth. Nessun mittente ricollegabile. Tracciamento su rete Tor/Onion."}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Colonna Destra: Checkout Box & Reputazione Venditore */}
              <div className="space-y-6">
                <div className="bg-dark-800 border-2 border-btc/40 rounded-2xl p-6 shadow-xl relative">
                  <div className="text-xs font-mono text-zinc-400 mb-1">Prezzo Fissato</div>
                  <div className="flex items-baseline space-x-2 mb-4">
                    <span className="text-3xl font-black text-white">{selectedAd.price} €</span>
                    <span className="text-sm font-mono text-btc">≈ {(selectedAd.price / 85000).toFixed(6)} BTC</span>
                  </div>

                  {/* Pulsante Acquista */}
                  <button 
                    onClick={() => {
                      if (!user?.isLoggedIn) {
                        setAuthMode('login');
                        setIsAuthModalOpen(true);
                      } else {
                        setPurchaseStep('pay');
                        setIsBuyingModalOpen(true);
                      }
                    }}
                    className="w-full bg-btc hover:bg-btc-hover text-black font-extrabold py-3.5 rounded-xl text-base shadow-lg shadow-btc/20 transition active:scale-95 flex items-center justify-center space-x-2"
                  >
                    <Box className="w-5 h-5" />
                    <span>{t.buyNow}</span>
                  </button>

                  <div className="mt-4 pt-4 border-t border-dark-600 flex items-center justify-between text-xs">
                    <a 
                      href={selectedAd.telegram} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-zinc-400 hover:text-btc flex items-center space-x-1"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Contatta utente</span>
                    </a>

                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        setCopiedAdLink(true);
                        setTimeout(() => setCopiedAdLink(false), 2000);
                      }}
                      className="text-zinc-400 hover:text-white flex items-center space-x-1"
                    >
                      {copiedAdLink ? <Check className="w-3.5 h-3.5 text-green-400" /> : <ExternalLink className="w-3.5 h-3.5" />}
                      <span>{copiedAdLink ? "Copiato!" : "Condividi"}</span>
                    </button>
                  </div>
                </div>

                {/* Profilo Venditore */}
                <div className="bg-dark-800 border border-dark-600 rounded-2xl p-6">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-4">
                    Informazioni Venditore
                  </h4>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-btc/20 border border-btc/40 flex items-center justify-center font-black text-btc">
                      {selectedAd.seller[0]}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center space-x-2">
                        <span>{selectedAd.seller}</span>
                        <span className="w-2 h-2 rounded-full bg-green-500" title="Online"></span>
                      </div>
                      <div className="text-xs text-zinc-400">Livello: <span className="text-btc font-semibold">{selectedAd.sellerLevel}</span></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center bg-dark-900 p-3 rounded-xl border border-dark-600 mb-4 font-mono">
                    <div>
                      <div className="text-xs text-zinc-500">Affari</div>
                      <div className="text-sm font-bold text-white">{selectedAd.dealsClosed}</div>
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500">Positivi</div>
                      <div className="text-sm font-bold text-green-400">+{selectedAd.ratingPositive}</div>
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500">Negativi</div>
                      <div className="text-sm font-bold text-red-400">-{selectedAd.ratingNegative}</div>
                    </div>
                  </div>

                  <div className="text-[11px] text-zinc-400 flex items-center space-x-1.5">
                    <ShieldCheck className="w-4 h-4 text-btc shrink-0" />
                    <span>Transazione coperta da moderazione manuale su bot Telegram.</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* VISTA 3: ISTRUZIONI E REGOLE */}
        {activeView === 'rules' && (
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-black text-white mb-2">Istruzioni & Regole di AnonimBTC</h1>
            <p className="text-zinc-400 text-sm mb-8">
              Linee guida ufficiali per operare in sicurezza, anonimato e trasparenza sul marketplace.
            </p>

            <div className="space-y-8 text-sm leading-relaxed">
              <div className="bg-dark-800 border border-dark-600 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-btc mb-2 flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5" />
                  <span>1. Filosofia No-KYC e Privacy</span>
                </h3>
                <p className="text-zinc-300">
                  AnonimBTC non raccoglierà mai documenti di identità, passaporti o registrazioni video. Gli utenti sono invitati a registrarsi utilizzando dati di fantasia e alias. Nessun IP viene conservato nei log di connessione.
                </p>
              </div>

              <div className="bg-dark-800 border border-dark-600 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-btc mb-2 flex items-center space-x-2">
                  <PlusCircle className="w-5 h-5" />
                  <span>2. Procedura di Pubblicazione Annunci</span>
                </h3>
                <p className="text-zinc-300 mb-2">
                  Ogni annuncio creato viene instradato verso il bot di moderazione manuale del proprietario su Telegram (<strong>@gustavoeuro</strong>). 
                </p>
                <ul className="list-disc list-inside text-zinc-400 space-y-1">
                  <li>Scegliere il pacchetto promozionale (Base 10€, Pro 15€, Ultra 20€).</li>
                  <li>Includere sempre un canale di contatto Telegram valido (es. https://t.me/...).</li>
                  <li>La revisione avviene normalmente entro pochi minuti dall'invio.</li>
                </ul>
              </div>

              <div className="bg-dark-800 border border-dark-600 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-btc mb-2 flex items-center space-x-2">
                  <DollarSign className="w-5 h-5" />
                  <span>3. Procedura di Acquisto e Pagamenti</span>
                </h3>
                <p className="text-zinc-300">
                  I pagamenti avvengono unicamente tramite la blockchain di Bitcoin. Tutti i fondi per i prodotti acquistati devono essere versati all’indirizzo di garanzia centralizzato: <br />
                  <code className="text-btc bg-dark-900 px-2 py-1 rounded font-mono text-xs block mt-2 break-all">
                    bc1qxpxu4d580jehs444gphz8g0wmhsur4ftd3agjg
                  </code>
                </p>
              </div>

              <div className="bg-dark-800 border border-dark-600 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-btc mb-2 flex items-center space-x-2">
                  <Truck className="w-5 h-5" />
                  <span>4. Spedizioni Fisiche (AnonimBTC Ship)</span>
                </h3>
                <p className="text-zinc-300">
                  Per le merci fisiche è obbligatorio concordare imballaggi stealth senza dettagli riconducibili all’acquirente. Consigliamo l’utilizzo di locker automatici, fermopoint o indirizzi cifrati PGP.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* VISTA 4: CONTATTACI */}
        {activeView === 'contact' && (
          <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-black text-white mb-2">Contatta il Supporto</h1>
            <p className="text-zinc-400 text-sm mb-6">
              Hai bisogno di assistenza o vuoi verificare un annuncio? Invia la richiesta qui sotto oppure scrivi direttamente su Telegram a <a href="https://t.me/gustavoeuro" target="_blank" rel="noreferrer" className="text-btc font-mono font-bold">@gustavoeuro</a>.
            </p>

            <div className="bg-dark-800 border border-dark-600 rounded-2xl p-6 shadow-xl">
              {contactSent ? (
                <div className="text-center py-8">
                  <Check className="w-12 h-12 text-green-400 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-white mb-1">Messaggio Inoltrato!</h3>
                  <p className="text-xs text-zinc-400 mb-6">
                    La richiesta è stata inviata al canale di assistenza Telegram (@gustavoeuro). Risposta garantita entro 24 ore.
                  </p>
                  <button 
                    onClick={() => setContactSent(false)}
                    className="bg-btc text-black font-bold px-4 py-2 rounded-lg text-xs"
                  >
                    Invia un altro messaggio
                  </button>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setContactSent(true); }} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">Il tuo Nome / Alias *</label>
                    <input 
                      type="text" 
                      required 
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      placeholder="es. Phantom99"
                      className="w-full bg-dark-900 border border-dark-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-btc"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">La tua Email di contatto *</label>
                    <input 
                      type="email" 
                      required 
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      placeholder="alias@proton.me"
                      className="w-full bg-dark-900 border border-dark-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-btc"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">Oggetto *</label>
                    <input 
                      type="text" 
                      required 
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                      placeholder="Assistenza pagamento / Revisione annuncio"
                      className="w-full bg-dark-900 border border-dark-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-btc"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">Codice Privato Annuncio (opzionale)</label>
                    <input 
                      type="text" 
                      value={contactForm.adCode}
                      onChange={(e) => setContactForm({...contactForm, adCode: e.target.value})}
                      placeholder="es. PRD-881920"
                      className="w-full bg-dark-900 border border-dark-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-btc font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">Messaggio *</label>
                    <textarea 
                      rows={4} 
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      placeholder="Descrivi dettagliatamente la tua richiesta..."
                      className="w-full bg-dark-900 border border-dark-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-btc"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-btc hover:bg-btc-hover text-black font-bold py-3 rounded-lg text-sm transition"
                  >
                    Invia messaggio
                  </button>
                  <p className="text-[11px] text-zinc-500 text-center font-mono">
                    Risposta media entro 24 ore via operatore Telegram @gustavoeuro.
                  </p>
                </form>
              )}
            </div>
          </section>
        )}

        {/* VISTA 5: PROFILO UTENTE E IMPOSTAZIONI */}
        {activeView === 'profile' && user && (
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-black text-white">Ciao, {user.alias}</h1>
                <p className="text-zinc-400 text-xs font-mono">Pannello Impostazioni & Account Anonimo</p>
              </div>
              <button 
                onClick={() => { setUser(null); setActiveView('home'); }}
                className="text-xs text-red-400 hover:underline font-mono"
              >
                Disconnetti Account
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Menu Profilo */}
              <div className="bg-dark-800 border border-dark-600 rounded-2xl p-4 space-y-2 h-fit">
                <button 
                  onClick={handleOpenCreateAd}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold bg-btc text-black flex items-center justify-between"
                >
                  <span>Crea un nuovo annuncio</span>
                  <PlusCircle className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setActiveView('home')}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-zinc-300 hover:bg-dark-700 transition"
                >
                  Cerca annunci e richieste
                </button>
                <button 
                  onClick={() => setActiveView('rules')}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-zinc-300 hover:bg-dark-700 transition"
                >
                  Istruzioni e regole
                </button>
                <button 
                  onClick={() => setActiveView('contact')}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-zinc-300 hover:bg-dark-700 transition"
                >
                  Contattaci
                </button>
              </div>

              {/* Form Dati e Bitcoin Address */}
              <div className="md:col-span-2 space-y-6">
                <div className="bg-dark-800 border border-dark-600 rounded-2xl p-6">
                  <h3 className="text-sm font-bold text-white mb-4 uppercase font-mono tracking-wider">
                    Dati Account (No-KYC)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="text-zinc-400">Alias registrato</label>
                      <input 
                        type="text" 
                        value={user.alias} 
                        readOnly 
                        className="w-full bg-dark-900 border border-dark-600 rounded px-3 py-2 text-white font-mono mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-zinc-400">Email di riferimento</label>
                      <input 
                        type="email" 
                        value={user.email} 
                        readOnly 
                        className="w-full bg-dark-900 border border-dark-600 rounded px-3 py-2 text-white font-mono mt-1"
                      />
                    </div>
                  </div>

                  {/* Indirizzo BTC Prelievi con Avviso Rosso Critico */}
                  <div className="mt-6 pt-6 border-t border-dark-600">
                    <label className="block text-xs font-mono text-zinc-300 font-bold mb-1">
                      Indirizzo Bitcoin Personale (per ricezione pagamenti vendite)
                    </label>
                    <input 
                      type="text" 
                      defaultValue={user.btcAddress}
                      className="w-full bg-dark-900 border border-dark-600 rounded-lg px-3 py-2 text-xs font-mono text-btc focus:outline-none focus:border-btc"
                    />

                    {/* AVVISO ROSSO FORTISSIMO */}
                    <div className="mt-3 bg-red-950/70 border-2 border-red-600 p-3 rounded-xl flex items-start space-x-2.5 text-red-200">
                      <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <div className="text-[11px] leading-relaxed">
                        <strong className="text-red-400 font-bold uppercase tracking-wider block">ATTENZIONE CRITICA:</strong>
                        Se inserisci un indirizzo Bitcoin errato, non conforme o non appartenente al tuo wallet privato, 
                        <strong> i fondi andranno irrimediabilmente persi per sempre</strong>. 
                        La rete Bitcoin è irreversibile. Ricontrolla con estrema cura prima di salvare.
                      </div>
                    </div>

                    <button 
                      onClick={() => alert("Impostazioni salvate!")}
                      className="mt-4 bg-btc hover:bg-btc-hover text-black font-bold px-4 py-2 rounded-lg text-xs transition"
                    >
                      Salva Modifiche
                    </button>
                  </div>
                </div>

                {/* Eliminazione Account */}
                <div className="bg-dark-800 border border-red-900/50 rounded-2xl p-6">
                  <h4 className="text-xs font-bold text-red-400 uppercase font-mono tracking-wider mb-2">
                    Elimina Account Anonimo
                  </h4>
                  <p className="text-xs text-zinc-400 mb-4">
                    Questa operazione cancellerà all’istante tutte le sessioni e i riferimenti sul database locale. L’azione è permanente e non reversibile.
                  </p>
                  <button 
                    onClick={() => {
                      if (confirm("Sei sicuro di voler distruggere l'account irreversibilmente?")) {
                        setUser(null);
                        setActiveView('home');
                      }
                    }}
                    className="border border-red-600 hover:bg-red-600 text-red-400 hover:text-white px-3 py-2 rounded-lg text-xs font-bold transition"
                  >
                    Distruggi Account Definitivamente
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ================= MODALE: REGISTRAZIONE / LOGIN (CON CLOUDFLARE STYLE CHECK) ================= */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-dark-800 border border-dark-600 rounded-2xl w-full max-w-md p-6 relative shadow-2xl">
            <button 
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Avviso Sicurezza URL Ufficiale */}
            <div className="bg-dark-900 border border-btc/40 p-2.5 rounded-lg mb-4 text-[11px] text-zinc-300 font-mono flex items-center space-x-2">
              <Lock className="w-4 h-4 text-btc shrink-0" />
              <span>Verifica URL: <strong className="text-btc">https://anonimbtc.it/</strong>. Mai cedere la password a link esterni.</span>
            </div>

            {/* Cloudflare-Style Check */}
            {!isCloudflareVerified ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 border-4 border-btc border-t-transparent rounded-full animate-spin mx-auto"></div>
                <div className="text-sm font-mono text-zinc-300">
                  Controllo di sicurezza del browser in corso...
                </div>
                <button 
                  onClick={handleCloudflareVerify}
                  className="bg-dark-700 hover:bg-dark-600 border border-zinc-600 px-4 py-2 rounded-lg text-xs font-mono text-zinc-200"
                >
                  Clicca se la verifica non avanza
                </button>
              </div>
            ) : authSuccessMsg ? (
              /* Schermata di Successo Creazione */
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Account creato!</h3>
                <p className="text-xs text-zinc-400 mb-6">
                  Il tuo account è stato creato con successo. Ora puoi accedere al marketplace anonimo.
                </p>
                <button 
                  onClick={() => { setAuthSuccessMsg(false); setAuthMode('login'); }}
                  className="bg-btc hover:bg-btc-hover text-black font-bold px-6 py-2.5 rounded-lg text-xs uppercase"
                >
                  Vai al login
                </button>
              </div>
            ) : (
              <div>
                <div className="flex border-b border-dark-600 mb-4">
                  <button 
                    onClick={() => setAuthMode('login')}
                    className={`flex-1 py-2 text-xs font-bold uppercase transition ${authMode === 'login' ? 'border-b-2 border-btc text-btc' : 'text-zinc-400'}`}
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => setAuthMode('register')}
                    className={`flex-1 py-2 text-xs font-bold uppercase transition ${authMode === 'register' ? 'border-b-2 border-btc text-btc' : 'text-zinc-400'}`}
                  >
                    Registrati (No-KYC)
                  </button>
                </div>

                {authMode === 'register' && (
                  <p className="text-[11px] text-zinc-400 mb-4 italic bg-dark-900 p-2.5 rounded border border-dark-600">
                    {t.kycFreeNotice}
                  </p>
                )}

                <form onSubmit={authMode === 'register' ? handleRegisterSubmit : handleLoginSubmit} className="space-y-3">
                  {authMode === 'register' && (
                    <>
                      <div>
                        <label className="text-[11px] font-mono text-zinc-400">Nome completo / Alias</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="es. Marco Rossi o GhostMaster"
                          value={authForm.alias}
                          onChange={(e) => setAuthForm({...authForm, alias: e.target.value})}
                          className="w-full bg-dark-900 border border-dark-600 rounded px-3 py-2 text-xs text-white focus:border-btc"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-mono text-zinc-400">Numero di Telefono (anche virtuale)</label>
                        <input 
                          type="tel" 
                          required 
                          placeholder="+39 333 0000000"
                          value={authForm.phone}
                          onChange={(e) => setAuthForm({...authForm, phone: e.target.value})}
                          className="w-full bg-dark-900 border border-dark-600 rounded px-3 py-2 text-xs text-white focus:border-btc"
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label className="text-[11px] font-mono text-zinc-400">Email</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="utente@anonimbtc.com"
                      value={authForm.email}
                      onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
                      className="w-full bg-dark-900 border border-dark-600 rounded px-3 py-2 text-xs text-white focus:border-btc"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-zinc-400">
                      Password {authMode === 'register' && '(min 8 caratteri, maiuscole, numeri, speciali)'}
                    </label>
                    <input 
                      type="password" 
                      required 
                      value={authForm.password}
                      onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
                      className="w-full bg-dark-900 border border-dark-600 rounded px-3 py-2 text-xs text-white focus:border-btc"
                    />
                  </div>

                  {authMode === 'register' && (
                    <div>
                      <label className="text-[11px] font-mono text-zinc-400">Conferma Password</label>
                      <input 
                        type="password" 
                        required 
                        value={authForm.confirmPassword}
                        onChange={(e) => setAuthForm({...authForm, confirmPassword: e.target.value})}
                        className="w-full bg-dark-900 border border-dark-600 rounded px-3 py-2 text-xs text-white focus:border-btc"
                      />
                    </div>
                  )}

                  <button 
                    type="submit"
                    className="w-full bg-btc hover:bg-btc-hover text-black font-bold py-2.5 rounded-lg text-xs uppercase tracking-wider mt-4 transition"
                  >
                    {authMode === 'register' ? 'Crea Account' : 'Entra nel Marketplace'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= MODALE: CREAZIONE NUOVO ANNUNCIO ================= */}
      {isCreateAdOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <div className="bg-dark-800 border border-dark-600 rounded-2xl w-full max-w-xl p-6 relative my-8 shadow-2xl">
            <button 
              onClick={() => { setIsCreateAdOpen(false); setAdSubmittedCode(null); }}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {adSubmittedCode ? (
              /* Schermata di Conferma Invio Annuncio */
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-btc/20 text-btc rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Annuncio inviato!</h3>
                <div className="bg-dark-900 p-3 rounded-lg border border-btc/40 max-w-xs mx-auto mb-4 font-mono text-btc text-base font-bold">
                  {adSubmittedCode}
                </div>
                <p className="text-xs text-zinc-300 max-w-md mx-auto mb-6 leading-relaxed">
                  Il tuo annuncio è in fase di revisione e verrà pubblicato a breve. 
                  La notifica è stata trasmessa al moderatore Telegram (<strong>@gustavoeuro</strong>). Solo dopo approvazione manuale apparirà in homepage.
                </p>
                <button 
                  onClick={() => { setIsCreateAdOpen(false); setAdSubmittedCode(null); }}
                  className="bg-btc text-black font-bold px-6 py-2 rounded-lg text-xs"
                >
                  Torna alla Bacheca
                </button>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-black text-white mb-1">Avvia Compravendita – Crea un nuovo annuncio</h2>
                <p className="text-xs text-zinc-400 mb-6">
                  Scegli la tipologia, compila i dati e seleziona il pacchetto promozionale.
                </p>

                <form onSubmit={handleAdSubmit} className="space-y-4 text-xs">
                  {/* Scelta Tipo Annuncio */}
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      type="button"
                      onClick={() => setAdForm({...adForm, type: 'digital'})}
                      className={`p-3 rounded-xl border text-left transition ${
                        adForm.type === 'digital' ? 'border-btc bg-btc/10 text-white' : 'border-dark-600 bg-dark-900 text-zinc-400'
                      }`}
                    >
                      <Cpu className="w-4 h-4 text-btc mb-1" />
                      <div className="font-bold">1. Prodotto / Servizio Digitale</div>
                      <div className="text-[10px] text-zinc-500">File, consulenze, account, VPS</div>
                    </button>

                    <button 
                      type="button"
                      onClick={() => setAdForm({...adForm, type: 'physical'})}
                      className={`p-3 rounded-xl border text-left transition ${
                        adForm.type === 'physical' ? 'border-btc bg-btc/10 text-white' : 'border-dark-600 bg-dark-900 text-zinc-400'
                      }`}
                    >
                      <Truck className="w-4 h-4 text-btc mb-1" />
                      <div className="font-bold">2. Vendi con Spedizione</div>
                      <div className="text-[10px] text-zinc-500">Merci fisiche con AnonimBTC Ship</div>
                    </button>
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1 font-mono">Titolo della richiesta o offerta *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="es. Vendita Node Bitcoin Sigillato"
                      value={adForm.title}
                      onChange={(e) => setAdForm({...adForm, title: e.target.value})}
                      className="w-full bg-dark-900 border border-dark-600 rounded-lg p-2.5 text-white focus:border-btc"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1 font-mono">Descrizione Dettagliata *</label>
                    <textarea 
                      rows={3} 
                      required
                      placeholder="Fornisci tutte le specifiche del bene o servizio..."
                      value={adForm.description}
                      onChange={(e) => setAdForm({...adForm, description: e.target.value})}
                      className="w-full bg-dark-900 border border-dark-600 rounded-lg p-2.5 text-white focus:border-btc"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-zinc-400 mb-1 font-mono">Link Contatto Telegram Obbligatorio *</label>
                      <input 
                        type="url" 
                        required 
                        placeholder="https://t.me/tuo_alias"
                        value={adForm.telegram}
                        onChange={(e) => setAdForm({...adForm, telegram: e.target.value})}
                        className="w-full bg-dark-900 border border-dark-600 rounded-lg p-2.5 text-white focus:border-btc font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-400 mb-1 font-mono">Prezzo in EUR (€) *</label>
                      <input 
                        type="number" 
                        required 
                        placeholder="100"
                        value={adForm.price}
                        onChange={(e) => setAdForm({...adForm, price: e.target.value})}
                        className="w-full bg-dark-900 border border-dark-600 rounded-lg p-2.5 text-white focus:border-btc font-mono"
                      />
                    </div>
                  </div>

                  {/* Scelta Pacchetti Promozione Obbligatori */}
                  <div>
                    <label className="block text-zinc-300 font-bold mb-2 font-mono">
                      Pacchetto di Promozione (Obbligatorio)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <div 
                        onClick={() => setAdForm({...adForm, promoTier: 'base'})}
                        className={`p-3 rounded-xl border text-center cursor-pointer transition ${
                          adForm.promoTier === 'base' ? 'border-btc bg-btc/15 text-white' : 'border-dark-600 bg-dark-900 text-zinc-400'
                        }`}
                      >
                        <div className="font-bold text-sm">Base</div>
                        <div className="text-btc font-mono font-bold mt-1">10 €</div>
                        <div className="text-[10px] text-zinc-500 mt-1">Pubblicazione standard</div>
                      </div>

                      <div 
                        onClick={() => setAdForm({...adForm, promoTier: 'pro'})}
                        className={`p-3 rounded-xl border text-center cursor-pointer transition ${
                          adForm.promoTier === 'pro' ? 'border-btc bg-btc/15 text-white' : 'border-dark-600 bg-dark-900 text-zinc-400'
                        }`}
                      >
                        <div className="font-bold text-sm">Pro</div>
                        <div className="text-btc font-mono font-bold mt-1">15 €</div>
                        <div className="text-[10px] text-zinc-500 mt-1">Badge evidenziato</div>
                      </div>

                      <div 
                        onClick={() => setAdForm({...adForm, promoTier: 'ultra'})}
                        className={`p-3 rounded-xl border text-center cursor-pointer transition relative overflow-hidden ${
                          adForm.promoTier === 'ultra' ? 'border-btc bg-btc/20 text-white shadow-lg shadow-btc/20' : 'border-dark-600 bg-dark-900 text-zinc-400'
                        }`}
                      >
                        <div className="font-bold text-sm text-btc">Ultra</div>
                        <div className="text-btc font-mono font-black mt-1">20 €</div>
                        <div className="text-[10px] text-zinc-400 mt-1">1 Mese in 1ª Pagina</div>
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-btc hover:bg-btc-hover text-black font-extrabold py-3 rounded-xl text-sm transition mt-4"
                  >
                    Invia Annuncio per Revisione Telegram
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= MODALE: FLUSSO DI ACQUISTO (PAGAMENTO BITCOIN) ================= */}
      {isBuyingModalOpen && selectedAd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-dark-800 border border-dark-600 rounded-2xl w-full max-w-lg p-6 relative shadow-2xl">
            <button 
              onClick={() => setIsBuyingModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {purchaseStep === 'pay' ? (
              <div>
                <div className="flex items-center space-x-2 text-btc font-mono text-xs font-bold mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>CASSA BITCOIN ANONIMBTC</span>
                </div>
                <h3 className="text-xl font-black text-white mb-1">
                  Paga {selectedAd.price} € in BTC
                </h3>
                <p className="text-xs text-zinc-400 mb-4">
                  Invia il pagamento Bitcoin all'indirizzo fisso di garanzia del marketplace.
                </p>

                {/* Box Indirizzo Fisso */}
                <div className="bg-dark-900 p-4 rounded-xl border border-btc/40 mb-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-zinc-400">Indirizzo Fisso di Deposito:</span>
                    <button 
                      onClick={handleCopyBtc}
                      className="text-xs text-btc hover:underline flex items-center space-x-1 font-mono"
                    >
                      {copiedBtc ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedBtc ? "Copiato!" : "Copia Indirizzo"}</span>
                    </button>
                  </div>

                  <div className="font-mono text-xs sm:text-sm text-zinc-100 bg-black/60 p-3 rounded border border-zinc-700 break-all select-all">
                    {FIXED_BTC_ADDRESS}
                  </div>

                  <div className="flex justify-between items-center text-xs font-mono pt-1">
                    <span className="text-zinc-400">Controvalore stimato:</span>
                    <span className="text-btc font-bold">{(selectedAd.price / 85000).toFixed(6)} BTC</span>
                  </div>
                </div>

                {/* Avviso Validità 7 Giorni */}
                <div className="bg-dark-700/60 p-3 rounded-lg border border-dark-600 text-[11px] text-zinc-300 space-y-1 mb-6">
                  <div className="flex items-center space-x-1 text-btc font-bold">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>L’indirizzo di pagamento è valido per 7 giorni!</span>
                  </div>
                  <p className="text-zinc-400">
                    Dopo il pagamento, conferma e invia una notifica al venditore nella pagina successiva!
                  </p>
                </div>

                <button 
                  onClick={() => setPurchaseStep('confirmed')}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold py-3 rounded-xl text-sm transition flex items-center justify-center space-x-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Conferma Pagamento Effettuato</span>
                </button>
              </div>
            ) : (
              /* Messaggio post-conferma */
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <RefreshCw className="w-6 h-6 animate-spin" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Transazione Registrata</h3>
                <p className="text-xs text-zinc-300 leading-relaxed mb-6 bg-dark-900 p-4 rounded-xl border border-dark-600">
                  In attesa delle conferme sulla blockchain, <strong>attendi 30 minuti prima di inviare la notifica di pagamento</strong>! 
                  Congratulazioni, l’annuncio è ora disponibile nella tua area personale.
                </p>
                <div className="flex gap-3 justify-center">
                  <button 
                    onClick={() => { setIsBuyingModalOpen(false); setSelectedAd(null); setActiveView('profile'); }}
                    className="bg-btc hover:bg-btc-hover text-black font-bold px-6 py-2.5 rounded-lg text-xs"
                  >
                    Vai all'Area Personale
                  </button>
                  <a 
                    href="https://t.me/gustavoeuro" 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-dark-700 hover:bg-dark-600 text-white font-bold px-4 py-2.5 rounded-lg text-xs flex items-center space-x-1.5"
                  >
                    <Send className="w-3.5 h-3.5 text-btc" />
                    <span>Notifica @gustavoeuro</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= PULSANTI FLOTTANTI "AIUTO" E "OPINIONE" ================= */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col space-y-2">
        <a 
          href="https://t.me/gustavoeuro" 
          target="_blank" 
          rel="noreferrer"
          className="bg-btc hover:bg-btc-hover text-black font-bold p-3 sm:px-4 sm:py-2.5 rounded-full shadow-2xl flex items-center space-x-2 text-xs transition transform hover:scale-105 active:scale-95"
          title="Assistenza diretta Telegram"
        >
          <HelpCircle className="w-4 h-4" />
          <span className="hidden sm:inline">{t.help}</span>
        </a>

        <button 
          onClick={() => setActiveView('contact')}
          className="bg-dark-800 hover:bg-dark-700 border border-dark-500 text-zinc-200 p-3 sm:px-4 sm:py-2 rounded-full shadow-2xl flex items-center space-x-2 text-xs transition"
          title="Invia opinione"
        >
          <MessageSquare className="w-4 h-4 text-btc" />
          <span className="hidden sm:inline">{t.feedback}</span>
        </button>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-dark-600/80 bg-dark-900 py-10 mt-12 text-zinc-500 text-xs font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-white font-bold tracking-wider">ANONIM<span className="text-btc">BTC</span></span>
            <span>•</span>
            <span>Zero-Trace Bitcoin Marketplace</span>
          </div>

          <div className="flex items-center space-x-6 text-zinc-400">
            <button onClick={() => setActiveView('rules')} className="hover:text-btc">Regole</button>
            <button onClick={() => setActiveView('contact')} className="hover:text-btc">Supporto</button>
            <a href="https://t.me/gustavoeuro" target="_blank" rel="noreferrer" className="hover:text-btc">Telegram Moderatore</a>
          </div>

          <div className="text-zinc-600">
            © 2026 AnonimBTC. No rights reserved. Freedom of exchange.
          </div>
        </div>
      </footer>

    </div>
  );
}
