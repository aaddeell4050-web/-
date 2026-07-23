/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import AdelLogo from './assets/images/adel_logo_a_1781790033630.jpg';

import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

import React, { useState, useEffect, useRef, ReactNode, FormEvent, InputHTMLAttributes } from 'react';
import { motion, AnimatePresence, useInView, animate, useMotionValue, useTransform } from 'motion/react';
import {
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  CreditCard, 
  TrendingUp, 
  CheckCircle2, 
  ArrowLeft,
  Mail,
  Scale,
  Lock,
  ChevronRight,
  Banknote,
  MapPin,
  User,
  Star,
  Clock,
  Zap,
  X,
  Check,
  AlertTriangle,
  Menu,
  Wallet,
  Landmark,
  Gift
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import useEmblaCarousel from 'embla-carousel-react';
// heroGraphic removed - using static public asset for SEO persistence


const CONTACT_NUMBER = "0555381525";
const WHATSAPP_URL = `https://wa.me/966${CONTACT_NUMBER.substring(1)}?text=${encodeURIComponent('السلام عليكم، أرغب في الاستفسار عن خدمات تسديد القروض')}`;


const track = (event: string, action?: string) => {
  // @ts-ignore
  window.dataLayer = window.dataLayer || [];
  // @ts-ignore
  window.dataLayer.push({
    event: event,
    page_path: action || window.location.pathname,
  });
};

function PageTracker() {
  const location = useLocation();
  useEffect(() => {
    track('view_content', location.pathname);
  }, [location.pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <PageTracker />
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </Router>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, filter: 'blur(12px)', scale: 0.96 }}
        animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
        exit={{ opacity: 0, filter: 'blur(8px)', scale: 1.04 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

// --- Components ---

function Layout({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Scroll to top on route change
    window.scrollTo(0, 0); 
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  return (
    <div className="min-h-screen bg-slate-50 font-tajawal selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden flex flex-col relative z-0">
      {/* Global Background Elements from Hero, now applied to the whole site */}
      <div className="fixed top-0 right-0 w-full md:w-1/2 h-screen bg-gradient-to-l from-blue-900 to-transparent -z-10 pointer-events-none opacity-[0.03]"></div>
      <div className="fixed top-0 left-0 w-full md:w-1/2 h-screen bg-gradient-to-r from-yellow-500 to-transparent -z-10 pointer-events-none opacity-5"></div>
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-blue-900/5 rounded-full -mr-64 -mt-64 blur-3xl -z-10 pointer-events-none"></div>
      
      {/* Navbar */}
      <nav 
        className={`fixed top-4 left-4 right-4 max-w-7xl mx-auto z-50 transition-all duration-500 ease-in-out h-20 flex items-center px-6 md:px-12 border rounded-2xl md:rounded-3xl transform-gpu ${
          scrolled ? 'bg-white/80 backdrop-blur-[40px] border-slate-200 shadow-sm' : 'bg-transparent border-transparent'
        }`}
        style={{ willChange: 'background-color, backdrop-filter' }}
      >
        <div className="container mx-auto flex justify-between items-center text-right">
          <Link to="/" className="flex items-center gap-2 md:gap-3 group">
            <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-md overflow-hidden group-hover:scale-110 transition-transform animate-shimmer-slow">
              <div className="relative w-full h-full">
                  <img src={AdelLogo} alt="عادل السداد" fetchPriority="high" decoding="sync" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-blue-950 mix-blend-color pointer-events-none"></div>
                </div>
            </div>
            <span className="text-base md:text-lg font-bold tracking-tight text-slate-800 block group-hover:text-blue-900 transition-colors">
              عادل <span className="text-blue-800">السداد</span>
            </span>
          </Link>
          
          <div className="flex items-center gap-2 md:gap-4">
            <button onClick={() => setMenuOpen(!menuOpen)} aria-label="فتح القائمة" aria-expanded={menuOpen} aria-controls="mobile-menu" className="lg:hidden p-2 bg-blue-50 border border-blue-100 rounded-xl text-blue-900 hover:bg-blue-100 transition-colors shadow-sm">
               <Menu size={18} strokeWidth={2.5} />
            </button>
            <div className="hidden lg:flex items-center gap-6 text-slate-600 font-bold ml-8">
              <Link to="/" className="hover:text-blue-900 transition-colors">الرئيسية</Link>
              <Link to="/services" className="hover:text-blue-900 transition-colors">خدماتنا</Link>
              <Link to="/privacy" className="hover:text-blue-900 transition-colors">سياسة الخصوصية</Link>
              <Link to="/terms" className="hover:text-blue-900 transition-colors">شروط الخدمة</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <motion.div 
        initial={false}
        animate={{ 
          opacity: menuOpen ? 1 : 0, 
          y: menuOpen ? 0 : -10,
          pointerEvents: menuOpen ? 'auto' : 'none',
          visibility: menuOpen ? 'visible' : 'hidden'
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed inset-0 z-[60] bg-white pt-24 px-6 flex flex-col gap-6 text-right"
      >
         <button onClick={() => setMenuOpen(false)} aria-label="إغلاق القائمة" className="absolute top-6 left-6 p-2 bg-blue-50 border border-blue-100 rounded-xl text-blue-900 hover:bg-blue-100 transition-colors shadow-sm">
               <X size={18} strokeWidth={2.5} />
            </button>
         
         {/* Logo and Name in Mobile Menu */}
             <div className="flex items-center gap-3 mb-4 justify-start">
               <div className="w-10 h-10 flex items-center justify-center rounded-md overflow-hidden shadow-lg shadow-blue-800/40">
                 <div className="relative w-full h-full">
                  <img src={AdelLogo} alt="عادل السداد" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-blue-950 mix-blend-color pointer-events-none"></div>
                </div>
               </div>
               <span className="text-xl font-bold tracking-tight text-slate-800">
                 عادل <span className="text-blue-800">السداد</span>
               </span>
             </div>

             <Link onClick={() => setMenuOpen(false)} to="/" className="text-xl font-medium text-slate-800">الرئيسية</Link>
             <Link onClick={() => setMenuOpen(false)} to="/services" className="text-xl font-medium text-slate-800">خدماتنا</Link>
             <Link onClick={() => setMenuOpen(false)} to="/privacy" className="text-xl font-medium text-slate-800">سياسة الخصوصية</Link>
             <Link onClick={() => setMenuOpen(false)} to="/terms" className="text-xl font-medium text-slate-800">شروط الخدمة</Link>
             <div className="flex flex-col gap-4 mt-6">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => { track('whatsapp_click'); setMenuOpen(false); }} className="relative overflow-hidden bg-[#25D366] text-white p-4 rounded-xl text-center font-bold animate-shimmer-slow">واتساب</a>
                <a href={`tel:${CONTACT_NUMBER}`} onClick={() => { track('call_click'); setMenuOpen(false); }} className="relative overflow-hidden bg-blue-900 text-white p-4 rounded-xl text-center font-bold animate-shimmer-slow">اتصال</a>
             </div>
          </motion.div>

      <main className="flex-grow pt-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 text-slate-400 px-6 md:px-12">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-6 text-right mb-8">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-md overflow-hidden flex items-center justify-center">
                  <div className="relative w-full h-full">
                  <img src={AdelLogo} alt="عادل السداد" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-blue-950 mix-blend-color pointer-events-none"></div>
                </div>
                </div>
                <span className="text-xl font-bold text-white tracking-tight">عادل السداد</span>
              </div>
              <p className="leading-relaxed text-sm font-medium">
                شريكك المالي الموثوق في المملكة العربية السعودية لسداد القروض مع عادل السداد.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">روابط سريعة</h4>
              <ul className="space-y-4 text-sm">
                <li><Link to="/" className="hover:text-white active:text-white focus:text-white transition-colors">الرئيسية</Link></li>
                <li><Link to="/services" className="hover:text-white active:text-white focus:text-white transition-colors">خدماتنا</Link></li>
                <li><Link to="/contact" className="hover:text-white active:text-white focus:text-white transition-colors">اتصل بنا</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">قانوني</h4>
              <ul className="space-y-4 text-sm">
                <li><Link to="/privacy" className="hover:text-white active:text-white focus:text-white transition-colors">سياسة الخصوصية</Link></li>
                <li><Link to="/terms" className="hover:text-white active:text-white focus:text-white transition-colors">شروط الخدمة</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">تواصل معنا</h4>
              <div className="flex flex-col gap-3 font-medium text-sm text-slate-300">
                <a href={`tel:${CONTACT_NUMBER}`} onClick={() => track('call_click')} className="flex items-center gap-2 text-slate-400 hover:text-blue-500 active:text-blue-500 focus:text-blue-500 transition-colors">
                    <Phone className="w-4 h-4" />
                    <span>اتصال: <span dir="ltr">{CONTACT_NUMBER}</span></span>
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => track('whatsapp_click')} className="flex items-center gap-2 text-slate-400 hover:text-[#25D366] active:text-[#25D366] focus:text-[#25D366] transition-colors">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.148-.67-1.613-.918-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.974c-.002 5.45-4.436 9.884-9.885 9.884z"></path>
                    </svg>
                    واتساب: {CONTACT_NUMBER}
                </a>
                <div className="flex items-center gap-2 text-slate-300">
                    <MapPin className="w-4 h-4" />
                    <span>المملكة العربية السعودية</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                    <Clock className="w-4 h-4" />
                    <span>الأحد - الخميس، 8 ص - 12 م</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-8 text-center text-xs font-medium uppercase tracking-[0.2em] flex flex-col md:flex-row items-center justify-center gap-4">
            <div>
              &copy; {new Date().getFullYear()} عادل السداد. جميع الحقوق محفوظة
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Buttons */}
      <div className="fixed bottom-8 left-8 flex flex-col gap-6 z-[99] gpu-accelerate">
        <div className="relative group">
          <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75" style={{ animationDuration: '2.5s' }}></div>
          <a 
            href={`tel:${CONTACT_NUMBER}`}
            onClick={() => track('call_click')}
            className="relative flex items-center justify-center bg-blue-500 text-white p-4 rounded-full shadow-2xl shadow-blue-500/40 hover:bg-blue-600 transition-transform hover:scale-110 active:scale-90"
          >
            <Phone className="w-6 h-6" />
          </a>
        </div>
        <div className="relative group">
          <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-75" style={{ animationDuration: '2.5s' }}></div>
          <a 
            href={WHATSAPP_URL}
            target="_blank" rel="noopener noreferrer"
            aria-label="تواصل معنا عبر واتساب"
            onClick={() => track('whatsapp_click')}
            className="relative flex items-center justify-center bg-[#25D366] text-white p-4 rounded-full shadow-2xl shadow-[#25D366]/40 hover:bg-[#128C7E] transition-transform hover:scale-110 active:scale-90"
          >
            <FaWhatsapp size={24} color="white" />
          </a>
        </div>
      </div>
    </div>
  );
}


const testimonialsData = [
  { name: "خلود الغامدي", city: "جدة", text: "تعامل رائع وسرعة في الإنجاز، سددوا لي قرضي في وقت قياسي.", time: "قبل يوم" },
  { name: "عايض القحطاني", city: "الرياض", text: "أفضل مكتب تسديد قروض تعاملت معه، فريق محترف جداً.", time: "قبل ٣ أيام" },
  { name: "خالد المطيري", city: "خميس مشيط", text: "شكراً لكم على حل مشكلة سمة التي كانت تمنعني من التمويل.", time: "قبل أسبوع" },
  { name: "يوسف البقمي", city: "مكة", text: "صدق وأمانة وسرعة، أنصح الجميع بالتعامل معهم.", time: "قبل شهر" },
  { name: "عبدالله السهلي", city: "الدمام", text: "ساعدوني في توحيد التزاماتي بقسط واحد مريح جداً.", time: "قبل شهرين" },
  { name: "فيصل الحربي", city: "المدينة المنورة", text: "خدمة متميزة وشفافية في التعامل من البداية للنهاية.", time: "قبل ٣ أشهر" },
  { name: "هشام العتيبي", city: "تبوك", text: "تم رفع إيقاف الخدمات عني في وقت قصير جداً.", time: "قبل ٤ أشهر" },
  { name: "طارق العنزي", city: "عرعر", text: "استخرجت سيولة نقدية جديدة بفضل جهودهم الملموسة.", time: "قبل ٥ أشهر" },
  { name: "طلال السبيعي", city: "الخفجي", text: "أقل هامش ربح حصلت عليه كان من خلال هذا المكتب الموقر.", time: "قبل ٦ أشهر" },
  { name: "احمد الرشيدي", city: "حائل", text: "تجربة ممتازة وحلول تمويلية تناسب احتياجي الفعلي.", time: "قبل أسبوعين" },
  { name: "حسن البارقي", city: "أبها", text: "فريق متعاون جداً وسهولة في التواصل عبر الواتساب.", time: "قبل ٥ أيام" },
  { name: "محمد العبدالله", city: "الطائف", text: "تم سداد القرض القديم واستخراج قرض جديد بسهولة.", time: "قبل ٤ أيام" },
  { name: "سعد الدوسري", city: "الخرج", text: "احترافية عالية وتخليص للمعاملات في يوم واحد.", time: "قبل أسبوع" },
  { name: "فاطمة الشهراني", city: "بيشة", text: "تجاوب سريع واهتمام بتفاصيل العميل. شكراً لكم.", time: "قبل أسبوعين" },
  { name: "فهد العتيبي", city: "عفيف", text: "مكتب ثقة وخدمة سريعة في تسديد المتعثرات.", time: "قبل شهر" },
  { name: "سامي الشمري", city: "حفر الباطن", text: "من أفضل المكاتب التي تقدم حلول تمويلية مرنة.", time: "قبل شهر ونصف" },
  { name: "نورة القحطاني", city: "الرياض", text: "سرعة في الإنجاز وخدمة عملاء راقية.", time: "قبل شهرين" },
  { name: "بندر الجهني", city: "ينبع", text: "أنجزوا لي معاملتي بدون أي تعقيد. أنصح بهم وبشدة.", time: "قبل ٤ أشهر" },
  { name: "عبدالرحمن الزهراني", city: "الباحة", text: "مصداقية عالية وأقل نسبة ربح. بارك الله فيكم.", time: "قبل ٥ أشهر" },
];

function TestimonialsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section id="testimonials" className="py-10 px-6 md:px-8 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8 font-tajawal">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-blue-950 text-xs font-bold mb-4">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-900 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-900"></span>
            </span>
            <span>آراء عملائنا</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 font-sans">ماذا يقول عملاؤنا؟</h2>
          <p className="text-slate-500 font-medium text-lg">نفخر بثقة عملائنا الكرام ونسعى دائماً لتقديم الأفضل</p>
        </div>

        <TestimonialsCarousel />
        </div>
      </section>
  );
}

// --- Pages ---

function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeService, setActiveService] = useState<number | null>(null);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  const faqs = [
    { q: "ما هي خدمات عادل السداد؟", a: "نقدم خدمات تسديد القروض البنكية، رفع التعثرات من سمة، فك إيقاف الخدمات، وتوفير سيولة نقدية حتى ٣٦ راتب لجميع البنوك." },
    { q: "كيف يمكنني التواصل معكم؟", a: "يمكنكم التواصل معنا مباشرة عبر الاتصال الهاتفي أو عبر الواتساب المتاح على مدار الساعة طوال أيام الأسبوع." },
    { q: "ما هي المدة المتوقعة لتسديد القرض؟", a: "تعتمد المدة على نوع القرض والبنك، ولكننا نتميز بالسرعة الفائقة وغالباً ما يتم الإنجاز في غضون وقت قياسي." },
    { q: "هل تقدمون ضمان على الخدمة؟", a: "نعم، خدماتنا نظامية وشرعية 100% ونضمن لكم الشفافية التامة في كافة الإجراءات." },
    { q: "ما هي البنوك التي تتعاملون معها؟", a: "نتعامل مع جميع البنوك السعودية الرئيسية مثل الراجحي، الأهلي، الرياض، الإنماء، والبلاد وغيرها." },
    { q: "كيف يتم تحديد تكلفة الخدمة؟", a: "يتم تحديد التكلفة بناءً على نوع الخدمة ومبلغ المديونية، ونحرص دائماً على تقديم أقل عمولة في السوق." },
    { q: "هل يمكن تسديد أكثر من قرض في نفس الوقت؟", a: "نعم، يمكننا التعامل مع مديونيات متعددة وتوحيدها في التزام واحد بما يخدم مصلحة العميل." },
    { q: "هل خدماتكم متوفرة في جميع مناطق المملكة؟", a: "نعم، نخدم عملائنا في كافة مدن ومناطق المملكة العربية السعودية." },
    { q: "هل المعاملات سرية؟", a: "بالتأكيد، الخصوصية والسرية التامة لبيانات العملاء هي أحد أهم مبادئنا التي نلتزم بها." },
  ];

  return (
    <>

      
      {/* Hero */}
      <section className="relative pt-24 pb-8 lg:pt-32 lg:pb-12 px-4 md:px-8 text-center lg:text-right overflow-hidden min-h-[60vh] flex flex-col justify-center">
        
        {/* Floating Icons */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotate: -15 }}
          animate={{ opacity: 0.15, y: [0, -20, 0], rotate: [-15, 5, -15] }}
          transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, opacity: { duration: 1.5, repeat: 0 } }}
          className="absolute top-[10%] right-[2%] md:top-[10%] md:right-[5%] z-0 pointer-events-none text-blue-800"
        >
          <TrendingUp className="w-8 h-8 md:w-12 md:h-12" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: -50, rotate: 15 }}
          animate={{ opacity: 0.15, y: [0, 20, 0], rotate: [15, -10, 15] }}
          transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, delay: 1, opacity: { duration: 1.5, repeat: 0 } }}
          className="absolute bottom-[5%] right-[2%] md:bottom-[10%] md:right-[5%] z-0 pointer-events-none text-blue-800"
        >
          <Wallet className="w-8 h-8 md:w-12 md:h-12" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -10 }}
          animate={{ opacity: 0.15, y: [0, -15, 0], rotate: [-10, 10, -10] }}
          transition={{ duration: 7, ease: "easeInOut", repeat: Infinity, delay: 2, opacity: { duration: 1.5, repeat: 0 } }}
          className="absolute top-[15%] left-[2%] md:top-[15%] md:left-[5%] z-0 pointer-events-none text-blue-800"
        >
          <Banknote className="w-10 h-10 md:w-14 md:h-14" />
        </motion.div>

        <div className="container mx-auto relative z-20">
          <div className="grid lg:grid-cols-12 gap-4 lg:gap-10 items-center">
            
            {/* Right column: Content (Heading, Paragraph, CTA, Trust indicators) */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              
              className="lg:col-span-12 flex flex-col items-center max-w-4xl mx-auto w-full"
            >
              {/* Badges Stack */}
              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 mb-6 w-full">
                <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-950 text-xs md:text-sm font-bold shadow-sm">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-blue-900" strokeWidth={2.5} />
                  <span className="whitespace-nowrap">
                    للقطاع الحكومي فقط ونعتذر عن القطاع الخاص
                  </span>
                </div>

                <div className="inline-flex items-center justify-center gap-2 md:gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-950 to-blue-800 shadow-lg transform-gpu hover:scale-105 transition-transform">
                  <span className="font-bold text-sm md:text-base leading-tight text-white text-center whitespace-nowrap">
                    عروض خاصة لمنسوبي الصحة والتعليم والعسكر والمدنيين
                  </span>
                </div>

                <div
                  className="mt-6 mb-4 relative z-10 flex flex-col items-center transform -rotate-2"
                >
                  <div className="mb-0 rounded-full p-[1px] bg-gradient-to-r from-[#25D366]/20 to-blue-900/20 shadow-sm">
                    <div className="flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-900/5 to-[#25D366]/5 backdrop-blur-md">
                      <span className="flex h-2.5 w-2.5 relative">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75 blur-[2px]"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#25D366]"></span>
                      </span>
                      <span className="text-xs md:text-sm font-bold bg-gradient-to-r from-blue-950 to-[#128C7E] text-transparent bg-clip-text leading-loose py-0.5">حصرياً لعملائنا</span>
                    </div>
                  </div>
                  <h2 
                    className="text-6xl md:text-8xl font-black bg-gradient-to-r from-blue-950 via-[#128C7E] to-[#25D366] text-transparent bg-clip-text inline-block transform-gpu pb-4 leading-normal pt-4"
                    style={{ filter: 'drop-shadow(0px 15px 25px rgba(37,211,102,0.5)) drop-shadow(0px 5px 10px rgba(30,58,138,0.4))' }}
                  >
                    36 راتب
                  </h2>
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-4 text-center w-full">
                عادل السداد - <span className="bg-gradient-to-l from-blue-950 to-blue-800 bg-clip-text text-transparent drop-shadow-sm font-bold">حلولك المالية</span> <br />
                <span className="bg-gradient-to-l from-blue-950 to-blue-800 bg-clip-text text-transparent drop-shadow-sm block mt-2 text-center w-full font-bold">بين يديك</span>
              </h1>
              <p className="text-sm md:text-base text-slate-600 mb-5 leading-relaxed font-medium ">
                نقدم لك حلولاً مالية مبتكرة تشمل تسديد القروض البنكية حتى ٣٦ راتب، رفع التعثرات من سمة، سداد البطاقات الائتمانية، واستخراج قروض لجميع البنوك بسرعة وسهولة.
              </p>
              
              {/* Square CTA Buttons Side-By-Side */}
              <div className="grid grid-cols-2 gap-4 w-full max-w-xl mb-6">
                  <motion.a 
                    href={WHATSAPP_URL} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={() => track('whatsapp_click')} 
                    whileHover={{ scale: 1.03 }} 
                    whileTap={{ scale: 0.97 }} 
                    className="relative overflow-hidden bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white p-4 md:p-6 rounded-3xl flex flex-col items-center justify-center gap-3 shadow-xl shadow-[#25D366]/10 hover:from-[#128C7E] hover:to-[#075E54] transition-all text-center aspect-square md:aspect-auto md:h-44 animate-shimmer-slow"
                  >
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 border border-white/30 backdrop-blur-sm">
                        <FaWhatsapp className="w-7 h-7 md:w-8 md:h-8" color="white" />
                      </div>
                      <div className="flex flex-col items-center">
                          <span className="leading-tight text-lg md:text-2xl font-bold mb-1 block">تواصل واتساب</span>
                          <span className="text-[10px] md:text-sm font-bold opacity-90 block">رد فوري ومباشر</span>
                      </div>
                  </motion.a>
                  <motion.a 
                    href={`tel:${CONTACT_NUMBER}`} 
                    onClick={() => track('call_click')} 
                    whileHover={{ scale: 1.03 }} 
                    whileTap={{ scale: 0.97 }} 
                    className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-blue-800 text-white p-4 md:p-6 rounded-3xl flex flex-col items-center justify-center gap-3 shadow-xl shadow-blue-900/15 hover:from-blue-950 hover:to-blue-900 transition-all text-center aspect-square md:aspect-auto md:h-44 animate-shimmer-slow"
                  >
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20 backdrop-blur-sm">
                        <Phone className="w-7 h-7 md:w-8 md:h-8 text-white" />
                      </div>
                      <div className="flex flex-col items-center">
                          <span className="leading-tight text-lg md:text-2xl font-bold mb-1 text-white block">اتصل</span>
                          <span className="text-[10px] md:text-sm font-bold opacity-90 text-white block">اتصال هاتفي مباشر</span>
                      </div>
                  </motion.a>
              </div>
              
              <div className="flex flex-row items-center justify-center gap-6 md:gap-8 text-[11px] sm:text-xs text-slate-700 font-medium w-full">
                  <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span className="whitespace-nowrap">+ 5,000 عميل سعيد</span>
                  </div>
                  <div className="flex items-center gap-1">
                      <div className="w-3.5 h-3.5 bg-blue-900 rounded-full flex items-center justify-center">
                          <Check strokeWidth={4} className="w-2.5 h-2.5 text-white" />
                      </div>
                      <span>مرخص ومعتمد</span>
                  </div>
                  <div className="flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>خدمة فورية</span>
                  </div>
              </div>
            </motion.div>



          </div>
        </div>
      </section>

      {/* Stats Banner (Floating Blue Glassmorphic Card synchronized in style) */}
      <section className="px-4">
        <div 
          className="relative max-w-7xl mx-auto my-12 py-10 px-6 md:px-12 border border-blue-900/40 rounded-3xl bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 backdrop-blur-[40px] shadow-xl shadow-blue-950/15 overflow-hidden"
        >
          <div className="container mx-auto relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <ModernStatItem value="+٥,٠٠٠" label="عميل سعيد" icon={<User className="w-8 h-8" style={{ stroke: "url(#blue-green-gradient)" }} />} />
              <ModernStatItem value="+١٠،٠٠٠" label="خدمة منجزة" icon={<CheckCircle2 className="w-8 h-8" style={{ stroke: "url(#blue-green-gradient)" }} />} />
              <ModernStatItem value="98%" label="نسبة الرضا" icon={<Star className="w-8 h-8" style={{ stroke: "url(#blue-green-gradient)" }} />} />
              <ModernStatItem value="٢٤/٧" label="دعم متواصل" icon={<Clock className="w-8 h-8" style={{ stroke: "url(#blue-green-gradient)" }} />} />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-8 px-6 md:px-8">
        <div className="container mx-auto text-center font-tajawal">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-blue-950 text-xs font-bold mb-4">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-900 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-900"></span>
              </span>
              <span>خدماتنا</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 font-sans">ماذا نقدم لك؟</h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium">حلول مالية شاملة ومتكاملة تلبي جميع احتياجاتك المالية بكل احترافية وسرعة</p>
          </div>
          
          <div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
                                                                        <SleekServiceCard 
              isActive={activeService === 0}
              onClick={() => setActiveService(activeService === 0 ? null : 0)}
              icon={<CreditCard className="w-8 h-8" />}
              title="تسديد القروض البنكية"
              description="نسدد قروضك البنكية حتى ٣٦ راتب مع أفضل الحلول والعروض التنافسية لجميع البنوك السعودية."
              colorTheme="blue"
            />
            <SleekServiceCard 
              isActive={activeService === 1}
              onClick={() => setActiveService(activeService === 1 ? null : 1)}
              icon={<CheckCircle2 className="w-8 h-8" />}
              title="رفع التعثرات من سمة"
              description="نساعدك في رفع التعثرات وتحسين سجلك الائتماني في سمة لاستعادة قدرتك على التمويل."
              colorTheme="emerald"
            />
            <SleekServiceCard 
              isActive={activeService === 2}
              onClick={() => setActiveService(activeService === 2 ? null : 2)}
              icon={<Banknote className="w-8 h-8" />}
              title="سداد البطاقات الائتمانية"
              description="نقوم بسداد مديونيات البطاقات الائتمانية بأفضل الطرق وأقل التكاليف الممكنة."
              colorTheme="purple"
            />
            <SleekServiceCard 
              isActive={activeService === 3}
              onClick={() => setActiveService(activeService === 3 ? null : 3)}
                 icon={<Lock className="w-8 h-8" />}
                 title="سداد إيقاف الخدمات"
                 description="حلول سريعة وفعالة لسداد إيقاف الخدمات واستعادة جميع خدماتك الحكومية."
                 colorTheme="red"
            />
            <SleekServiceCard 
              isActive={activeService === 4}
              onClick={() => setActiveService(activeService === 4 ? null : 4)}
                 icon={<TrendingUp className="w-8 h-8" />}
                 title="استخراج قروض جديدة"
                 description="نستخرج لك قروضاً جديدة من جميع البنوك السعودية بأفضل الشروط والأرباح التنافسية."
                 colorTheme="teal"
            />
            <SleekServiceCard 
              isActive={activeService === 5}
              onClick={() => setActiveService(activeService === 5 ? null : 5)}
                 icon={<CreditCard className="w-8 h-8" />}
                 title="تسديد شركات التمويل"
                 description="نتولى تسديد مديونياتك لدى شركات التمويل المختلفة وإعادة هيكلة التزاماتك المالية."
                 colorTheme="orange"
            />
          </div>
        </div>
      </section>

      {/* Why Us / Features */}
      <section id="features" className="py-8 px-6 md:px-8 overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-blue-950 text-xs font-bold mb-4">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-900 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-900"></span>
              </span>
              <span>لماذا نحن</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 font-sans">مميزاتنا</h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium">نتميز بتقديم خدمات مالية عالية الجودة تضمن رضاك الكامل</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        <FeatureCard 
              isActive={activeFeature === 0}
              onClick={() => setActiveFeature(activeFeature === 0 ? null : 0)}
              title="سرعة إنجاز فورية" description="ننجز معاملاتك في أسرع وقت ممكن بدون تأخير أو تعقيد." icon={<TrendingUp className="w-6 h-6" />}  colorTheme="blue" />
            <FeatureCard 
              isActive={activeFeature === 1}
              onClick={() => setActiveFeature(activeFeature === 1 ? null : 1)}
              title="أسعار تنافسية" description="نقدم أفضل الأسعار والعروض مقارنة بالسوق مع شفافية كاملة." icon={<Scale className="w-6 h-6" />}  colorTheme="emerald" />
            <FeatureCard 
              isActive={activeFeature === 2}
              onClick={() => setActiveFeature(activeFeature === 2 ? null : 2)}
              title="سرية تامة" description="نضمن لك سرية كاملة لمعلوماتك الشخصية والمالية." icon={<CheckCircle2 className="w-6 h-6" />}  colorTheme="purple" />
            <FeatureCard 
              isActive={activeFeature === 3}
              onClick={() => setActiveFeature(activeFeature === 3 ? null : 3)}
              title="دعم متواصل" description="فريق دعم متخصص جاهز لمساعدتك على مدار الساعة." icon={<Phone className="w-6 h-6" />}  colorTheme="orange" />
            <FeatureCard 
              isActive={activeFeature === 4}
              onClick={() => setActiveFeature(activeFeature === 4 ? null : 4)}
              title="خبرة واسعة" description="سنوات من الخبرة في مجال الحلول المالية مع آلاف العملاء الراضين." icon={<Lock className="w-6 h-6" />}  colorTheme="red" />
            <FeatureCard 
              isActive={activeFeature === 5}
              onClick={() => setActiveFeature(activeFeature === 5 ? null : 5)}
              title="حلول مرنة" description="نقدم حلولاً مالية مرنة ومخصصة تناسب وضعك المالي." icon={<TrendingUp className="w-6 h-6" />}  colorTheme="teal" />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-8 px-6 md:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-10 font-tajawal">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-blue-950 text-xs font-bold mb-4">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-900 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-900"></span>
              </span>
              <span>كيف نعمل</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 font-sans">خطوات بسيطة وسهلة</h2>
            <p className="text-slate-500 font-medium">نجعل الأمر سهلاً وبسيطاً</p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-[24px] left-0 right-0 h-0.5 bg-slate-200 -z-10"></div>
            <div className="grid lg:grid-cols-4 gap-4 md:gap-6">
              <StepItem number="١" title="تواصل معنا" description="تواصل معنا عبر الواتساب أو الاتصال المباشر" />
              <StepItem number="٢" title="نفهم احتياجاتك" description="ندرس وضعك المالي ونقدم لك أفضل الحلول" />
              <StepItem number="٣" title="ننفذ بإتقان" description="نبدأ في تنفيذ الحل المتفق عليه بسرعة ودقة" />
              <StepItem number="٤" title="نضمن رضاك" description="نتابع معك حتى إتمام الخدمة ونضمن رضاك التام" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* FAQ */}
      <section id="faq" className="py-8 px-6 md:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-blue-950 text-xs font-bold mb-4">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-900 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-900"></span>
              </span>
              <span>الأسئلة الشائعة</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 font-sans">إجابات على استفساراتكم</h2>
            <p className="text-slate-500 font-tajawal text-lg">إجابات على أكثر الأسئلة شيوعاً</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors text-right group bg-white"
                >
                  <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${activeFaq === idx ? 'rotate-90' : ''}`} />
                  <span className="font-bold text-slate-900 text-base group-hover:text-blue-950 transition-colors">{faq.q}</span>
                </button>
                <AnimatePresence initial={false}>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden bg-white"
                    >
                      <div className="px-6 pb-5 pt-1 text-slate-600 leading-relaxed text-right md:text-base font-medium">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="about" className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
            <div 
               className="relative border border-blue-900/40 rounded-3xl bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 backdrop-blur-[40px] shadow-xl shadow-blue-950/15 py-8 px-6 md:px-10 overflow-hidden text-center"
            >
                {/* Logo background */}
                <div className="absolute -top-16 -right-16 w-64 h-64 opacity-5 pointer-events-none">
                     <div className="relative w-full h-full">
                  <img src={AdelLogo} alt="عادل السداد" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-blue-950 mix-blend-color pointer-events-none"></div>
                </div>
                </div>

                <motion.h2 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-2xl md:text-3xl font-bold text-white text-center mb-6 relative z-10 leading-tight font-sans"
                >
                    جاهز تبدأ؟ تواصل معنا الآن!
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px" }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    className="text-base md:text-lg text-blue-100/90 mb-10 max-w-2xl mx-auto relative z-10 text-center font-medium"
                >
                    فريقنا المتخصص جاهز لمساعدتك في حل جميع مشاكلك المالية. لا تتردد في التواصل معنا اليوم.
                </motion.p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10 max-w-lg mx-auto">
                    <motion.a 
                        href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => track('whatsapp_click')} 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        
                        transition={{ duration: 0.5, delay: 0.2 }}
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} 
                        className="relative overflow-hidden bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white px-8 py-4 rounded-2xl font-bold text-base hover:from-[#128C7E] hover:to-[#075E54] transition-colors flex items-center justify-center gap-3 shadow-md w-full sm:w-1/2 animate-shimmer-slow"
                    >
                        <div className="relative z-20 flex items-center justify-center gap-3">
                            <FaWhatsapp size={20} color="white" />
                            تواصل عبر الواتساب
                        </div>
                    </motion.a>
                    <motion.a 
                        href={`tel:${CONTACT_NUMBER}`} onClick={() => track('call_click')} 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        
                        transition={{ duration: 0.5, delay: 0.3 }}
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} 
                        className="relative overflow-hidden bg-gradient-to-r from-blue-950 to-blue-900 hover:from-blue-800 hover:to-blue-950 text-white border border-blue-900/30 px-8 py-4 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-3 shadow-md w-full sm:w-1/2 animate-shimmer-slow"
                    >
                            <Phone className="w-5 h-5 text-white" />
                            اتصل بنا الآن
                    </motion.a>
                </div>
            </div>
        </div>
      </section>
    </>
  );
}


// ... (other imports)

let hasAnimatedStats = false;

function ModernStatItem({ value, label, icon }: { value: string, label: string, icon: ReactNode }) {
    const ref = useRef(null);
    const gradientSvg = (
      <svg width="0" height="0" className="absolute">
        <linearGradient id="blue-green-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop stopColor="#25D366" offset="0%" />
          <stop stopColor="#3b82f6" offset="100%" />
        </linearGradient>
      </svg>
    );
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    
    // Parse numeric part
    const numericMatch = value.match(/[\d٠-٩][\d٠-٩,\u060C]*/);
    const numericValue = numericMatch ? parseInt(numericMatch[0].replace(/[,،]/g, '').replace(/[٠-٩]/g, (d) => '0123456789'['٠١٢٣٤٥٦٧٨٩'.indexOf(d)])) : 0;
    
    const count = useMotionValue(hasAnimatedStats ? numericValue : 0);
    
    // Explicit conversion helper for Arabic-Indic digits with formatting
    const toArabicDigits = (num: number) => {
        let s = Math.round(num).toString();
        s = s.replace(/\B(?=(\d{3})+(?!\d))/g, "٬");
        const arabicDigits = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
        return s.replace(/\d/g, (d) => arabicDigits[parseInt(d)]);
    };
    
    const roundedArabic = useTransform(count, toArabicDigits);

    useEffect(() => {
        if (isInView && !hasAnimatedStats) {
            animate(count, numericValue, { duration: 2.5, ease: "easeOut" }).then(() => {
                hasAnimatedStats = true;
            });
        }
    }, [isInView, count, numericValue]);

    return (
        <motion.div
            layout
            ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center group py-2"
        >
            <div className="mb-2 inline-block p-2 rounded-2xl transition-colors">
                {icon}
            </div>
            {gradientSvg}<div className="text-3xl md:text-4xl font-black mb-1 font-sans tracking-tight text-white" style={{ fontVariantNumeric: 'tabular-nums' }}>
                {value.includes('+') && '+'}
                <motion.span>{roundedArabic}</motion.span>
                {value.includes('%') && '٪'}
                {value.includes('/') && value.substring(value.indexOf('/'))}
            </div>
            <div className="text-blue-200/90 font-medium text-xs md:text-sm">{label}</div>
        </motion.div>
    );
}

function FeatureCard({ title, description, icon, colorTheme = 'blue', onClick }: { title: string, description: string, icon: ReactNode, colorTheme?: 'blue' | 'emerald' | 'purple' | 'orange' | 'red' | 'teal', isActive?: boolean, onClick?: () => void }) {
  const themes = {
    blue: "bg-gradient-to-br from-blue-400 to-blue-600 shadow-blue-500/30",
    emerald: "bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-emerald-500/30",
    purple: "bg-gradient-to-br from-purple-400 to-purple-600 shadow-purple-500/30",
    orange: "bg-gradient-to-br from-orange-400 to-orange-600 shadow-orange-500/30",
    red: "bg-gradient-to-br from-red-400 to-red-600 shadow-red-500/30",
    teal: "bg-gradient-to-br from-teal-400 to-teal-600 shadow-teal-500/30",
  };
  const iconBg = themes[colorTheme] || themes.blue;

  return (
    <div
      className="bg-white p-7 rounded-[2rem] shadow-sm hover:shadow-md border border-slate-100 transition-shadow duration-300 text-right"
        >
            <div className={`w-16 h-16 rounded-[1.25rem] flex items-center justify-center mb-6 mr-0 ml-auto text-white shadow-lg ${iconBg}`}>
                {icon}
            </div>
            <h3 className="font-bold text-xl mb-3 text-slate-900">{title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">{description}</p>
        </div>
    );
}

function StepItem({ number, title, description, delay = 0 }: { number: string, title: string, description: string, delay?: number }) {
    return (
        <motion.div 
            layout
            transition={{ duration: 0.8, delay: delay * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center relative"
        >
            <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center text-xl font-black mx-auto mb-3 shadow-xl relative z-10">
                {number}
                <div className="absolute inset-0 bg-blue-950 rounded-full scale-0 -z-10 transition-transform duration-500"></div>
            </div>
            <div className="mb-2">
                <ChevronRight className="w-5 h-5 text-amber-500 mx-auto rotate-90" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">{title}</h4>
            <p className="text-sm text-slate-500 max-w-xs mx-auto font-medium">{description}</p>
        </motion.div>
    );
}

function ServicesPage() {
  const [activeDetail, setActiveDetail] = useState<number | null>(null);
  return (
    <div className="pt-36 pb-10 px-6 md:px-12">
      <div className="container mx-auto text-right">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">خدماتنا بالتفصيل</h1>
        <div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
          <DetailServiceCard 
            title="تسديد القروض البنكية"
            content="نقوم بسداد مديونياتك الحالية في جميع البنوك السعودية (الراجحي، الأهلي، الرياض، الإنماء، وغيرها) لتمكينك من البدء من جديد بنظام ائتماني نظيف."
          />
          <DetailServiceCard 
            title="فك إيقاف الخدمات"
            content="حلول سريعة لرفع إيقاف الخدمات الحكومية الناتج عن الالتزامات المالية المتعثرة، من خلال تسوية المديونيات وتسديدها."
          />
          <DetailServiceCard 
            title="تحديث سمة"
            content="إجراءات قانونية لتحديث سجلك في شركة سمة الائتمانية ورفع الحظر عنك لتتمكن من الحصول على تمويلات جديدة."
          />
          <DetailServiceCard 
            title="تمويل إضافي"
            content="استخراج سيولة نقدية جديدة من بنكك الحالي أو بنك آخر بأعلى سقف متاح يتناسب مع راتبك الحالي."
          />
          <DetailServiceCard 
            title="توحيد الالتزامات"
            content="دمج جميع قروضك في قسط واحد مريح ومخفض لتقليل العبء المالي الشهري عليك."
          />
          <DetailServiceCard 
            title="أقل هامش ربح"
            content="نضمن لك الحصول على أقل نسبة فائدة ممكنة في السوق السعودي بفضل علاقتنا القوية مع مختلف البنوك."
          />
        </div>
      </div>
    </div>
  );
}



function ContactPage() {
  return (
    <div className="pt-36 pb-10 px-6 md:px-12">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">تواصل معنا الآن</h1>
          <p className="text-slate-500 font-medium">نحن هنا للإجابة على استفساراتك وتقديم أفضل الحلول المالية عبر الاتصال أو الواتساب.</p>
        </div>

        <div className="flex justify-center">
          <div className="bg-slate-50 p-10 rounded-3xl text-right w-full max-w-lg">
            <h3 className="text-2xl font-bold mb-8 text-center">معلومات التواصل</h3>
            <div className="space-y-6">
              <ContactInfo icon={<Phone className="w-5 h-5" />} label="اتصال مباشر" value={CONTACT_NUMBER} />
              <ContactInfo icon={<FaWhatsapp size={20} />} label="واتساب" value="متاح 24/7" />
              <ContactInfo icon={<ShieldCheck className="w-5 h-5 text-blue-900" />} label="المنطقة" value="جميع أنحاء المملكة" />
            </div>
            
            <div className="mt-12 p-6 bg-blue-900 text-white rounded-2xl text-center">
              <p className="text-sm opacity-70 mb-2 font-bold uppercase tracking-wider">هل أنت مستعجل؟</p>
              <a href={`tel:${CONTACT_NUMBER}`} onClick={() => track('call_click')} className="text-2xl font-bold block hover:text-blue-200 transition-colors">اتصل الآن ضغطة واحدة</a>
            </div>
            <div className="mt-6 flex justify-center">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => track('whatsapp_click')} className="text-xl font-bold text-[#25D366] block hover:text-[#128C7E] transition-colors">تواصل واتساب</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PrivacyPolicy() {
  return (
    <div className="pt-36 pb-10 px-6 md:px-12 text-right">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">سياسة الخصوصية</h1>
        <div className="prose prose-slate leading-relaxed text-slate-600 space-y-6 font-medium">
          <p>خصوصية عملائنا هي أهم أولوياتنا. نحن نلتزم بحماية كافة البيانات الشخصية والمالية التي يتم تقديمها لنا.</p>
          <h3 className="text-xl font-bold text-slate-900">ما هي المعلومات التي نجمعها؟</h3>
          <p>نجمع المعلومات الضرورية فقط لمعالجة طلبك، مثل الاسم، رقم الهاتف، والبنك الحالي، وتفاصيل المديونية.</p>
          <h3 className="text-xl font-bold text-slate-900">كيف نستخدم بياناتك؟</h3>
          <p>تُستخدم البيانات حصرياً للتواصل معك وتقديم عروض التمويل والتسديد المناسبة لحالتك. لا نقوم بمشاركة أي من بياناتك مع أطراف ثالثة لأغراض تسويقية.</p>
        </div>
      </div>
    </div>
  );
}

function TermsOfUse() {
  return (
    <div className="pt-36 pb-10 px-6 md:px-12 text-right">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">شروط الخدمة</h1>
        <div className="prose prose-slate leading-relaxed text-slate-600 space-y-6 font-medium">
          <p>استخدامك لموقعنا وطلب خدماتنا يعني موافقتك على الشروط التالية:</p>
          <ul className="list-disc pr-6 space-y-4">
            <li>يجب أن تكون جميع المعلومات المقدمة من قبلك دقيقة وصحيحة تماماً.</li>
            <li>نحن نعمل كوسطاء ومقدمي حلول مالية ولسنا موظفين في بنك معين.</li>
            <li>إجراءات التسديد وتحديث سمة تعتمد على الضوابط والأنظمة المتبعة في بنك العميل.</li>
            <li>نخلي مسؤوليتنا عن أي بيانات غير دقيقة تؤثر على جودة أو سرعة الخدمة المقدمة.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function TestimonialsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, direction: 'rtl', align: 'start', dragFree: true }
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="relative w-full mx-auto pb-4">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -mr-4" style={{ touchAction: 'pan-y pinch-zoom' }}>
          {testimonialsData.map((t, idx) => (
            <div key={idx} className="flex-[0_0_100%] sm:flex-[0_0_80%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] min-w-0 pr-6">
              <div className="h-full flex flex-col group bg-white p-6 rounded-3xl shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-xl hover:border-blue-100">
                <div className="flex items-center gap-5 justify-start mb-6 border-b border-slate-50 pb-6">
                  <div className="w-16 h-16 shrink-0 text-2xl rounded-full flex items-center justify-center font-bold bg-gradient-to-br from-blue-100 to-blue-50 text-blue-950 shadow-md border border-blue-100">
                    {t.name[0]}
                  </div>
                  <div className="text-right">
                    <h4 className="font-bold text-slate-900 text-xl mb-2">{t.name}</h4>
                    <div className="flex items-center gap-2 justify-start mb-3">
                      <p className="text-sm text-slate-400 font-medium">{t.time}</p>
                    </div>
                    <div className="flex gap-1 justify-start">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />)}
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed text-right font-medium text-base md:text-lg mb-2 flex-grow">{t.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Pagination Dots */}
      <div className="flex justify-center items-center gap-2 mt-8">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === selectedIndex ? 'bg-blue-900 w-6' : 'bg-slate-300 hover:bg-slate-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// --- Helper Components ---

function SleekServiceCard({ icon, colorTheme = 'blue', title, description, onClick }: { icon: ReactNode, colorTheme?: 'blue' | 'emerald' | 'purple' | 'orange' | 'red' | 'teal', title: string, description: string, isActive?: boolean, onClick?: () => void }) {
  const themes = {
    blue: "bg-gradient-to-br from-blue-400 to-blue-600 shadow-blue-500/30",
    emerald: "bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-emerald-500/30",
    purple: "bg-gradient-to-br from-purple-400 to-purple-600 shadow-purple-500/30",
    orange: "bg-gradient-to-br from-orange-400 to-orange-600 shadow-orange-500/30",
    red: "bg-gradient-to-br from-red-400 to-red-600 shadow-red-500/30",
    teal: "bg-gradient-to-br from-teal-400 to-teal-600 shadow-teal-500/30",
  };
  const iconBg = themes[colorTheme] || themes.blue;

  return (
    <div
      className="bg-white p-7 rounded-[2rem] shadow-sm hover:shadow-md border border-slate-100 transition-shadow duration-300 text-right"
    >
      <div className={`w-16 h-16 rounded-[1.25rem] flex items-center justify-center mb-6 mr-0 ml-auto text-white shadow-lg ${iconBg}`}>
        {icon}
      </div>
      <h3 className="font-bold text-xl mb-3 text-slate-900">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed font-medium">{description}</p>
    </div>
  );
}

function DetailServiceCard({ title, content, isActive, onClick }: { title: string, content: string, isActive?: boolean, onClick?: () => void }) {
  const serviceWhatsAppUrl = `https://wa.me/966${CONTACT_NUMBER.substring(1)}?text=${encodeURIComponent(`السلام عليكم، أرغب في الاستفسار عن خدمة: ${title}`)}`;

  return (
    <div
      onClick={onClick}
      className={`animate-fade-in cursor-pointer group hover:bg-white p-8 rounded-3xl border shadow-sm hover:shadow-xl  h-full flex flex-col font-tajawal transition-all duration-300 ${isActive ? "bg-white border-transparent shadow-xl shadow-blue-800/40" : "bg-slate-50 border-transparent hover:shadow-xl hover:shadow-blue-800/20"}`}
    >
      <h3 className={`text-2xl font-bold mb-4 transition-colors ${isActive ? "text-blue-900" : "text-blue-900 group-hover:text-blue-950"}`}>{title}</h3>
      <p className="text-slate-600 leading-relaxed text-sm font-medium">{content}</p>
      <div className="mt-auto pt-6 flex justify-end">
        <a 
          href={serviceWhatsAppUrl}
          target="_blank" rel="noopener noreferrer"
          onClick={() => track('whatsapp_click')}
          className="text-blue-950 font-medium flex items-center gap-2 group"
        >
          <span>طلب الخدمة عبر الواتساب</span>
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
}

function StatItem({ value, label }: { value: string, label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-4 border-b sm:border-b-0 sm:border-l border-white/10 pb-6 sm:pb-0 sm:pl-12 last:border-0 last:pl-0"
    >
      <div className="text-4xl font-medium text-amber-400">{value}</div>
      <div className="text-sm opacity-80 leading-tight font-medium">{label}</div>
    </motion.div>
  );
}

function ContactInfo({ icon, label, value }: { icon: ReactNode, label: string, value: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-4 justify-start flex-row-reverse"
    >
      <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs text-slate-400 font-medium">{label}</p>
        <p className="text-slate-900 font-medium">{value}</p>
      </div>
    </motion.div>
  );
}

function Input({ label, name, ...props }: { label: string, name: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-700 block text-right">{label}</label>
      <input 
        name={name}
        {...props}
        className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium"
      />
    </div>
  );
}

function SleekFeatureItem({ title, description }: { title: string, description: string }) {
  return (
    <motion.div 
      
      
      
      
      className="flex gap-5 justify-end"
    >
      <div className="text-right">
        <h4 className="text-xl font-bold text-slate-900 mb-2">{title}</h4>
        <p className="text-slate-500 leading-relaxed max-w-sm font-medium">{description}</p>
      </div>
      <div className="mt-1 flex-shrink-0">
        <div className="bg-blue-50 p-2 rounded-xl">
          <CheckCircle2 className="w-5 h-5 text-blue-950" />
        </div>
      </div>
    </motion.div>
  );
}

function NotFound() {
  return (
    <div className="py-32 text-center">
      <h2 className="text-4xl font-bold text-slate-900 mb-6">404 - الصفحة غير موجودة</h2>
      <p className="text-slate-600 mb-8 text-lg">عذراً، الصفحة التي تبحث عنها غير موجودة.</p>
      <Link to="/" className="inline-block bg-blue-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-800 transition-colors shadow-lg shadow-blue-900/20">
        العودة للرئيسية
      </Link>
    </div>
  );
}
