/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Rocket, Star, Globe, Sun, BookOpen, AlertTriangle, CheckCircle, XCircle, Send, Award, ChevronRight, Lock, Unlock, ZoomIn, ZoomOut, Target, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const systemData = {
  sol: { name: 'El Sol', subtitle: 'Estrella Central', desc: 'El majestuoso centro del vecindario cósmico. Es una enorme estrella enana amarilla compuesta principalmente por hidrógeno y helio en combustión constante.', details: 'Masa: 99.8% del sistema | Temperatura: 5,500°C', color: 'from-amber-600 via-yellow-400 to-orange-300', size: 'w-14 h-14 sm:w-20 sm:h-20', icon: '☀️', stats: { temp: 100, size: 100, grav: 100, atmo: 0, surf: 0 }, info: { tipo: 'Estrella', superficie: 'Plasma', atmosfera: 'Corona solar', temperatura: 'Extremadamente alta', dato: 'Representa el 99.8% del sistema solar' } },
  mercurio: { name: 'Mercurio', subtitle: 'Planeta Rocoso', desc: 'El mensajero rápido, más cercano al Sol. Es el planeta más pequeño y sufre cambios de temperatura extremos.', details: 'Órbita: 88 días terrestres', color: 'from-slate-400 to-slate-600', size: 'w-3 h-3 sm:w-4 sm:h-4', icon: '🪨', stats: { temp: 80, size: 10, grav: 38, atmo: 5, surf: 90 }, info: { tipo: 'Rocoso', superficie: 'Rocosa y craterizada', atmosfera: 'Muy débil', temperatura: 'Extrema (día y noche)', dato: 'No tiene lunas' } },
  venus: { name: 'Venus', subtitle: 'Planeta Rocoso', desc: 'Infierno brillante, cubierto de nubes tóxicas. Su efecto invernadero lo hace el planeta más caliente.', details: 'Atmósfera: 96% CO2 | Superficie: 462°C', color: 'from-orange-400 to-orange-600', size: 'w-5 h-5 sm:w-6 sm:h-6', icon: '🪨', stats: { temp: 95, size: 45, grav: 90, atmo: 95, surf: 80 }, info: { tipo: 'Rocoso', superficie: 'Volcánica', atmosfera: 'Muy densa y tóxica', temperatura: 'Muy alta', dato: 'Es el planeta más caliente' } },
  tierra: { name: 'Tierra', subtitle: 'Planeta Rocoso', desc: 'Nuestro oasis azul. Es el único planeta conocido que alberga vida gracias a su agua líquida.', details: 'Agua Líquida: 71% | Lunas: 1 (La Luna)', color: 'from-blue-400 to-green-500', size: 'w-5 h-5 sm:w-7 sm:h-7', icon: '🌍', stats: { temp: 50, size: 50, grav: 100, atmo: 60, surf: 70 }, info: { tipo: 'Rocoso', superficie: 'Agua y tierra', atmosfera: 'Rica en oxígeno', temperatura: 'Moderada', dato: 'Único planeta con vida' } },
  marte: { name: 'Marte', subtitle: 'Planeta Rocoso', desc: 'El desierto rojo. Destaca por albergar el Monte Olimpo, el volcán más grande del sistema solar.', details: 'Gravedad: 38% de la Tierra | Lunas: 2', color: 'from-red-500 to-orange-700', size: 'w-4 h-4 sm:w-5 sm:h-5', icon: '🔴', stats: { temp: 30, size: 30, grav: 38, atmo: 20, surf: 85 }, info: { tipo: 'Rocoso', superficie: 'Polvo rojo', atmosfera: 'Delgada', temperatura: 'Fría', dato: 'Tiene volcanes gigantes' } },
  jupiter: { name: 'Júpiter', subtitle: 'Planeta Gaseoso', desc: 'Gigante masivo con una tormenta enorme conocida como la Gran Mancha Roja. Es el más grande.', details: 'Composición: Hidrógeno y Helio | Lunas: 95+', color: 'from-amber-600 to-orange-800', size: 'w-10 h-10 sm:w-12 sm:h-12', icon: '🌪️', stats: { temp: 20, size: 100, grav: 100, atmo: 100, surf: 0 }, info: { tipo: 'Gaseoso', superficie: 'No sólida', atmosfera: 'Gases turbulentos', temperatura: 'Muy fría', dato: 'Tiene la Gran Mancha Roja' } },
  saturno: { name: 'Saturno', subtitle: 'Planeta Gaseoso', desc: 'La joya cósmica rodeada por increíbles y brillantes anillos de hielo y roca.', details: 'Anillos principales: 7 | Lunas: 146', color: 'from-yellow-200 to-amber-500', size: 'w-8 h-8 sm:w-10 sm:h-10', icon: '🪐', rings: true, stats: { temp: 15, size: 85, grav: 90, atmo: 90, surf: 0 }, info: { tipo: 'Gaseoso', superficie: 'No sólida', atmosfera: 'Gases ligeros', temperatura: 'Muy fría', dato: 'Tiene anillos visibles' } },
  urano: { name: 'Urano', subtitle: 'Planeta Gaseoso', desc: 'Gigante de hielo azul claro que rota de manera inclinada, casi de "lado".', details: 'Temperatura: -224°C | Eje muy inclinado', color: 'from-cyan-200 to-blue-400', size: 'w-6 h-6 sm:w-8 sm:h-8', icon: '❄️', stats: { temp: 5, size: 60, grav: 89, atmo: 80, surf: 0 }, info: { tipo: 'Gaseoso', superficie: 'No sólida', atmosfera: 'Metano', temperatura: 'Extrema, -224°C', dato: 'Gira inclinado' } },
  neptuno: { name: 'Neptuno', subtitle: 'Planeta Gaseoso', desc: 'Reino de vientos supersónicos, un planeta oscuro, frío, tormentoso y muy distante.', details: 'Vientos: 2,100 km/h | Lunas: 16', color: 'from-blue-600 to-indigo-800', size: 'w-6 h-6 sm:w-7 sm:h-7', icon: '🌊', stats: { temp: 5, size: 55, grav: 95, atmo: 85, surf: 0 }, info: { tipo: 'Gaseoso', superficie: 'No sólida', atmosfera: 'Muy activa', temperatura: 'Extrema tormentosa', dato: 'Tiene tormentas intensas' } }
};

type PlanetKey = Exclude<keyof typeof systemData, 'sol'>;

const orbitalNodes: { id: PlanetKey, r: number, angle: number, duration: number }[] = [
  { id: 'mercurio', r: 18, angle: 45, duration: 40 },
  { id: 'venus', r: 28, angle: 180, duration: 60 },
  { id: 'tierra', r: 38, angle: 300, duration: 84 },
  { id: 'marte', r: 48, angle: 135, duration: 108 },
  { id: 'jupiter', r: 64, angle: 330, duration: 165 },
  { id: 'saturno', r: 78, angle: 75, duration: 225 },
  { id: 'urano', r: 88, angle: 210, duration: 300 },
  { id: 'neptuno', r: 96, angle: 15, duration: 390 },
];

