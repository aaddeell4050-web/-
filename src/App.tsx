/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import AdelLogo from './assets/images/adel_logo_a_1781790033630.jpg';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
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
  Check
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useState, useEffect, type ReactNode, type FormEvent, type InputHTMLAttributes, useRef } from 'react';
import LeadsPage from './components/LeadsPage';
// heroGraphic removed - using static public asset for SEO persistence


const CONTACT_NUMBER = "0555381525";
const WHATSAPP_URL = `https://wa.me/966${CONTACT_NUMBER.substring(1)}?text=${encodeURIComponent('السلام عليكم، أرغب في الاستفسار عن خدمات تسديد القروض')}`;


const track = async (event: string) => {
  // Tracking is now handled entirely by Google Tag Manager
  console.log(`Event tracked via GTM: ${event}`);
};

export default function App() {
  useEffect(() => {
    track('view_content');
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/leads" element={<LeadsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

// --- Components ---

function Layout({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    // Scroll to top on route change
    window.scrollTo(0, 0); 
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  return (
    <div className="min-h-screen bg-slate-50 font-tajawal selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden flex flex-col relative z-0">
      {/* Background gradients: Golden on left, Blue on right, fading towards the center image */}
      <div className="absolute top-0 right-0 w-1/2 h-[600px] bg-gradient-to-l from-blue-600 to-transparent -z-10 pointer-events-none opacity-[0.03]"></div>
      <div className="absolute top-0 left-0 w-1/2 h-[600px] bg-gradient-to-r from-yellow-500 to-transparent -z-10 pointer-events-none opacity-5"></div>
      
      {/* Navbar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-20 flex items-center px-6 md:px-12 border-b ${
          scrolled ? 'bg-white/95 backdrop-blur-md border-slate-200 shadow-sm' : 'bg-white/50 backdrop-blur-sm border-transparent'
        }`}
      >
        <div className="container mx-auto flex justify-between items-center text-right">
          <Link to="/" className="flex items-center gap-2 md:gap-3 group">
            <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg overflow-hidden group-hover:scale-110 transition-transform">
              <img src={AdelLogo} alt="عادل السداد" className="w-full h-full object-cover" />
            </div>
            <span className="text-lg md:text-2xl font-bold tracking-tight text-slate-900 block group-hover:text-blue-700 transition-colors">
              عادل <span className="text-blue-700">السداد</span>
            </span>
          </Link>
          
          <div className="flex items-center gap-2 md:gap-8">
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-slate-700">
               <div className="w-6 h-0.5 bg-slate-700 mb-1.5"></div>
               <div className="w-6 h-0.5 bg-slate-700 mb-1.5"></div>
               <div className="w-6 h-0.5 bg-slate-700"></div>
            </button>
            <div className="hidden lg:flex items-center gap-6 text-slate-600 font-bold ml-8">
              <Link to="/" className="hover:text-blue-700 transition-colors">الرئيسية</Link>
              <Link to="/services" className="hover:text-blue-700 transition-colors">خدماتنا</Link>
              <Link to="/privacy" className="hover:text-blue-700 transition-colors">سياسة الخصوصية</Link>
              <Link to="/terms" className="hover:text-blue-700 transition-colors">شروط الخدمة</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed inset-0 z-[60] bg-white pt-24 px-6 flex flex-col gap-6 text-right"
          >
             <button onClick={() => setMenuOpen(false)} className="absolute top-6 left-6"><X size={28} strokeWidth={1} /></button>
             <Link onClick={() => setMenuOpen(false)} to="/" className="text-xl font-normal text-slate-800">الرئيسية</Link>
             <Link onClick={() => setMenuOpen(false)} to="/services" className="text-xl font-normal text-slate-800">خدماتنا</Link>
             <Link onClick={() => setMenuOpen(false)} to="/privacy" className="text-xl font-normal text-slate-800">سياسة الخصوصية</Link>
             <Link onClick={() => setMenuOpen(false)} to="/terms" className="text-xl font-normal text-slate-800">شروط الخدمة</Link>
             <div className="flex flex-col gap-4 mt-6">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => track('whatsapp_click')} className="bg-green-600 text-white p-4 rounded-xl text-center font-normal">واتساب</a>
                <a href={`tel:${CONTACT_NUMBER}`} onClick={() => track('call_click')} className="bg-blue-700 text-white p-4 rounded-xl text-center font-normal">اتصال</a>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow pt-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-16 bg-slate-900 text-slate-400 px-6 md:px-12">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-12 text-right mb-16">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
                  <img src={AdelLogo} alt="عادل السداد" className="w-full h-full object-cover" />
                </div>
                <span className="text-xl font-medium text-white tracking-tight">عادل السداد</span>
              </div>
              <p className="leading-relaxed text-sm">
                شريكك المالي الموثوق في المملكة العربية السعودية لسداد القروض مع عادل السداد.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-6">روابط سريعة</h4>
              <ul className="space-y-4 text-sm">
                <li><Link to="/" className="hover:text-white active:text-white focus:text-white transition-colors">الرئيسية</Link></li>
                <li><Link to="/services" className="hover:text-white active:text-white focus:text-white transition-colors">خدماتنا</Link></li>
                <li><Link to="/contact" className="hover:text-white active:text-white focus:text-white transition-colors">اتصل بنا</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-6">قانوني</h4>
              <ul className="space-y-4 text-sm">
                <li><Link to="/privacy" className="hover:text-white active:text-white focus:text-white transition-colors">سياسة الخصوصية</Link></li>
                <li><Link to="/terms" className="hover:text-white active:text-white focus:text-white transition-colors">شروط الخدمة</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-6">تواصل معنا</h4>
              <div className="flex flex-col gap-3 font-normal text-sm text-slate-300">
                <a href={`tel:${CONTACT_NUMBER}`} onClick={() => track('call_click')} className="flex items-center gap-2 text-slate-400 hover:text-white active:text-white focus:text-white transition-colors">
                    <Phone className="w-4 h-4" />
                    {CONTACT_NUMBER}
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => track('whatsapp_click')} className="flex items-center gap-2 text-slate-400 hover:text-white active:text-white focus:text-white transition-colors">
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
          
          <div className="border-t border-white/5 pt-8 text-center text-xs font-normal uppercase tracking-[0.2em] flex flex-col md:flex-row items-center justify-center gap-4">
            <div>
              &copy; {new Date().getFullYear()} عادل السداد. جميع الحقوق محفوظة
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Buttons */}
      <div className="fixed bottom-8 left-8 flex flex-col gap-4 z-[99] gpu-accelerate">
        <a 
          href={`tel:${CONTACT_NUMBER}`}
          onClick={() => track('call_click')}
          className="bg-blue-700 text-white p-4 rounded-full shadow-2xl shadow-blue-500/30 hover:bg-blue-800 transition-all hover:scale-110 active:scale-90"
        >
          <Phone className="w-6 h-6" />
        </a>
        <a 
          href={WHATSAPP_URL}
          target="_blank" rel="noopener noreferrer"
          onClick={() => track('whatsapp_click')}
          className="bg-green-600 text-white p-4 rounded-full shadow-2xl shadow-green-500/30 hover:bg-green-700 transition-all hover:scale-110 active:scale-90"
        >
          <FaWhatsapp size={24} color="white" />
        </a>
      </div>
    </div>
  );
}

// --- Pages ---

function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleTestimonialScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const children = Array.from(container.children) as HTMLElement[];
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;
      
      let closestIndex = 0;
      let minDistance = Infinity;

      children.forEach((child, index) => {
        const childRect = child.getBoundingClientRect();
        const childCenter = childRect.left + childRect.width / 2;
        const distance = Math.abs(containerCenter - childCenter);
        
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setActiveTestimonial(closestIndex);
    }
  };

  const scrollToTestimonial = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const targetElement = container.children[index] as HTMLElement;
      if (targetElement) {
        // scrollIntoView with inline center works perfectly for snap containers
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        setActiveTestimonial(index);
      }
    }
  };

  const testimonials = [
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
  ];

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
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full -mr-64 -mt-64 blur-3xl -z-10 pointer-events-none"></div>
      
      {/* Hero */}
      <section className="relative pt-6 pb-12 lg:pt-20 lg:pb-24 px-4 md:px-8 text-center lg:text-right overflow-hidden min-h-[75vh] flex flex-col justify-center">
        <div className="container mx-auto relative z-20">
          <div className="grid lg:grid-cols-12 gap-4 lg:gap-10 items-center">
            
            {/* Right column: Content (Heading, Paragraph, CTA, Trust indicators) */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-7 flex flex-col items-center lg:items-start max-w-2xl mx-auto lg:mx-0 order-last lg:order-first mobile-no-animate w-full"
            >
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-4 text-center w-full">
                عادل السداد - <span className="text-blue-700 drop-shadow-sm">حلولك المالية</span> <br />
                <span className="text-blue-700 drop-shadow-sm block mt-2 text-center w-full">بين يديك</span>
              </h1>
              <p className="text-sm md:text-base text-slate-600 mb-5 leading-relaxed font-medium italic">
                نقدم لك حلولاً مالية مبتكرة تشمل تسديد القروض البنكية حتى ٣٦ راتب، رفع التعثرات من سمة، سداد البطاقات الائتمانية، واستخراج قروض لجميع البنوك بسرعة وسهولة.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full sm:w-auto mb-6">
                  <motion.a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => track('whatsapp_click')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative overflow-hidden bg-gradient-to-r from-green-700 to-green-500 text-white px-8 py-4 rounded-xl font-bold text-base hover:from-green-800 hover:to-green-600 transition-colors flex items-center justify-center gap-3 shadow-lg shadow-green-200 w-full sm:w-auto">
                      <motion.div
                          className="absolute inset-0 z-10 pointer-events-none whatsapp-shimmer"
                          style={{
                              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                              width: "100%",
                          }}
                          initial={{ x: '-100%' }}
                          animate={{ x: '100%' }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: "linear", repeatDelay: 1 }}
                      />
                      <div className="relative z-20 flex items-center justify-center gap-2">
                          <FaWhatsapp size={24} color="white" />
                          تواصل عبر الواتساب
                      </div>
                  </motion.a>
                  <motion.a href={`tel:${CONTACT_NUMBER}`} onClick={() => track('call_click')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="group bg-white border-[3px] border-blue-700 text-slate-900 px-8 py-4 rounded-xl font-bold text-base hover:bg-blue-700 hover:border-blue-700 active:bg-blue-700 active:border-blue-700 hover:text-white active:text-white transition-colors flex items-center justify-center gap-3 w-full sm:w-auto">
                      <Phone className="w-5 h-5 text-slate-900 group-hover:text-white group-active:text-white group-focus:text-white transition-colors" />
                      اتصل بنا الآن
                  </motion.a>
              </div>
              
              <div className="flex flex-row items-center justify-around lg:justify-start gap-4 text-[11px] sm:text-xs text-slate-700 font-medium w-full">
                  <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span className="whitespace-nowrap">+ 5,000 عميل سعيد</span>
                  </div>
                  <div className="flex items-center gap-1">
                      <div className="w-3.5 h-3.5 bg-blue-600 rounded-full flex items-center justify-center">
                          <Check strokeWidth={4} className="w-2.5 h-2.5 text-white" />
                      </div>
                      <span>مرخص ومعتمد</span>
                  </div>
                  <div className="flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-green-500 fill-green-500" />
                      <span>خدمة فورية</span>
                  </div>
              </div>
            </motion.div>

            {/* Left column: Image */}
            <div className="lg:col-span-5 w-full order-first lg:order-last">
              <div className="mb-2 lg:mb-0 relative mt-6 lg:mt-10 flex flex-col items-center">
                <div className="w-full flex justify-center mb-4 translate-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 border border-amber-400 text-black font-bold shadow-sm transform lg:-translate-x-4">
                    <span className="flex items-center gap-1.5 text-sm sm:text-base font-bold">
                      <span className="text-lg drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">⚠️</span> 
                      تنويه: نعتذر عن خدمة موظفي القطاع الخاص
                    </span>
                  </div>
                </div>
                <div className="relative z-10 max-w-[340px] sm:max-w-[420px] lg:max-w-[560px] mx-auto translate-y-2">
                   <img 
                     src="/hero-image.webp" 
                     alt="عادل السداد لتسديد القروض - ٣٦ راتب ومميزات بنكية" 
                     className="w-full h-auto mix-blend-multiply"
                     referrerPolicy="no-referrer"
                   />
                </div>
                {/* Soft shadow for the graphic itself */}
                <div className="absolute top-[85%] left-1/2 -translate-x-1/2 w-[50%] h-[15px] bg-blue-900/10 blur-2xl rounded-full -z-10 translate-y-2"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section 
        className="relative bg-slate-900 py-8 px-6 md:px-12"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1.5px, transparent 1.5px)', backgroundSize: '70px 70px' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent pointer-events-none z-0" />
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <ModernStatItem value="+٥,٠٠٠" label="عميل سعيد" icon={<User className="w-8 h-8 text-blue-500" />} />
            <ModernStatItem value="+١٠،٠٠٠" label="خدمة منجزة" icon={<CheckCircle2 className="w-8 h-8 text-blue-500" />} />
            <ModernStatItem value="98%" label="نسبة الرضا" icon={<Star className="w-8 h-8 text-blue-500" />} />
            <ModernStatItem value="٢٤/٧" label="دعم متواصل" icon={<Clock className="w-8 h-8 text-blue-500" />} />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-6 md:px-8 bg-slate-50">
        <div className="container mx-auto text-center font-tajawal">
          <div className="mb-16">
            <div className="flex items-center justify-center gap-6 mb-4">
              <div className="h-[2px] w-12 bg-blue-700/60 rounded-full"></div>
              <p className="text-blue-700 font-normal">خدماتنا</p>
              <div className="h-[2px] w-12 bg-blue-700/60 rounded-full"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-medium text-slate-900 mb-6 font-sans">ماذا نقدم لك؟</h2>
            <p className="text-slate-500 max-w-2xl mx-auto italic">حلول مالية شاملة ومتكاملة تلبي جميع احتياجاتك المالية بكل احترافية وسرعة</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SleekServiceCard 
              icon={<CreditCard className="w-8 h-8" />}
              title="تسديد القروض البنكية"
              description="نسدد قروضك البنكية حتى ٣٦ راتب مع أفضل الحلول والعروض التنافسية لجميع البنوك السعودية."
              bgClass="bg-blue-50"
              textClass="text-blue-700"
            />
            <SleekServiceCard 
              icon={<CheckCircle2 className="w-8 h-8" />}
              title="رفع التعثرات من سمة"
              description="نساعدك في رفع التعثرات وتحسين سجلك الائتماني في سمة لاستعادة قدرتك على التمويل."
              bgClass="bg-blue-50"
              textClass="text-blue-700"
            />
            <SleekServiceCard 
              icon={<Banknote className="w-8 h-8" />}
              title="سداد البطاقات الائتمانية"
              description="نقوم بسداد مديونيات البطاقات الائتمانية بأفضل الطرق وأقل التكاليف الممكنة."
              bgClass="bg-blue-50"
              textClass="text-blue-700"
            />
            <SleekServiceCard 
                 icon={<Lock className="w-8 h-8" />}
                 title="سداد إيقاف الخدمات"
                 description="حلول سريعة وفعالة لسداد إيقاف الخدمات واستعادة جميع خدماتك الحكومية."
                 bgClass="bg-blue-50"
                 textClass="text-blue-700"
            />
            <SleekServiceCard 
                 icon={<TrendingUp className="w-8 h-8" />}
                 title="استخراج قروض جديدة"
                 description="نستخرج لك قروضاً جديدة من جميع البنوك السعودية بأفضل الشروط والأرباح التنافسية."
                 bgClass="bg-blue-50"
                 textClass="text-blue-700"
            />
            <SleekServiceCard 
                 icon={<CreditCard className="w-8 h-8" />}
                 title="تسديد شركات التمويل"
                 description="نتولى تسديد مديونياتك لدى شركات التمويل المختلفة وإعادة هيكلة التزاماتك المالية."
                 bgClass="bg-blue-50"
                 textClass="text-blue-700"
            />
          </div>
        </div>
      </section>

      {/* Why Us / Features */}
      <section id="features" className="py-16 px-6 md:px-8 bg-slate-50 overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-6 mb-4">
              <div className="h-[2px] w-12 bg-blue-700/60 rounded-full"></div>
              <p className="text-blue-700 font-normal">لماذا نحن</p>
              <div className="h-[2px] w-12 bg-blue-700/60 rounded-full"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-medium text-slate-900 mb-6 font-sans">مميزاتنا</h2>
            <p className="text-slate-500 max-w-2xl mx-auto italic">نتميز بتقديم خدمات مالية عالية الجودة تضمن رضاك الكامل</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <FeatureCard title="سرعة إنجاز فورية" description="ننجز معاملاتك في أسرع وقت ممكن بدون تأخير أو تعقيد." icon={<TrendingUp className="w-6 h-6" />} />
            <FeatureCard title="أسعار تنافسية" description="نقدم أفضل الأسعار والعروض مقارنة بالسوق مع شفافية كاملة." icon={<Scale className="w-6 h-6" />} />
            <FeatureCard title="سرية تامة" description="نضمن لك سرية كاملة لمعلوماتك الشخصية والمالية." icon={<CheckCircle2 className="w-6 h-6" />} />
            <FeatureCard title="دعم متواصل" description="فريق دعم متخصص جاهز لمساعدتك على مدار الساعة." icon={<Phone className="w-6 h-6" />} />
            <FeatureCard title="خبرة واسعة" description="سنوات من الخبرة في مجال الحلول المالية مع آلاف العملاء الراضين." icon={<Lock className="w-6 h-6" />} />
            <FeatureCard title="حلول مرنة" description="نقدم حلولاً مالية مرنة ومخصصة تناسب وضعك المالي." icon={<TrendingUp className="w-6 h-6" />} />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-6 md:px-8 bg-slate-50">
        <div className="container mx-auto">
          <div className="text-center mb-20 font-tajawal">
            <div className="flex items-center justify-center gap-6 mb-4">
              <div className="h-[2px] w-12 bg-blue-700/60 rounded-full"></div>
              <p className="text-blue-700 font-normal">كيف نعمل</p>
              <div className="h-[2px] w-12 bg-blue-700/60 rounded-full"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-medium text-slate-900 mb-6 font-sans">خطوات بسيطة وسهلة</h2>
            <p className="text-slate-500">نجعل الأمر سهلاً وبسيطاً</p>
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
      <section id="testimonials" className="py-16 px-6 md:px-8 bg-slate-50 overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-16 font-tajawal">
            <div className="flex items-center justify-center gap-6 mb-4">
              <div className="h-[2px] w-12 bg-blue-700/60 rounded-full"></div>
              <p className="text-blue-700 font-normal">اراء عملاؤنا</p>
              <div className="h-[2px] w-12 bg-blue-700/60 rounded-full"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-medium text-slate-900 mb-6 font-sans">ماذا يقول عملاؤنا؟</h2>
            <p className="text-slate-500">نفخر بثقة عملائنا الكرام</p>
          </div>

          <div 
            ref={scrollContainerRef}
            onScroll={handleTestimonialScroll}
            className="flex overflow-x-auto pb-4 gap-8 scrollbar-hide snap-x" 
            dir="rtl"
          >
            {testimonials.map((t, idx) => (
              <motion.div 
                key={idx}
                className="min-w-[300px] md:min-w-[350px] bg-white p-6 rounded-2xl shadow-sm border border-slate-100 snap-center mobile-no-animate"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-normal text-xl">
                    {t.name[0]}
                  </div>
                  <div className="text-right">
                    <h4 className="font-medium text-slate-900">{t.name}</h4>
                    <p className="text-sm text-slate-400">{t.city}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-slate-600 leading-relaxed italic text-right font-normal">"{t.text}"</p>
                <p className="text-xs text-slate-400 mt-6 text-right">{t.time}</p>
              </motion.div>
            ))}
          </div>

          {/* Testimonial Pagination Dots */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToTestimonial(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeTestimonial === idx ? "w-6 bg-blue-600" : "bg-blue-200 hover:bg-blue-400"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="pt-16 pb-8 px-6 md:px-8 bg-slate-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-6 mb-4">
              <div className="h-[3px] w-12 md:w-16 bg-slate-900 rounded-full"></div>
              <h2 className="text-3xl md:text-4xl font-medium text-slate-900 font-sans underline decoration-blue-200 underline-offset-8">الأسئلة الشائعة</h2>
              <div className="h-[3px] w-12 md:w-16 bg-slate-900 rounded-full"></div>
            </div>
            <p className="text-slate-500 font-tajawal text-lg">إجابات على أكثر الأسئلة شيوعاً</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-slate-100 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors text-right group"
                >
                  <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${activeFaq === idx ? 'rotate-90' : ''}`} />
                  <span className="font-medium text-slate-900 text-base group-hover:text-blue-700 transition-colors">{faq.q}</span>
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-4 text-slate-600 leading-relaxed text-right md:text-base">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="about" className="bg-slate-50">
        <div className="w-full">
            <div 
               className="bg-blue-900 py-16 px-6 md:px-10 relative overflow-hidden"
            >
                {/* Logo background */}
                <div className="absolute -top-16 -right-16 w-64 h-64 opacity-5 pointer-events-none">
                     <img src={AdelLogo} alt="Logo" className="w-full h-full object-contain cta-bg-logo" />
                </div>

                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-2xl md:text-3xl font-normal text-white text-center mb-8 relative z-10 leading-tight font-sans mobile-no-animate"
                >
                    جاهز تبدأ؟ تواصل معنا الآن!
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto italic relative z-10 text-center mobile-no-animate"
                >
                    فريقنا المتخصص جاهز لمساعدتك في حل جميع مشاكلك المالية. لا تتردد في التواصل معنا اليوم.
                </motion.p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                    <motion.a 
                        href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => track('whatsapp_click')} 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} 
                        className="relative overflow-hidden bg-white text-blue-900 px-6 py-3 rounded-lg font-medium text-base hover:bg-blue-50 transition-colors flex items-center justify-center gap-3 shadow-lg mobile-no-animate"
                    >
                        <motion.div
                            className="absolute inset-0 z-10 pointer-events-none mobile-no-animate whatsapp-shimmer"
                            style={{
                                background: "linear-gradient(90deg, transparent, rgba(30,58,138,0.1), transparent)",
                                width: "100%",
                            }}
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear", repeatDelay: 1 }}
                        />
                        <div className="relative z-20 flex items-center justify-center gap-3">
                            <FaWhatsapp size={20} color="#1e3a8a" />
                            تواصل عبر الواتساب
                        </div>
                    </motion.a>
                    <motion.a 
                        href={`tel:${CONTACT_NUMBER}`} onClick={() => track('call_click')} 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} 
                        className="bg-blue-800 text-white border-2 border-white px-6 py-3 rounded-lg font-medium text-base hover:bg-blue-950 transition-colors flex items-center justify-center gap-3 shadow-lg mobile-no-animate"
                    >
                            <Phone className="w-4 h-4 text-white" />
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

function ModernStatItem({ value, label, icon }: { value: string, label: string, icon: ReactNode }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: "all" });
    
    // Parse numeric part
    const numericMatch = value.match(/[\d٠-٩][\d٠-٩,\u060C]*/);
    const numericValue = numericMatch ? parseInt(numericMatch[0].replace(/[,،]/g, '').replace(/[٠-٩]/g, (d) => '0123456789'['٠١٢٣٤٥٦٧٨٩'.indexOf(d)])) : 0;
    
    const count = useMotionValue(0);
    
    // Explicit conversion helper for Arabic-Indic digits with formatting
    const toArabicDigits = (num: number) => {
        return Math.round(num).toLocaleString('ar-SA');
    };
    
    const roundedArabic = useTransform(count, toArabicDigits);

    useEffect(() => {
        if (isInView) {
            animate(count, numericValue, { duration: 2.5, ease: "easeOut" });
        }
    }, [isInView, count, numericValue]);

    return (
        <motion.div 
            ref={ref} 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "all" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center group py-2 mobile-no-animate"
        >
            <div className="mb-2 inline-block p-2 rounded-2xl transition-colors">
                {icon}
            </div>
            <div className="text-3xl md:text-4xl font-black text-white mb-1 font-sans tracking-tight">
                {value.includes('+') && '+'}
                <motion.span>{roundedArabic}</motion.span>
                {value.includes('%') && '٪'}
                {value.includes('/') && value.substring(value.indexOf('/'))}
            </div>
            <div className="text-slate-400 font-medium text-xs md:text-sm">{label}</div>
        </motion.div>
    );
}

function FeatureCard({ title, description, icon }: { title: string, description: string, icon: ReactNode }) {
    return (
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white p-7 rounded-2xl shadow-lg border border-slate-100 mobile-no-animate"
        >
            <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-center mb-6 mr-0 ml-auto">
                {icon}
            </div>
            <h3 className="font-medium text-xl text-slate-900 mb-3">{title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
        </motion.div>
    );
}

function StepItem({ number, title, description, delay = 0 }: { number: string, title: string, description: string, delay?: number }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: delay * 0.1, ease: "easeOut" }}
            className="text-center relative mobile-no-animate"
        >
            <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center text-xl font-black mx-auto mb-3 shadow-xl relative z-10">
                {number}
                <div className="absolute inset-0 bg-blue-700 rounded-full scale-0 -z-10 transition-transform duration-500"></div>
            </div>
            <div className="mb-2">
                <ChevronRight className="w-5 h-5 text-amber-500 mx-auto rotate-90" />
            </div>
            <h4 className="text-xl font-medium text-slate-900 mb-2">{title}</h4>
            <p className="text-sm text-slate-500 italic max-w-xs mx-auto">{description}</p>
        </motion.div>
    );
}

function ServicesPage() {
  return (
    <div className="py-24 px-6 md:px-12">
      <div className="container mx-auto text-right">
        <h1 className="text-4xl font-medium text-slate-900 mb-12">خدماتنا بالتفصيل</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
    <div className="py-24 px-6 md:px-12 bg-slate-50">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-medium text-slate-900 mb-4">تواصل معنا الآن</h1>
          <p className="text-slate-500">نحن هنا للإجابة على استفساراتك وتقديم أفضل الحلول المالية عبر الاتصال أو الواتساب.</p>
        </div>

        <div className="flex justify-center">
          <div className="bg-slate-50 p-10 rounded-3xl text-right w-full max-w-lg">
            <h3 className="text-2xl font-medium mb-8 text-center">معلومات التواصل</h3>
            <div className="space-y-6">
              <ContactInfo icon={<Phone className="w-5 h-5" />} label="اتصال مباشر" value={CONTACT_NUMBER} />
              <ContactInfo icon={<FaWhatsapp size={20} />} label="واتساب" value="متاح 24/7" />
              <ContactInfo icon={<ShieldCheck className="w-5 h-5 text-blue-600" />} label="المنطقة" value="جميع أنحاء المملكة" />
            </div>
            
            <div className="mt-12 p-6 bg-blue-900 text-white rounded-2xl text-center">
              <p className="text-sm opacity-70 mb-2 font-normal uppercase tracking-wider">هل أنت مستعجل؟</p>
              <a href={`tel:${CONTACT_NUMBER}`} onClick={() => track('call_click')} className="text-2xl font-normal block hover:text-blue-200 transition-colors">اتصل الآن ضغطة واحدة</a>
            </div>
            <div className="mt-6 flex justify-center">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => track('whatsapp_click')} className="text-xl font-normal text-green-600 block hover:text-green-700 transition-colors">تواصل واتساب</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PrivacyPolicy() {
  return (
    <div className="py-24 px-6 md:px-12 bg-slate-50 text-right">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl font-medium text-slate-900 mb-8">سياسة الخصوصية</h1>
        <div className="prose prose-slate leading-relaxed text-slate-600 space-y-6">
          <p>خصوصية عملائنا هي أهم أولوياتنا. نحن نلتزم بحماية كافة البيانات الشخصية والمالية التي يتم تقديمها لنا.</p>
          <h3 className="text-xl font-medium text-slate-900">ما هي المعلومات التي نجمعها؟</h3>
          <p>نجمع المعلومات الضرورية فقط لمعالجة طلبك، مثل الاسم، رقم الهاتف، والبنك الحالي، وتفاصيل المديونية.</p>
          <h3 className="text-xl font-medium text-slate-900">كيف نستخدم بياناتك؟</h3>
          <p>تُستخدم البيانات حصرياً للتواصل معك وتقديم عروض التمويل والتسديد المناسبة لحالتك. لا نقوم بمشاركة أي من بياناتك مع أطراف ثالثة لأغراض تسويقية.</p>
        </div>
      </div>
    </div>
  );
}

function TermsOfUse() {
  return (
    <div className="py-24 px-6 md:px-12 bg-slate-50 text-right">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl font-medium text-slate-900 mb-8">شروط الخدمة</h1>
        <div className="prose prose-slate leading-relaxed text-slate-600 space-y-6">
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

// --- Helper Components ---

function SleekServiceCard({ icon, bgClass, textClass, title, description }: { icon: ReactNode, bgClass: string, textClass: string, title: string, description: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white p-7 rounded-2xl shadow-lg border border-slate-100 text-right mobile-no-animate"
    >
      <div className={`w-12 h-12 ${bgClass} ${textClass} rounded-xl flex items-center justify-center mb-6 mr-0 ml-auto`}>
        {icon}
      </div>
      <h3 className="font-medium text-xl text-slate-900 mb-3">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
    </motion.div>
  );
}

function DetailServiceCard({ title, content }: { title: string, content: string }) {
  const serviceWhatsAppUrl = `https://wa.me/966${CONTACT_NUMBER.substring(1)}?text=${encodeURIComponent(`السلام عليكم، أرغب في الاستفسار عن خدمة: ${title}`)}`;

  return (
    <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm h-full flex flex-col font-tajawal mobile-no-animate"
    >
      <h3 className="text-2xl font-medium text-blue-900 mb-4">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-sm">{content}</p>
      <div className="mt-auto pt-6 flex justify-end">
        <a 
          href={serviceWhatsAppUrl}
          target="_blank" rel="noopener noreferrer"
          onClick={() => track('whatsapp_click')}
          className="text-blue-700 font-normal flex items-center gap-2 group"
        >
          <span>طلب الخدمة عبر الواتساب</span>
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
}

function StatItem({ value, label }: { value: string, label: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex items-center gap-4 border-b sm:border-b-0 sm:border-l border-white/10 pb-6 sm:pb-0 sm:pl-12 last:border-0 last:pl-0 mobile-no-animate"
    >
      <div className="text-4xl font-normal text-amber-400">{value}</div>
      <div className="text-sm opacity-80 leading-tight italic font-normal">{label}</div>
    </motion.div>
  );
}

function ContactInfo({ icon, label, value }: { icon: ReactNode, label: string, value: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex items-center gap-4 justify-start flex-row-reverse mobile-no-animate"
    >
      <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs text-slate-400 font-normal">{label}</p>
        <p className="text-slate-900 font-normal">{value}</p>
      </div>
    </motion.div>
  );
}

function Input({ label, name, ...props }: { label: string, name: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-normal text-slate-700 block text-right">{label}</label>
      <input 
        name={name}
        {...props}
        className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-normal"
      />
    </div>
  );
}

function SleekFeatureItem({ title, description }: { title: string, description: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex gap-5 justify-end mobile-no-animate"
    >
      <div className="text-right">
        <h4 className="text-xl font-medium text-slate-900 mb-2">{title}</h4>
        <p className="text-slate-500 leading-relaxed max-w-sm">{description}</p>
      </div>
      <div className="mt-1 flex-shrink-0">
        <div className="bg-blue-50 p-2 rounded-xl">
          <CheckCircle2 className="w-5 h-5 text-blue-700" />
        </div>
      </div>
    </motion.div>
  );
}