const ProgressBar = ({ label, value, colorClass }: { label: string, value: number, colorClass: string }) => (
  <div className="flex items-center gap-2 text-xs w-full">
    <span className="w-24 font-bold text-slate-400 text-right shrink-0">{label}</span>
    <div className="flex-1 h-2.5 bg-slate-800/80 rounded-sm overflow-hidden border border-white/5 relative">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-full bg-gradient-to-r ${colorClass} shadow-[0_0_10px_currentColor]`}
      />
    </div>
  </div>
);

const CadetAvatar = ({ gender }: { gender: 'male' | 'female' }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id={`bg-${gender}`} x1="0" y1="0" x2="100" y2="100">
        <stop offset="0%" stopColor={gender === 'male' ? '#1e1b4b' : '#3b0764'} />
        <stop offset="100%" stopColor={gender === 'male' ? '#312e81' : '#6b21a8'} />
      </linearGradient>
      <linearGradient id={`suit-${gender}`} x1="0" y1="0" x2="0" y2="100">
        <stop offset="0%" stopColor={gender === 'male' ? '#4f46e5' : '#c026d3'} />
        <stop offset="100%" stopColor={gender === 'male' ? '#3730a3' : '#9333ea'} />
      </linearGradient>
      <linearGradient id="visor" x1="0" y1="0" x2="0" y2="100">
        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.1" />
      </linearGradient>
    </defs>
    
    <rect width="100" height="100" fill={`url(#bg-${gender})`} />
    
    {/* Shoulders / Spacesuit Body */}
    <path d="M10 100 C 10 60, 90 60, 90 100" fill={`url(#suit-${gender})`} stroke={gender === 'male' ? '#818cf8' : '#f0abfc'} strokeWidth="3" />
    <path d="M30 100 L45 75 L55 75 L70 100" fill="#0f172a" opacity="0.3" />
    <path d="M42 75 L58 75 L55 85 L45 85 Z" fill="#38bdf8" opacity="0.8" />
    
    {/* Neck */}
    <rect x="40" y="60" width="20" height="20" fill={gender === 'male' ? '#fed7aa' : '#fbcfe8'} />
    <path d="M40 70 L60 70" stroke="#000" strokeWidth="1" opacity="0.1" />

    {/* Female Hair Back */}
    {gender === 'female' && (
      <path d="M20 50 C 15 75, 20 90, 20 90 L80 90 C 80 90, 85 75, 80 50 Z" fill="#451a03" />
    )}
    
    {/* Face Base */}
    <path d="M30 40 C 30 15, 70 15, 70 40 C 70 65, 60 75, 50 75 C 40 75, 30 65, 30 40 Z" fill={gender === 'male' ? '#fed7aa' : '#fbcfe8'} />
    
    {/* Hair Front */}
    {gender === 'male' ? (
      <>
        <path d="M28 35 C 28 10, 72 10, 72 35 C 72 20, 28 20, 28 35 Z" fill="#1e293b" />
        <path d="M30 30 L35 22 L42 27 L50 18 L58 25 L65 20 L70 30 Z" fill="#1e293b" />
      </>
    ) : (
      <>
        <path d="M29 40 C 25 15, 75 15, 71 40 C 71 20, 29 20, 29 40 Z" fill="#451a03" />
        <path d="M45 18 C 30 25, 28 45, 28 45 C 28 45, 35 25, 50 22 Z" fill="#451a03" />
        <path d="M55 18 C 70 25, 72 45, 72 45 C 72 45, 65 25, 50 22 Z" fill="#451a03" />
      </>
    )}
    
    {/* Eyebrows & Eyes */}
    {gender === 'male' ? (
      <>
        <path d="M38 42 L46 44" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M62 42 L54 44" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="42" cy="48" r="3" fill="#0f172a" />
        <circle cx="58" cy="48" r="3" fill="#0f172a" />
      </>
    ) : (
      <>
        <path d="M38 44 Q 42 41 46 44" stroke="#451a03" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M62 44 Q 58 41 54 44" stroke="#451a03" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <circle cx="42" cy="49" r="3" fill="#0f172a" />
        <circle cx="58" cy="49" r="3" fill="#0f172a" />
        <path d="M39 48 L36 45 M61 48 L64 45" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
      </>
    )}
    
    {/* Mouth */}
    {gender === 'male' ? (
      <path d="M45 61 Q 50 65 55 61" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
    ) : (
      <path d="M45 61 Q 50 66 55 61" fill="none" stroke="#be185d" strokeWidth="2.5" strokeLinecap="round" />
    )}
    
    {/* Headset / Comm Device */}
    <rect x="26" y="45" width="6" height="14" rx="3" fill="#e2e8f0" />
    <rect x="68" y="45" width="6" height="14" rx="3" fill="#e2e8f0" />
    <circle cx="29" cy="52" r="2" fill={gender === 'male' ? '#38bdf8' : '#f472b6'} />
    <circle cx="71" cy="52" r="2" fill={gender === 'male' ? '#38bdf8' : '#f472b6'} />
    {gender === 'male' ? (
      <path d="M68 55 L58 60" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
    ) : (
      <path d="M32 55 L42 60" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
    )}

    {/* Helmet Open Visor glass */}
    <path d="M12 50 C 12 10, 88 10, 88 50 C 88 85, 75 90, 75 90 L25 90 C 25 90, 12 85, 12 50 Z" fill="none" stroke="#cbd5e1" strokeWidth="3" opacity="0.5" />
    <path d="M12 50 C 12 10, 88 10, 88 50 C 88 65, 80 70, 75 70 C 70 40, 30 40, 25 70 C 20 70, 12 65, 12 50 Z" fill="url(#visor)" />
    <path d="M25 70 C 30 40, 70 40, 75 70" fill="none" stroke="#7dd3fc" strokeWidth="2" />
    
    {/* Helmet Reflection */}
    <path d="M22 35 C 28 22, 45 18, 55 18" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
  </svg>
);

export default function App() {
  // Estado para Navegación Gamificada
  const [currentSlide, setCurrentSlide] = useState(0);
  const [unlockedSlides, setUnlockedSlides] = useState<number[]>([0]);

  // Estado para la Actividad Inicial (Foro)
  const [selectedPlanet, setSelectedPlanet] = useState('');
  const [forumResponse, setForumResponse] = useState('');
  const [forumSubmitted, setForumSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('sol'); // Para Archivos Cósmicos
  const [zoomLevel, setZoomLevel] = useState(1);
  const [resetKey, setResetKey] = useState(0);
  const [cadetGender, setCadetGender] = useState<'male' | 'female'>('male');
  const constraintsRef = useRef(null);
  const infoPanelRef = useRef<HTMLDivElement>(null);

  const handlePlanetClick = (id: string) => {
    setActiveTab(id);
    setTimeout(() => {
      infoPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  // Estado para la Autoevaluación
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [feedback, setFeedback] = useState<{ show: boolean, isCorrect: boolean, text: string } | null>(null);
  const [completionAnswer, setCompletionAnswer] = useState('');

  const unlockAndNext = (nextSlide: number) => {
    if (!unlockedSlides.includes(nextSlide)) {
      setUnlockedSlides(prev => [...prev, nextSlide]);
    }
    setCurrentSlide(nextSlide);
  };

  const handleForumSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPlanet && forumResponse.trim()) {
      setForumSubmitted(true);
      // Give them a moment to read success message before allowing to continue
    }
  };

  const quizQuestions = [
    {
      type: 'multiple',
      question: '¿Cuál de los siguientes planetas es gaseoso? 🪐',
      options: ['Mercurio', 'Marte', 'Júpiter', 'Venus'],
      answer: 'Júpiter',
      explanation: 'Júpiter es el gigante gaseoso más grande de nuestro sistema solar.'
    },
    {
      type: 'tf',
      question: 'Verdadero o Falso: El Sol es un planeta que nos da luz y calor. ☀️',
      options: ['Verdadero', 'Falso'],
      answer: 'Falso',
      explanation: 'El Sol no es un planeta, ¡es una estrella!'
    },
    {
      type: 'multiple',
      question: 'Los planetas rocosos y sólidos son los que están...',
      options: ['Más lejos del Sol', 'Más cerca del Sol', 'Fuera de la Vía Láctea', 'En el cinturón de asteroides'],
      answer: 'Más cerca del Sol',
      explanation: 'Mercurio, Venus, la Tierra y Marte son rocosos y están más próximos al Sol.'
    },
    {
      type: 'tf',
      question: 'Verdadero o Falso: Marte es conocido como el planeta rojo. 🔴',
      options: ['Verdadero', 'Falso'],
      answer: 'Verdadero',
      explanation: 'Se le llama el planeta rojo debido al óxido de hierro en su superficie.'
    },
    {
      type: 'completion',
      question: 'Completa la palabra: El planeta en el que vivimos se llama ________. 🌍',
      answer: 'tierra',
      explanation: 'La Tierra es el tercer planeta del sistema solar y el único con vida conocida.'
    }
  ];

  const handleAnswerSelect = (selectedOption: string) => {
    if (feedback) return;

    const isCorrect = selectedOption.toLowerCase() === quizQuestions[currentQuestion].answer.toLowerCase();
    
    setFeedback({
      show: true,
      isCorrect,
      text: isCorrect ? '¡Correcto, cadete! ' + quizQuestions[currentQuestion].explanation : '¡Cuidado! ' + quizQuestions[currentQuestion].explanation
    });

    if (isCorrect) setScore(prev => prev + 1);

    setTimeout(() => {
      setFeedback(null);
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setCompletionAnswer('');
      } else {
        setQuizCompleted(true);
      }
    }, 3500);
  };

  const handleCompletionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (completionAnswer.trim()) {
      handleAnswerSelect(completionAnswer.trim());
    }
  };

  const slideVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } }
  };

  const slides = [
    { id: 0, icon: <Rocket className="w-5 h-5" />, title: "Misión" },
    { id: 1, icon: <Star className="w-5 h-5" />, title: "Comunicaciones" },
    { id: 2, icon: <Sun className="w-5 h-5" />, title: "Archivos" },
    { id: 3, icon: <Award className="w-5 h-5" />, title: "Simulador" },
    { id: 4, icon: <BookOpen className="w-5 h-5" />, title: "Bitácora" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-purple-500/30 overflow-hidden flex flex-col relative">
      {/* Fondo animado de estrellas */}
      <div className="absolute inset-0 bg-stars opacity-50 pointer-events-none z-0"></div>
      
      {/* Navegación Gamificada Superior */}
      <div className="relative z-20 bg-slate-900/80 backdrop-blur-lg border-b border-white/10 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-400 font-bold">
            <Rocket className="w-6 h-6" /> 
            <span className="hidden sm:inline">Academia Galáctica</span>
          </div>
          
          <div className="flex gap-2 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth">
            {slides.map((s) => {
              const isUnlocked = unlockedSlides.includes(s.id);
              const isCurrent = currentSlide === s.id;
              
              return (
                <button
                  key={s.id}
                  disabled={!isUnlocked}
                  onClick={() => setCurrentSlide(s.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all shrink-0
                    ${isCurrent ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.5)]' : 
                      isUnlocked ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer' : 
                      'bg-slate-900 text-slate-600 opacity-50 cursor-not-allowed border border-slate-800'}
                  `}
                >
                  {isUnlocked ? s.icon : <Lock className="w-4 h-4" />}
                  <span className="hidden md:inline">{s.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contenedor Principal de Slides */}
      <div className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden p-6 pb-24">
        <div className="max-w-4xl mx-auto w-full h-full flex items-center justify-center min-h-[calc(100vh-160px)]">
          <AnimatePresence mode="wait">
            
            {/* --- SLIDE 0: PORTADA --- */}
            {currentSlide === 0 && (
              <motion.div key="slide0" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="w-full flex-1 flex flex-col justify-center py-4">
                <div className="text-center">
                  <div className="inline-block px-6 py-2 rounded-full bg-indigo-900/60 border border-indigo-400/50 text-indigo-200 text-sm md:text-base font-black tracking-widest mb-4 uppercase shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                    Universidad Estatal de Milagro (UNEMI)
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-indigo-200 to-fuchsia-300 drop-shadow-lg mb-4">
                    Misión Sistema Solar
                  </h1>
                  <h2 className="text-lg md:text-xl font-light text-indigo-200/80 mb-6 max-w-2xl mx-auto">
                    Exploradores del Universo ⭐
                  </h2>
                  
                  <div className="bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-indigo-500/20 inline-block text-left mb-6 shadow-xl max-w-3xl w-full mx-auto">
                    <p className="text-sm font-bold text-indigo-300 mb-2 border-b border-indigo-500/20 pb-2 uppercase tracking-wider flex items-center justify-center gap-2 text-center">
                       <Rocket className="w-4 h-4" /> Integrantes
                    </p>
                    <ul className="text-xs md:text-sm text-slate-300 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2 justify-items-start sm:justify-items-center">
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span> Kevin Axell Concha Regatto</li>
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-fuchsia-500 rounded-full"></span> Roberto Buestan Villaroel</li>
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span> Lelis Javier Muñoz Rios</li>
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Erika Rojas Palacios</li>
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span> Daniela Bernarda Solano Sánchez</li>
                    </ul>
                  </div>
                </div>
                
                <div className="glass-panel p-4 md:p-6 rounded-2xl mx-auto max-w-3xl bg-gradient-to-r from-indigo-900/40 to-fuchsia-900/40 border-l-4 border-l-indigo-400 mb-8 flex flex-col md:flex-row gap-6 items-center shadow-2xl">
                  <div className="flex flex-col items-center gap-3 shrink-0">
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-indigo-500 shadow-[0_0_25px_rgba(99,102,241,0.6)] bg-slate-800">
                      <CadetAvatar gender={cadetGender} />
                    </div>
                    <div className="flex bg-slate-900/90 p-1.5 rounded-xl border border-white/10 shadow-lg">
                      <button 
                        onClick={() => setCadetGender('male')}
                        className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${cadetGender === 'male' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                      >
                        Hombre
                      </button>
                      <button 
                        onClick={() => setCadetGender('female')}
                        className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${cadetGender === 'female' ? 'bg-fuchsia-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                      >
                        Mujer
                      </button>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-indigo-300 font-black text-xl mb-2 flex items-center gap-2">
                       <Star className="w-5 h-5 text-amber-400" /> ¡Bienvenido a bordo!
                    </h3>
                    <p className="text-base md:text-lg leading-relaxed italic text-slate-200">
                      "Eres <span className="font-bold text-white bg-indigo-500/30 px-1 rounded">{cadetGender === 'male' ? 'un cadete' : 'una cadete'}</span> de la Academia Galáctica. Tu misión de hoy es viajar a través de los rincones 
                      de nuestro sistema solar, recolectar datos cósmicos y probar tu valentía intelectual. 
                      ¡Prepara tus motores!" 🚀
                    </p>
                  </div>
                </div>

                {/* Objetivos debajo en grids pequeños */}
                <div className="text-center mb-6">
                  <h3 className="inline-block px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-900/30 text-indigo-300 font-bold text-sm tracking-widest uppercase">
                    Objetivos de la Misión
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left max-w-5xl mx-auto mb-10">
                  <div className="glass-panel p-5 rounded-2xl bg-slate-900/50 border-t-2 border-t-indigo-500 hover:-translate-y-1 transition-transform">
                    <div className="flex items-center gap-3 text-indigo-300 mb-3"><BookOpen className="w-5 h-5" /><h3 className="font-bold text-base uppercase tracking-wider">Cognitivo</h3></div>
                    <p className="text-slate-300 text-sm leading-relaxed">Identificar estructura del Sistema Solar y clasificar planetas por composición.</p>
                  </div>
                  <div className="glass-panel p-5 rounded-2xl bg-slate-900/50 border-t-2 border-t-fuchsia-500 hover:-translate-y-1 transition-transform">
                    <div className="flex items-center gap-3 text-fuchsia-300 mb-3"><Rocket className="w-5 h-5" /><h3 className="font-bold text-base uppercase tracking-wider">Procedimental</h3></div>
                    <p className="text-slate-300 text-sm leading-relaxed">Navegar y resolver retos interactivos analizando información científica.</p>
                  </div>
                  <div className="glass-panel p-5 rounded-2xl bg-slate-900/50 border-t-2 border-t-amber-500 hover:-translate-y-1 transition-transform">
                    <div className="flex items-center gap-3 text-amber-300 mb-3"><Globe className="w-5 h-5" /><h3 className="font-bold text-base uppercase tracking-wider">Actitudinal</h3></div>
                    <p className="text-slate-300 text-sm leading-relaxed">Valorar la inmensidad del universo y promover curiosidad.</p>
                  </div>
                </div>

                <div className="rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/10 h-[180px] md:h-[220px] relative w-full mb-4 max-w-4xl mx-auto group">
                  <img 
                    src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=2000&auto=format&fit=crop" 
                    alt="Ilustración cósmica" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] group-hover:bg-slate-900/20 group-hover:backdrop-blur-0 transition-all duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button 
                      onClick={() => unlockAndNext(1)}
                      className="group/btn flex items-center gap-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 hover:from-indigo-400 hover:via-purple-400 hover:to-fuchsia-400 text-white px-10 py-5 rounded-full font-black text-xl md:text-2xl shadow-[0_0_40px_rgba(168,85,247,0.6)] transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(168,85,247,0.8)]"
                    >
                      <span>INICIAR MISIÓN</span>
                      <ChevronRight className="w-8 h-8 group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* --- SLIDE 1: ACTIVIDAD INICIAL --- */}
            {currentSlide === 1 && (
              <motion.div key="slide1" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="w-full flex flex-col h-full justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-fuchsia-500 p-3 rounded-xl shadow-[0_0_15px_rgba(217,70,239,0.5)]"><Star className="w-6 h-6 text-white" /></div>
                  <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-300 to-white">Base de Comunicaciones</h2>
                </div>
                
                <div className="glass-panel p-6 rounded-3xl flex-1 flex flex-col md:flex-row gap-8">
                  
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-lg font-bold text-fuchsia-300 mb-3 flex items-center gap-2">
                      Transmisión Entrante de la Computadora Central:
                    </h3>
                    <p className="text-lg md:text-xl font-light mb-4 text-slate-200 bg-gradient-to-r from-fuchsia-950/50 to-transparent p-4 rounded-xl border-l-4 border-l-fuchsia-500">
                      "¿Si pudieras viajar a un planeta de nuestro Sistema Solar en este momento, cuál elegirías y por qué?" 🛸
                    </p>
                    
                    <div className="relative rounded-2xl overflow-hidden mt-2 flex-1 min-h-[150px] shadow-lg border border-fuchsia-500/20 hidden md:block">
                      <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop" alt="Planet observation" className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-xs font-mono text-fuchsia-300">SISTEMA_NAVEGACION_ACTIVO</div>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col bg-slate-900/40 p-4 rounded-2xl border border-white/5">
                    {!forumSubmitted ? (
                      <form onSubmit={handleForumSubmit} className="space-y-4 flex-1 flex flex-col">
                        <div>
                          <label className="block text-slate-300 text-sm font-bold mb-2">1. Selecciona tu Destino:</label>
                          <div className="grid grid-cols-4 gap-2">
                            {['Mercurio', 'Venus', 'Tierra', 'Marte', 'Júpiter', 'Saturno', 'Urano', 'Neptuno'].map(planet => (
                              <button
                                type="button"
                                key={planet}
                                onClick={() => setSelectedPlanet(planet)}
                                className={`py-2 px-1 rounded-xl text-xs font-bold transition-all border ${selectedPlanet === planet ? 'bg-fuchsia-600 border-fuchsia-400 shadow-[0_0_10px_rgba(217,70,239,0.5)] text-white' : 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-400 hover:text-slate-200 truncate'}`}
                              >
                                {planet}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col min-h-[120px]">
                          <label className="block text-slate-300 text-sm font-bold mb-2">2. ¿Por qué razón viajas allí?</label>
                          <textarea 
                            className="w-full flex-1 bg-slate-900/80 border border-slate-700/50 rounded-xl p-3 text-slate-200 text-sm focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-colors shadow-inner resize-none min-h-[80px]"
                            placeholder="Explícale a la computadora central el motivo de tu expedición..."
                            value={forumResponse}
                            onChange={(e) => setForumResponse(e.target.value)}
                            required
                          ></textarea>
                        </div>
                        <div className="flex justify-end pt-2 border-t border-white/5 mt-auto">
                          <button 
                            type="submit" 
                            disabled={!selectedPlanet || !forumResponse.trim()}
                            className="flex items-center gap-2 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white w-full justify-center py-3 rounded-xl font-bold text-sm transition-transform hover:-translate-y-1 shadow-lg disabled:opacity-50 disabled:hover:translate-y-0"
                          >
                            Enviar Transmisión <Send className="w-5 h-5"/>
                          </button>
                        </div>
                      </form>
                    ) : (
                      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-6 flex-1 flex flex-col justify-center items-center text-center">
                        <div className="bg-emerald-500/20 p-4 rounded-full border border-emerald-500/30">
                          <CheckCircle className="w-12 h-12 text-emerald-400" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-emerald-300 mb-2">¡Transmisión Recibida!</h4>
                          <p className="text-slate-300 text-sm">La Flota Estelar registró rumbo hacia <span className="font-bold text-fuchsia-400">{selectedPlanet}</span>.<br/>Archivos Cósmicos desbloqueados.</p>
                        </div>
                        <button 
                          onClick={() => unlockAndNext(2)}
                          className="group flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white w-full justify-center py-3 rounded-xl font-bold text-sm transition-all hover:-translate-y-1 shadow-[0_0_15px_rgba(79,70,229,0.4)]"
                        >
                          <span>Acceder a los Archivos</span>
                          <Unlock className="w-4 h-4 group-hover:block hidden" />
                          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* --- SLIDE 2: CONTENIDO --- */}
            {currentSlide === 2 && (
              <motion.div key="slide2" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="w-full flex flex-col h-full justify-center">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-amber-500 p-3 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.5)]"><Sun className="w-8 h-8 text-white" /></div>
                    <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-white">Archivos Cósmicos</h2>
                  </div>
                  <button 
                    onClick={() => unlockAndNext(3)}
                    className="group flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl font-bold text-sm transition-colors border border-slate-600"
                  >
                    <span>Ir al Simulador</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                
                <div className="flex-1 flex flex-col h-full pb-2 w-full max-w-6xl mx-auto">
                  
                  {/* Controles y Mensaje Superior */}
                  <div className="flex flex-col sm:flex-row justify-between items-center mb-3 gap-3">
                    <motion.div 
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                      className="bg-indigo-900/40 border border-indigo-500/50 px-5 py-2.5 rounded-full flex items-center gap-3 shadow-[0_0_15px_rgba(79,70,229,0.3)]"
                    >
                      <span className="text-xl">🚀</span>
                      <span className="text-indigo-100 text-sm md:text-base font-bold tracking-wide">Haz clic en los planetas para explorarlos y descubrir sus secretos</span>
                    </motion.div>
                    
                    <div className="flex bg-slate-900/80 p-1.5 rounded-xl border border-white/10 shrink-0 shadow-lg">
                      <button onClick={() => setZoomLevel(prev => Math.max(prev - 0.5, 0.5))} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"><ZoomOut className="w-5 h-5"/></button>
                      <button 
                        onClick={() => { setZoomLevel(1); setResetKey(prev => prev + 1); }} 
                        className="p-2 text-indigo-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors border-x border-white/5 mx-1"
                        title="Centrar mapa"
                      >
                        <Target className="w-5 h-5"/>
                      </button>
                      <button onClick={() => setZoomLevel(prev => Math.min(prev + 0.5, 3))} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"><ZoomIn className="w-5 h-5"/></button>
                    </div>
                  </div>

                  {/* Mapa Mental Espacial Estilizado / Canvas de Navegación */}
                  <div 
                    ref={constraintsRef}
                    className="flex-1 relative flex items-center justify-center min-h-[350px] md:min-h-[450px] mb-4 overflow-hidden rounded-3xl border-2 border-indigo-500/30 shadow-[0_0_50px_rgba(79,70,229,0.1)] bg-slate-950 cursor-grab active:cursor-grabbing solar-system-container"
                    style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(30, 27, 75, 0.6) 0%, rgba(15, 23, 42, 0.95) 100%)' }}
                  >
                    {/* Estilos para animación orbital */}
                    <style>{`
                      @keyframes orbit {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                      }
                      @keyframes counter-orbit {
                        from { transform: translate(-50%, -50%) rotate(0deg); }
                        to { transform: translate(-50%, -50%) rotate(-360deg); }
                      }
                      @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                      }
                      .orbit-node {
                        animation: orbit var(--duration) linear infinite;
                        animation-delay: var(--delay);
                      }
                      .counter-orbit-node {
                        animation: counter-orbit var(--duration) linear infinite;
                        animation-delay: var(--delay);
                      }
                      .spin-node {
                        animation: spin 80s linear infinite;
                      }
                    `}</style>
                    {/* Estrellas de fondo animadas (opcional) */}
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop')] bg-cover opacity-20 mix-blend-screen pointer-events-none"></div>

                    <motion.div 
                      key={resetKey}
                      drag
                      dragElastic={0}
                      dragMomentum={true}
                      animate={{ scale: zoomLevel }}
                      transition={{ scale: { type: "spring", stiffness: 300, damping: 30 } }}
                      className="absolute w-[8000px] h-[8000px] flex items-center justify-center cursor-grab active:cursor-grabbing z-10"
                    >
                      <div className="relative w-[500px] sm:w-[700px] md:w-[800px] aspect-square flex items-center justify-center pointer-events-none">
                      {/* Círculos Orbitales de Fondo */}
                      {orbitalNodes.map(n => (
                        <div key={`orbit-${n.id}`} 
                             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-indigo-300/10 pointer-events-none"
                             style={{ width: `${n.r * 2}%`, height: `${n.r * 2}%` }}
                        ></div>
                      ))}
                      
                      {/* El Sol */}
                      <motion.div 
                        animate={{ scale: [1, 1.05, 1] }} 
                        transition={{ scale: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20"
                      >
                        <div 
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) => { e.stopPropagation(); handlePlanetClick('sol'); }}
                          className={`spin-node pointer-events-auto cursor-pointer rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-orange-300 w-16 h-16 sm:w-24 sm:h-24 shadow-[0_0_50px_rgba(252,211,77,0.7)] flex items-center justify-center ${activeTab === 'sol' ? 'ring-4 ring-white' : 'hover:ring-2 hover:ring-white/50'}`}
                        >
                        </div>
                      </motion.div>

                      {/* Planetas en órbita */}
                      {orbitalNodes.map((node) => {
                        const p = systemData[node.id];
                        const isActive = activeTab === node.id;

                        return (
                          <div 
                            key={node.id}
                            className="absolute top-1/2 left-1/2 rounded-full pointer-events-none"
                            style={{ 
                              width: `${node.r * 2}%`, 
                              height: `${node.r * 2}%`, 
                              transform: 'translate(-50%, -50%)'
                            }}
                          >
                            <div className="w-full h-full orbit-node" style={{
                              '--duration': `${node.duration}s`,
                              '--delay': `-${(node.angle / 360) * node.duration}s`
                            } as React.CSSProperties}>
                              <div 
                                className="absolute top-0 left-1/2 pointer-events-auto cursor-pointer group flex flex-col items-center gap-1 sm:gap-2 counter-orbit-node"
                                style={{
                                  '--duration': `${node.duration}s`,
                                  '--delay': `-${(node.angle / 360) * node.duration}s`
                                } as React.CSSProperties}
                                onPointerDown={(e) => e.stopPropagation()}
                                onClick={(e) => { e.stopPropagation(); handlePlanetClick(node.id); }}
                              >
                              <div className={`relative ${p.size} rounded-full bg-gradient-to-br ${p.color} shadow-lg transition-all ${isActive ? 'ring-4 ring-white scale-125 drop-shadow-[0_0_20px_rgba(255,255,255,0.9)]' : 'group-hover:scale-125 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] hover:ring-2 hover:ring-white/50'}`}>
                                {p.rings && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[35%] border-t-[3px] border-b-[3px] border-amber-200/60 rounded-[50%] rotate-[-20deg]"></div>}
                              </div>
                              <span className={`absolute top-full mt-1 sm:mt-2 text-[10px] sm:text-[12px] font-black leading-none px-2.5 py-1.5 rounded-lg bg-slate-900/90 backdrop-blur-md border border-white/20 ${isActive ? 'text-white shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'text-slate-400 group-hover:text-slate-100'} whitespace-nowrap`}>
                                {p.name}
                              </span>
                            </div>
                           </div>
                          </div>
                         );
                       })}
                      </div>
                    </motion.div>
                  </div>

                  {/* Panel de Info Interactivo - Gamificado y Extendido */}
                  <div ref={infoPanelRef} className="glass-panel p-5 sm:p-6 md:p-8 rounded-3xl relative overflow-hidden shrink-0 border-t-4 border-indigo-500 shadow-[0_-10px_40px_rgba(79,70,229,0.15)] min-h-[220px] flex flex-col bg-slate-900/95 backdrop-blur-2xl mt-4">
                      <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg tracking-widest uppercase shadow-md z-10 block">
                        Infografía
                      </div>
                      <AnimatePresence mode="wait">
                        <motion.div 
                          key={activeTab} 
                          initial={{ opacity: 0, x: 20 }} 
                          animate={{ opacity: 1, x: 0 }} 
                          exit={{ opacity: 0, x: -20 }} 
                          transition={{ duration: 0.3 }}
                          className="flex flex-col h-full w-full"
                        >
                          {/* Banner de Descubrimiento */}
                          <div className="flex items-center gap-2 mb-4 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg w-fit shadow-inner">
                            <Star className="w-5 h-5 text-amber-400 animate-pulse" fill="currentColor" />
                            <span className="text-xs sm:text-sm font-bold text-indigo-200 tracking-wider">HAS DESCUBIERTO: <span className="text-white">{systemData[activeTab as keyof typeof systemData].name.toUpperCase()}</span></span>
                          </div>

                          <div className="flex flex-col lg:flex-row gap-8 w-full">
                            {/* Columna Izquierda: Identidad y Descripción */}
                            <div className="flex-1 flex flex-col gap-4">
                              <div className="flex items-center gap-5">
                                <div className="flex bg-gradient-to-br from-slate-800 to-slate-950 w-20 h-20 sm:w-24 sm:h-24 rounded-3xl border border-white/10 shrink-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] items-center justify-center relative overflow-hidden">
                                  <div className={`absolute inset-0 opacity-20 bg-gradient-to-tr ${systemData[activeTab as keyof typeof systemData].color}`}></div>
                                  <span className="text-5xl sm:text-6xl drop-shadow-xl relative z-10">{systemData[activeTab as keyof typeof systemData].icon}</span>
                                </div>
                                <div>
                                  <h3 className="text-3xl sm:text-4xl font-black text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
                                    {systemData[activeTab as keyof typeof systemData].name}
                                  </h3>
                                  <span className="text-xs sm:text-sm font-bold text-indigo-300 bg-indigo-950/80 px-4 py-1.5 rounded-full uppercase tracking-widest border border-indigo-500/30 inline-block mt-2 shadow-sm">
                                    {systemData[activeTab as keyof typeof systemData].subtitle}
                                  </span>
                                </div>
                              </div>
                              
                              <p className="text-slate-300 text-sm sm:text-base leading-relaxed bg-slate-800/30 p-4 rounded-2xl border border-white/5">
                                {systemData[activeTab as keyof typeof systemData].desc}
                              </p>

                              {/* Grid de Infografía */}
                              <div className="grid grid-cols-2 gap-3 mt-auto">
                                {Object.entries(systemData[activeTab as keyof typeof systemData].info).filter(([k]) => k !== 'dato').map(([k, v]) => (
                                  <div key={k} className="bg-slate-950/60 border border-white/5 p-3 rounded-xl flex flex-col shadow-inner">
                                    <span className="text-indigo-400 font-bold text-[10px] sm:text-xs uppercase tracking-wider mb-1 opacity-80">{k}</span>
                                    <span className="text-white text-xs sm:text-sm font-medium">{v}</span>
                                  </div>
                                ))}
                              </div>
                              
                              {/* Dato Curioso Destacado */}
                              <div className="bg-gradient-to-r from-fuchsia-950/40 to-purple-900/20 border-l-4 border-fuchsia-500 p-4 rounded-xl mt-2 shadow-sm flex items-start gap-3">
                                <div className="bg-fuchsia-500/20 p-2 rounded-lg shrink-0 mt-0.5"><Rocket className="w-4 h-4 text-fuchsia-400" /></div>
                                <div>
                                  <span className="block text-fuchsia-400 font-bold text-[10px] sm:text-xs uppercase tracking-widest mb-1">Dato Curioso Misión</span>
                                  <span className="text-slate-200 text-sm block">{systemData[activeTab as keyof typeof systemData].info.dato}</span>
                                </div>
                              </div>
                            </div>

                            {/* Columna Derecha: Panel de Estadísticas Gamificadas */}
                            <div className="flex-1 lg:max-w-md flex flex-col gap-5 bg-slate-950/80 p-6 rounded-3xl border border-white/10 shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)]">
                              <h4 className="text-center font-bold text-slate-300 uppercase tracking-widest text-xs sm:text-sm flex items-center justify-center gap-2 pb-3 border-b border-white/10">
                                <Award className="w-5 h-5 text-indigo-400" /> Escáner de Superficie Estelar
                              </h4>
                              <div className="space-y-4 flex-1 flex flex-col justify-center">
                                <ProgressBar label="Temperatura" value={systemData[activeTab as keyof typeof systemData].stats.temp} colorClass="from-orange-500 to-red-500" />
                                <ProgressBar label="Tamaño" value={systemData[activeTab as keyof typeof systemData].stats.size} colorClass="from-emerald-400 to-teal-500" />
                                <ProgressBar label="Gravedad" value={systemData[activeTab as keyof typeof systemData].stats.grav} colorClass="from-indigo-400 to-blue-500" />
                                <ProgressBar label="Atmósfera" value={systemData[activeTab as keyof typeof systemData].stats.atmo} colorClass="from-cyan-400 to-sky-500" />
                                <ProgressBar label="Superficie" value={systemData[activeTab as keyof typeof systemData].stats.surf} colorClass="from-stone-400 to-slate-500" />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}

            {/* --- SLIDE 3: AUTOEVALUACIÓN --- */}
            {currentSlide === 3 && (
              <motion.div key="slide3" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="w-full flex-1 flex flex-col justify-center">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 border-b border-indigo-500/30 pb-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-indigo-500 p-3 rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.5)]"><Target className="w-8 h-8 text-white" /></div>
                    <h2 className="text-3xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-white">Simulador de Vuelo</h2>
                  </div>
                  {!quizCompleted && (
                    <div className="bg-indigo-900/60 border border-indigo-500/40 p-3 rounded-xl max-w-sm">
                      <p className="text-sm text-indigo-100 flex items-start gap-2">
                        <Shield className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                        <span>Resuelve este simulador para potenciar la <strong>capacidad de los escudos</strong> de tu nave antes de adentrarte en el espacio profundo.</span>
                      </p>
                    </div>
                  )}
                </div>
                
                <div 
                  className="glass-panel p-6 md:p-8 border-t-4 border-indigo-500 rounded-3xl relative overflow-hidden flex-1 flex flex-col justify-center"
                  style={{ 
                    backgroundImage: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.92), rgba(15, 23, 42, 0.98)), url("https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=1200&auto=format&fit=crop")', 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center' 
                  }}
                >
                  {!quizCompleted ? (
                    <div className="w-full h-full flex flex-col justify-center">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
                        <div className="flex items-center gap-3">
                           <span className="text-xs font-bold text-indigo-300 bg-indigo-900/50 px-3 py-1 rounded-full uppercase tracking-wider border border-indigo-500/30">
                            Misión {currentQuestion + 1} de {quizQuestions.length}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-slate-300">Escudo:</span>
                          <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-400 transition-all duration-500" style={{ width: `${(score / quizQuestions.length) * 100}%` }}></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 flex flex-col justify-center max-w-3xl mx-auto w-full">
                        <motion.h3 
                          key={`q-${currentQuestion}`} 
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
                          className="text-2xl md:text-3xl font-medium mb-8 text-white leading-tight text-center"
                        >
                          {quizQuestions[currentQuestion].question}
                        </motion.h3>

                        {quizQuestions[currentQuestion].type !== 'completion' ? (
                          <div className="grid sm:grid-cols-2 gap-3">
                            {quizQuestions[currentQuestion].options?.map((option, index) => (
                              <button
                                key={index}
                                onClick={() => handleAnswerSelect(option)}
                                disabled={feedback !== null}
                                className="glass-panel !bg-slate-800/60 hover:!bg-indigo-600/80 p-4 rounded-xl text-left font-medium text-base transition-all hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(79,70,229,0.2)] disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:!bg-slate-800/60 border border-white/5 disabled:cursor-not-allowed group"
                              >
                                <span className="group-hover:text-white transition-colors">{option}</span>
                              </button>
                            ))}
                          </div>
                        ) : (
                          <form onSubmit={handleCompletionSubmit} className="flex flex-col sm:flex-row gap-3">
                            <input 
                              type="text" 
                              value={completionAnswer}
                              onChange={(e) => setCompletionAnswer(e.target.value)}
                              disabled={feedback !== null}
                              placeholder="Teclea la respuesta secreta..."
                              className="flex-1 bg-slate-900/80 border-2 border-slate-700/50 rounded-xl p-4 text-lg text-slate-100 focus:outline-none focus:border-indigo-500 disabled:opacity-50 transition-colors shadow-inner"
                              autoFocus
                            />
                            <button 
                              type="submit"
                              disabled={feedback !== null || !completionAnswer.trim()}
                              className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white px-6 py-4 rounded-xl font-bold text-base transition-colors flex items-center justify-center gap-2"
                            >
                              Verificar <CheckCircle className="w-5 h-5"/>
                            </button>
                          </form>
                        )}
                      </div>

                      {/* Toast de Feedback Animado */}
                      <AnimatePresence>
                        {feedback && (
                          <motion.div 
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            className={`mt-6 p-4 rounded-xl flex items-center gap-4 max-w-3xl mx-auto w-full ${feedback.isCorrect ? 'bg-emerald-900/50 border-2 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.2)]' : 'bg-red-900/50 border-2 border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.2)]'}`}
                          >
                            <div className={`p-2 rounded-full ${feedback.isCorrect ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
                              {feedback.isCorrect ? <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0" /> : <XCircle className="w-6 h-6 text-red-400 shrink-0" />}
                            </div>
                            <p className={`font-medium text-base md:text-lg ${feedback.isCorrect ? 'text-emerald-100' : 'text-red-100'}`}>
                              {feedback.text}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex-1 flex flex-col items-center justify-center text-center py-4 w-full">
                      <div className="relative">
                        <div className="absolute inset-0 bg-emerald-500/20 blur-[30px] rounded-full"></div>
                        <Shield className="w-24 h-24 text-emerald-400 mx-auto mb-4 relative z-10 drop-shadow-[0_0_20px_rgba(52,211,153,0.5)]" />
                      </div>
                      <h3 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 mb-4 pb-1">
                        ¡Escudos Potenciados!
                      </h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 w-full max-w-lg mx-auto">
                        <div className="bg-slate-900/50 border border-indigo-500/30 p-4 rounded-2xl flex flex-col items-center">
                          <p className="text-slate-400 uppercase tracking-widest text-xs font-bold mb-1">Precisión General</p>
                          <p className="text-3xl font-mono font-bold text-white"><span className="text-indigo-400">{score}</span> <span className="text-xl text-slate-500">/ {quizQuestions.length}</span></p>
                        </div>
                        <div className="bg-slate-900/50 border border-emerald-500/30 p-4 rounded-2xl flex flex-col items-center">
                          <p className="text-slate-400 uppercase tracking-widest text-xs font-bold mb-1">Capacidad de Escudo</p>
                          <p className="text-3xl font-mono font-bold text-emerald-400">{Math.round((score / quizQuestions.length) * 100)}%</p>
                        </div>
                      </div>

                      <div className="bg-slate-800/80 border border-white/10 p-5 rounded-2xl mb-6 w-full max-w-lg mx-auto shadow-inner text-left">
                        <p className="text-sm text-slate-400 uppercase tracking-wider font-bold mb-2 flex items-center gap-2"><Award className="w-4 h-4 text-yellow-400" /> Rango de Escudo Obtenido</p>
                        <p className="text-xl font-bold text-white mb-2">
                          {score === quizQuestions.length ? 'Rango Divino - Escudo Tipo A (Absoluto)' :
                           score >= quizQuestions.length * 0.75 ? 'Rango Élite - Escudo Tipo B (Avanzado)' :
                           score >= quizQuestions.length * 0.5 ? 'Rango Recluta - Escudo Tipo C (Básico)' :
                           'Rango Crítico - Escudo Dañado'}
                        </p>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          Tu nave ahora cuenta con esta capacidad de defensa y la seguridad de la tripulación está garantizada en base a tus conocimientos cósmicos. Has desbloqueado el paso final.
                        </p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button 
                          onClick={() => {
                            setCurrentQuestion(0);
                            setScore(0);
                            setQuizCompleted(false);
                            setFeedback(null);
                          }}
                          className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-bold transition-colors border border-slate-600 text-sm"
                        >
                          Repetir Prueba
                        </button>
                        <button 
                          onClick={() => unlockAndNext(4)}
                          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-6 py-3 rounded-xl font-bold text-base shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-transform hover:-translate-y-1 flex items-center gap-2"
                        >
                          Ir a la Bitácora Final <Unlock className="w-5 h-5"/>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* --- SLIDE 4: REFLEXIÓN Y REFERENCIAS --- */}
            {currentSlide === 4 && (
              <motion.div key="slide4" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="w-full flex-1 flex flex-col justify-center">
                <div className="relative overflow-hidden bg-gradient-to-r from-emerald-900/40 via-teal-900/40 to-cyan-900/40 rounded-[2rem] border border-emerald-500/40 p-8 md:p-12 text-center shadow-[0_0_50px_rgba(52,211,153,0.2)] group mb-8">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop')] bg-cover opacity-10 mix-blend-screen pointer-events-none transition-opacity duration-1000 group-hover:opacity-30"></div>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/20 blur-[100px] rounded-full pointer-events-none"></div>
                  
                  <div className="relative z-10 w-full flex flex-col items-center">
                    <motion.div 
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="flex justify-center mb-6"
                    >
                      <div className="p-4 bg-emerald-500/20 rounded-full border border-emerald-400/50 shadow-[0_0_30px_rgba(52,211,153,0.4)]">
                        <CheckCircle className="w-16 h-16 text-emerald-400" />
                      </div>
                    </motion.div>
                    <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-white to-cyan-300 mb-4 uppercase tracking-widest text-center drop-shadow-lg">
                      Misión Completada
                    </h3>
                    <p className="text-slate-200 text-base md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto text-center leading-relaxed font-light">
                      El simulador de vuelo ha registrado exitosamente tus resultados. Tus conocimientos ahora forman parte del núcleo de datos de la <strong className="text-emerald-300">Academia Galáctica</strong>.
                    </p>
                    <div className="inline-flex items-center gap-4 px-6 py-3 bg-slate-950/80 rounded-full border border-emerald-500/50 text-emerald-300 text-sm md:text-base font-mono shadow-inner shadow-emerald-500/20">
                      <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_12px_rgba(52,211,153,0.9)]"></span>
                      SISTEMA DESCONECTADO EXITOSAMENTE
                    </div>
                  </div>
                </div>

                <div className="glass-panel rounded-3xl bg-slate-900 border-l-4 border-l-indigo-500 shadow-2xl relative flex-1 flex flex-col overflow-hidden">
                  
                  {/* Decorative Banner Image */}
                  <div className="h-32 md:h-48 w-full relative">
                    <img src="https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=1200&auto=format&fit=crop" alt="Space tech abstract" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                    <div className="absolute bottom-4 left-6 md:left-8 flex items-center gap-3">
                      <div className="bg-indigo-500/20 backdrop-blur-sm p-3 rounded-xl border border-indigo-500/30">
                        <BookOpen className="w-6 h-6 text-indigo-300" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-white drop-shadow-md">El Rol de la IA en la Educación</h3>
                    </div>
                  </div>
                  
                  <div className="p-6 md:p-8 flex-1 flex flex-col md:flex-row gap-8">
                    
                    {/* Left Column - Riesgos */}
                    <div className="flex-1 flex flex-col relative">
                      <div className="absolute -left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500/50 to-transparent rounded-full hidden md:block"></div>
                      <p className="text-sm font-bold text-red-300/80 mb-3 flex items-start gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-400 mt-1.5 shrink-0"></span>
                        <span>¿Qué desafíos éticos encontramos al usar IA para generar contenido educativo?</span>
                      </p>
                      <div className="bg-slate-950/50 p-5 rounded-2xl border border-white/5 shadow-inner text-sm text-slate-300 leading-relaxed flex-1">
                        Al usar IA generativa para construir el OVA, el principal desafío ético fue verificar que la información producida fuera precisa, pertinente y libre de sesgos. Aunque la IA ayudó a organizar contenidos, imágenes e ideas gamificadas, sus respuestas podían simplificar demasiado algunos conceptos o presentar datos sin suficiente contexto. Por ello, fue necesario revisar, contrastar y adaptar la información antes de integrarla al recurso. UNESCO (2023) advierte que el uso educativo de la IA generativa requiere validación ética y pedagógica, considerando privacidad, inclusión, equidad y diversidad cultural. En este sentido, la IA no debe asumirse como fuente definitiva, sino como apoyo inicial que exige análisis crítico, especialmente cuando se diseña material para estudiantes.
                      </div>
                    </div>
                    
                    {/* Right Column - Rol Docente */}
                    <div className="flex-1 flex flex-col relative">
                      <div className="absolute -left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500/50 to-transparent rounded-full hidden md:block"></div>
                      <p className="text-sm font-bold text-indigo-300/80 mb-3 flex items-start gap-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-400 mt-1.5 shrink-0"></span>
                        <span>¿Cómo fue crucial el rol del maestrante/docente para asegurar la calidad y fiabilidad del OVA?</span>
                      </p>
                      <div className="bg-indigo-950/20 p-5 rounded-2xl border border-indigo-500/20 shadow-inner text-sm text-slate-300 leading-relaxed flex-1">
                        El rol del maestrante/docente fue crucial porque permitió transformar una producción automatizada en un recurso educativo con intención pedagógica. La IA generó ideas, textos e interacciones, pero fue necesario seleccionar contenidos adecuados, corregir errores, simplificar explicaciones, organizar la navegación y asegurar que la gamificación respondiera a objetivos de aprendizaje. Kasneci et al. (2023) señalan que los modelos de lenguaje en educación requieren competencias y alfabetización crítica para comprender sus limitaciones y fragilidades. Por tanto, el docente no es reemplazado por la IA: actúa como curador, diseñador y garante de calidad. Su intervención asegura que el OVA sea claro, fiable, accesible y coherente con el aprendizaje esperado.
                      </div>
                    </div>
                    
                  </div>

                  <div className="bg-slate-950 p-6 md:px-8 flex flex-col justify-between gap-8 border-t border-white/5">
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-400 mb-4 uppercase tracking-widest text-[10px] flex items-center gap-2">
                         Referencias APA 7
                      </h4>
                      <ul className="space-y-4 text-slate-500 text-[11px] md:text-xs">
                        <li className="pl-4 -indent-4">
                          UNESCO. (2023). <em>Guidance for generative AI in education and research</em>. UNESCO. <a href="https://unesdoc.unesco.org/ark:/48223/pf0000386693" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline break-all">https://unesdoc.unesco.org/ark:/48223/pf0000386693</a>
                        </li>
                        <li className="pl-4 -indent-4">
                          Kasneci, E., Sessler, K., Küchemann, S., Bannert, M., Dementieva, D., Fischer, F., Gasser, U., Groh, G., Günnemann, S., Hüllermeier, E., Krusche, S., Kutyniok, G., Michaeli, T., Nerdel, C., Pfeffer, J., Poquet, O., Sailer, M., Schmidt, A., Seidel, T., Stadler, M., Weller, J., Kuhn, J., &amp; Kasneci, G. (2023). ChatGPT for good? On opportunities and challenges of large language models for education. <em>Learning and Individual Differences</em>, 103, 102274. <a href="https://doi.org/10.1016/j.lindif.2023.102274" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline break-all">https://doi.org/10.1016/j.lindif.2023.102274</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}


