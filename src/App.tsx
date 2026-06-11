/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
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
  User,
  Star
} from 'lucide-react';
import { useState, useEffect, type ReactNode, type FormEvent, type InputHTMLAttributes } from 'react';
import LeadsPage from './components/LeadsPage';
// heroGraphic removed - using static public asset for SEO persistence


const CONTACT_NUMBER = "0555381525";
const WHATSAPP_URL = `https://wa.me/966${CONTACT_NUMBER.substring(1)}?text=${encodeURIComponent('السلام عليكم، أرغب في الاستفسار عن خدمات تسديد القروض')}`;


const track = (event: string) => {
  // Map both whatsapp_click and call_click to the standard TikTok Pixel 'Contact' event (حدث الاتصال)
  // This guarantees TikTok Ads Manager tracks and optimizes conversions perfectly for both click types.
  // @ts-ignore
  window.ttq?.track('Contact', {
    content_name: event === 'whatsapp_click' ? 'WhatsApp Chat' : 'Phone Call',
    content_category: 'Direct Contact'
  });
};

export default function App() {
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
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    // Scroll to top on route change
    window.scrollTo(0, 0); 
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  return (
    <div className="min-h-screen bg-slate-50 font-tajawal selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden flex flex-col">
      {/* Navbar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-20 flex items-center px-6 md:px-12 border-b ${
          scrolled ? 'bg-white/95 backdrop-blur-md border-slate-200 shadow-sm' : 'bg-white/50 backdrop-blur-sm border-transparent'
        }`}
      >
        <div className="container mx-auto flex justify-between items-center text-right">
          <Link to="/" className="flex items-center gap-2 md:gap-3 group">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
              <ShieldCheck className="text-white w-5 h-5 md:w-6 md:h-6" />
            </div>
            <span className="text-lg md:text-2xl font-black tracking-tight text-slate-900 block group-hover:text-blue-700 transition-colors">
              عادل <span className="text-blue-700">السداد</span>
            </span>
          </Link>
          
          <div className="flex items-center gap-2 md:gap-8">
            <div className="hidden lg:flex items-center gap-6 text-slate-600 font-bold ml-8">
              <Link to="/" className="hover:text-blue-700 transition-colors">الرئيسية</Link>
              <a href="#services" className="hover:text-blue-700 transition-colors">خدماتنا</a>
              <a href="#features" className="hover:text-blue-700 transition-colors">مميزاتنا</a>
              <a href="#testimonials" className="hover:text-blue-700 transition-colors">آراء العملاء</a>
              <a href="#about" className="hover:text-blue-700 transition-colors">من نحن</a>
              <a href="#faq" className="hover:text-blue-700 transition-colors">الدعم</a>
            </div>
            <a 
          href={`tel:${CONTACT_NUMBER}`} 
          onClick={() => track('call_click')}
          className="bg-blue-700 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full font-bold hover:bg-blue-800 transition-all shadow-md active:scale-95 leading-none h-fit flex items-center gap-2 text-sm md:text-base">
              <Phone className="w-3.5 h-3.5 md:w-4 h-4" />
              <span>اتصل الآن</span>
            </a>
          </div>
        </div>
      </nav>

      <main className="flex-grow pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-16 bg-slate-900 text-slate-400 px-6 md:px-12">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-12 text-right mb-16">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
                  <ShieldCheck className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">عادل السداد</span>
              </div>
              <p className="leading-relaxed text-sm">
                شريكك المالي الموثوق في المملكة العربية السعودية لسداد القروض مع عادل السداد.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">روابط سريعة</h4>
              <ul className="space-y-4 text-sm">
                <li><Link to="/" className="hover:text-white transition-colors">الرئيسية</Link></li>
                <li><Link to="/services" className="hover:text-white transition-colors">خدماتنا</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">اتصل بنا</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">قانوني</h4>
              <ul className="space-y-4 text-sm">
                <li><Link to="/privacy" className="hover:text-white transition-colors">سياسة الخصوصية</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">شروط الخدمة</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">تواصل معنا</h4>
              <p className="text-sm mb-4">نخدمكم في جميع أنحاء المملكة</p>
              <div className="flex flex-col gap-2">
                <a href={`tel:${CONTACT_NUMBER}`} onClick={() => track('call_click')} className="text-white font-bold text-lg">{CONTACT_NUMBER}</a>
                <p className="text-sm">واتساب: {CONTACT_NUMBER}</p>
                <a href={WHATSAPP_URL} target="_blank" onClick={() => track('whatsapp_click')} className="text-green-500 font-bold hover:underline">المملكة العربية السعودية</a>
                <p className="text-xs mt-2 opacity-60 flex items-center justify-end gap-1">
                   <span>الأحد - الخميس، 8 ص - 12 م</span>
                   <Lock className="w-3 h-3" />
                </p>
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
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-[99] items-end">
        <motion.a 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={WHATSAPP_URL}
          target="_blank"
          onClick={() => track('whatsapp_click')}
          className="bg-green-600 text-white pl-6 pr-4 py-3 rounded-full shadow-2xl shadow-green-500/30 hover:bg-green-700 transition-all flex items-center gap-3 group"
        >
          <span className="font-bold text-sm md:text-base">تواصل واتساب</span>
          <div className="bg-white/20 p-2 rounded-full">
            <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
          </div>
        </motion.a>
      </div>
    </div>
  );
}

// --- Pages ---

function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

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
    { q: "ما هي خدمات عادل السداد؟", a: "نقدم خدمات تسديد القروض البنكية، رفع التعثرات من سمة، فك إيقاف الخدمات، وتوفير سيولة نقدية حتى 36 راتب لجميع البنوك." },
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
      <section className="relative pt-12 pb-16 lg:pt-24 lg:pb-32 px-6 md:px-12 text-center overflow-hidden">
        <div className="container mx-auto">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6 relative"
          >
            <div className="relative z-10 max-w-[600px] mx-auto">
               <img 
                 src="/og-image.png" 
                 alt="عادل السداد لتسديد القروض - 36 راتب ومميزات بنكية" 
                 className="w-full h-auto hover:rotate-1 hover:scale-105 transition-all duration-700 mix-blend-multiply"
                 referrerPolicy="no-referrer"
               />
            </div>
            
            {/* Soft shadow for the graphic itself */}
            <div className="absolute top-[85%] left-1/2 -translate-x-1/2 w-[50%] h-[15px] bg-blue-900/10 blur-2xl rounded-full -z-10"></div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 leading-tight mb-8">
              عادل السداد — <span className="text-blue-700 drop-shadow-sm">حلولك المالية بين يديك</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-12 leading-relaxed max-w-3xl mx-auto font-medium italic">
              نقدم لك حلولاً مالية مبتكرة تشمل تسديد القروض البنكية حتى 36 راتب، رفع التعثرات من سمة، سداد البطاقات الائتمانية، واستخراج قروض لجميع البنوك بسرعة وسهولة.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a href={WHATSAPP_URL} target="_blank" onClick={() => track('whatsapp_click')} className="bg-green-600 text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-green-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-green-200">
                    <MessageCircle className="w-6 h-6" />
                    تواصل عبر الواتساب
                </a>
                <a href={`tel:${CONTACT_NUMBER}`} onClick={() => track('call_click')} className="bg-white border-2 border-slate-200 text-slate-900 px-10 py-5 rounded-2xl font-black text-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
                    <Phone className="w-6 h-6 text-blue-700" />
                    اتصل بنا الآن
                </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-slate-900 py-16 px-6 md:px-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <ModernStatItem value="+5,000" label="عميل سعيد" icon={<User className="w-6 h-6 text-blue-400" />} />
            <ModernStatItem value="+10,000" label="خدمة منجزة" icon={<CheckCircle2 className="w-6 h-6 text-green-400" />} />
            <ModernStatItem value="98%" label="نسبة الرضا" icon={<TrendingUp className="w-6 h-6 text-amber-400" />} />
            <ModernStatItem value="24/7" label="دعم متواصل" icon={<Lock className="w-6 h-6 text-purple-400" />} />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 md:px-12 bg-white">
        <div className="container mx-auto text-center font-tajawal">
          <div className="mb-16">
            <p className="text-blue-700 font-bold mb-4">خدماتنا</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 font-sans">ماذا نقدم لك؟</h2>
            <p className="text-slate-500 max-w-2xl mx-auto italic">حلول مالية شاملة ومتكاملة تلبي جميع احتياجاتك المالية بكل احترافية وسرعة</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SleekServiceCard 
              icon={<CreditCard className="w-8 h-8" />}
              title="تسديد القروض البنكية"
              description="نسدد قروضك البنكية حتى 36 راتب مع أفضل الحلول والعروض التنافسية لجميع البنوك السعودية."
              bgClass="bg-blue-50"
              textClass="text-blue-700"
            />
            <SleekServiceCard 
              icon={<ShieldCheck className="w-8 h-8" />}
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
                 icon={<MessageCircle className="w-8 h-8" />}
                 title="تسديد شركات التمويل"
                 description="نتولى تسديد مديونياتك لدى شركات التمويل المختلفة وإعادة هيكلة التزاماتك المالية."
                 bgClass="bg-blue-50"
                 textClass="text-blue-700"
            />
          </div>
        </div>
      </section>

      {/* Why Us / Features */}
      <section id="features" className="py-32 px-6 md:px-12 bg-slate-50 overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-700 font-bold mb-4">لماذا نحن</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 font-sans">مميزاتنا</h2>
            <p className="text-slate-500 max-w-2xl mx-auto italic">نتميز بتقديم خدمات مالية عالية الجودة تضمن رضاك الكامل</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <FeatureCard title="سرعة إنجاز فورية" description="ننجز معاملاتك في أسرع وقت ممكن بدون تأخير أو تعقيد." icon={<TrendingUp className="w-6 h-6" />} />
            <FeatureCard title="أسعار تنافسية" description="نقدم أفضل الأسعار والعروض مقارنة بالسوق مع شفافية كاملة." icon={<Scale className="w-6 h-6" />} />
            <FeatureCard title="سرية تامة" description="نضمن لك سرية كاملة لمعلوماتك الشخصية والمالية." icon={<ShieldCheck className="w-6 h-6" />} />
            <FeatureCard title="دعم متواصل" description="فريق دعم متخصص جاهز لمساعدتك على مدار الساعة." icon={<Phone className="w-6 h-6" />} />
            <FeatureCard title="خبرة واسعة" description="سنوات من الخبرة في مجال الحلول المالية مع آلاف العملاء الراضين." icon={<Lock className="w-6 h-6" />} />
            <FeatureCard title="حلول مرنة" description="نقدم حلولاً مالية مرنة ومخصصة تناسب وضعك المالي." icon={<TrendingUp className="w-6 h-6" />} />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-32 px-6 md:px-12 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-20 font-tajawal">
            <p className="text-blue-700 font-bold mb-4">كيف نعمل</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 font-sans">خطوات بسيطة وسهلة</h2>
            <p className="text-slate-500">نجعل الأمر سهلاً وبسيطاً</p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -translate-y-1/2 -z-10"></div>
            <div className="grid lg:grid-cols-4 gap-12">
              <StepItem number="1" title="تواصل معنا" description="تواصل معنا عبر الواتساب أو الاتصال المباشر" />
              <StepItem number="2" title="نفهم احتياجاتك" description="ندرس وضعك المالي ونقدم لك أفضل الحلول" />
              <StepItem number="3" title="ننفذ بإتقان" description="نبدأ في تنفيذ الحل المتفق عليه بسرعة ودقة" />
              <StepItem number="4" title="نضمن رضاك" description="نتابع معك حتى إتمام الخدمة ونضمن رضاك التام" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-32 px-6 md:px-12 bg-slate-50 overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-16 font-tajawal">
            <p className="text-blue-700 font-bold mb-4">آراء العملاء</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 font-sans">ماذا يقول عملاؤنا؟</h2>
            <p className="text-slate-500">نفخر بثقة عملائنا الكرام</p>
          </div>

          <div className="flex overflow-x-auto pb-12 gap-8 scrollbar-hide snap-x" dir="rtl">
            {testimonials.map((t, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="min-w-[300px] md:min-w-[400px] bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 snap-center"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-black text-xl">
                    {t.name[0]}
                  </div>
                  <div className="text-right">
                    <h4 className="font-bold text-slate-900">{t.name}</h4>
                    <p className="text-sm text-slate-400">{t.city}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-slate-600 leading-relaxed italic text-right font-medium">"{t.text}"</p>
                <p className="text-xs text-slate-400 mt-6 text-right">{t.time}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-32 px-6 md:px-12 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16 underline decoration-blue-200 underline-offset-8">
            <h2 className="text-4xl font-black text-slate-900 mb-6 font-sans">الأسئلة الشائعة</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-slate-100 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-8 py-6 flex items-center justify-between hover:bg-slate-50 transition-colors text-right group"
                >
                  <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${activeFaq === idx ? 'rotate-90' : ''}`} />
                  <span className="font-bold text-slate-900 text-lg group-hover:text-blue-700 transition-colors">{faq.q}</span>
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-8 pb-6 text-slate-600 leading-relaxed text-right md:text-lg"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="about" className="py-24 px-6 md:px-12 bg-slate-50">
        <div className="container mx-auto max-w-5xl text-center">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight font-sans">جاهز تبدأ؟ تواصل معنا الآن!</h2>
            <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto italic">فريقنا المتخصص جاهز لمساعدتك في حل جميع مشاكلك المالية. لا تتردد في التواصل معنا اليوم.</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a href={WHATSAPP_URL} target="_blank" onClick={() => track('whatsapp_click')} className="bg-green-600 text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-green-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-green-100">
                    <MessageCircle className="w-6 h-6" />
                    تواصل عبر الواتساب
                </a>
                <a href={`tel:${CONTACT_NUMBER}`} onClick={() => track('call_click')} className="bg-blue-700 text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-blue-800 transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-100">
                    <Phone className="w-6 h-6" />
                    اتصل بنا الآن
                </a>
            </div>
        </div>
      </section>
    </>
  );
}

function ModernStatItem({ value, label, icon }: { value: string, label: string, icon: ReactNode }) {
    return (
        <div className="text-center group border-l last:border-l-0 border-white/5 py-4">
            <div className="mb-4 inline-block p-4 rounded-3xl bg-white/5 group-hover:bg-white/10 transition-colors">
                {icon}
            </div>
            <div className="text-4xl md:text-5xl font-black text-white mb-2 font-sans tracking-tighter">{value}</div>
            <div className="text-slate-400 font-bold uppercase tracking-widest text-xs md:text-sm">{label}</div>
        </div>
    );
}

function FeatureCard({ title, description, icon }: { title: string, description: string, icon: ReactNode }) {
    return (
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group text-right">
            <div className="w-14 h-14 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-700 group-hover:text-white transition-colors mr-0 ml-auto">
                {icon}
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-4">{title}</h3>
            <p className="text-slate-500 leading-relaxed italic">{description}</p>
        </div>
    );
}

function StepItem({ number, title, description }: { number: string, title: string, description: string }) {
    return (
        <div className="text-center relative group">
            <div className="w-20 h-20 bg-slate-900 text-white rounded-full flex items-center justify-center text-3xl font-black mx-auto mb-8 shadow-xl relative z-10 group-hover:scale-110 transition-transform">
                {number}
                <div className="absolute inset-0 bg-blue-700 rounded-full scale-0 group-hover:scale-100 -z-10 transition-transform duration-500"></div>
            </div>
            <div className="mb-4">
                <ChevronRight className="w-6 h-6 text-amber-500 mx-auto rotate-90" />
            </div>
            <h4 className="text-2xl font-black text-slate-900 mb-4">{title}</h4>
            <p className="text-slate-500 italic">{description}</p>
        </div>
    );
}

function ServicesPage() {
  return (
    <div className="py-24 px-6 md:px-12">
      <div className="container mx-auto text-right">
        <h1 className="text-4xl font-black text-slate-900 mb-12">خدماتنا بالتفصيل</h1>
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
    <div className="py-24 px-6 md:px-12 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-black text-slate-900 mb-4">تواصل معنا الآن</h1>
          <p className="text-slate-500">نحن هنا للإجابة على استفساراتك وتقديم أفضل الحلول المالية عبر الاتصال أو الواتساب.</p>
        </div>

        <div className="flex justify-center">
          <div className="bg-slate-50 p-10 rounded-3xl text-right w-full max-w-lg">
            <h3 className="text-2xl font-bold mb-8 text-center">معلومات التواصل</h3>
            <div className="space-y-6">
              <ContactInfo icon={<Phone className="w-5 h-5" />} label="اتصال مباشر" value={CONTACT_NUMBER} />
              <ContactInfo icon={<MessageCircle className="w-5 h-5 text-green-500" />} label="واتساب" value="متاح 24/7" />
              <ContactInfo icon={<ShieldCheck className="w-5 h-5 text-blue-600" />} label="المنطقة" value="جميع أنحاء المملكة" />
            </div>
            
            <div className="mt-12 p-6 bg-blue-900 text-white rounded-2xl text-center">
              <p className="text-sm opacity-70 mb-2 font-bold uppercase tracking-wider">هل أنت مستعجل؟</p>
              <a href={`tel:${CONTACT_NUMBER}`} onClick={() => track('call_click')} className="text-2xl font-black block hover:text-blue-200 transition-colors">اتصل الآن ضغطة واحدة</a>
            </div>
            <div className="mt-6 flex justify-center">
                <a href={WHATSAPP_URL} target="_blank" onClick={() => track('whatsapp_click')} className="text-xl font-black text-green-600 block hover:text-green-700 transition-colors">تواصل واتساب</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PrivacyPolicy() {
  return (
    <div className="py-24 px-6 md:px-12 bg-white text-right">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl font-black text-slate-900 mb-8">سياسة الخصوصية</h1>
        <div className="prose prose-slate leading-relaxed text-slate-600 space-y-6">
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
    <div className="py-24 px-6 md:px-12 bg-white text-right">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl font-black text-slate-900 mb-8">شروط الخدمة</h1>
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
    <div className="bg-white p-7 rounded-2xl shadow-lg border border-slate-100 hover:border-blue-200 transition-all group hover:-translate-y-1 text-right">
      <div className={`w-12 h-12 ${bgClass} ${textClass} rounded-xl flex items-center justify-center mb-6 transition-colors group-hover:bg-blue-700 group-hover:text-white mr-0 ml-auto`}>
        {icon}
      </div>
      <h3 className="font-bold text-xl text-slate-900 mb-3">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
    </div>
  );
}

function DetailServiceCard({ title, content }: { title: string, content: string }) {
  const serviceWhatsAppUrl = `https://wa.me/966${CONTACT_NUMBER.substring(1)}?text=${encodeURIComponent(`السلام عليكم، أرغب في الاستفسار عن خدمة: ${title}`)}`;

  return (
    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col font-tajawal">
      <h3 className="text-2xl font-bold text-blue-900 mb-4">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-sm">{content}</p>
      <div className="mt-auto pt-6 flex justify-end">
        <a 
          href={serviceWhatsAppUrl}
          target="_blank"
          onClick={() => track('whatsapp_click')}
          className="text-blue-700 font-bold flex items-center gap-2 group"
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
    <div className="flex items-center gap-4 border-b sm:border-b-0 sm:border-l border-white/10 pb-6 sm:pb-0 sm:pl-12 last:border-0 last:pl-0">
      <div className="text-4xl font-bold text-amber-400">{value}</div>
      <div className="text-sm opacity-80 leading-tight italic font-medium">{label}</div>
    </div>
  );
}

function ContactInfo({ icon, label, value }: { icon: ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center gap-4 justify-start flex-row-reverse">
      <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs text-slate-400 font-medium">{label}</p>
        <p className="text-slate-900 font-bold">{value}</p>
      </div>
    </div>
  );
}

function Input({ label, name, ...props }: { label: string, name: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-slate-700 block text-right">{label}</label>
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
    <div className="flex gap-5 justify-end">
      <div className="text-right">
        <h4 className="text-xl font-bold text-slate-900 mb-2">{title}</h4>
        <p className="text-slate-500 leading-relaxed max-w-sm">{description}</p>
      </div>
      <div className="mt-1 flex-shrink-0">
        <div className="bg-blue-50 p-2 rounded-xl">
          <CheckCircle2 className="w-5 h-5 text-blue-700" />
        </div>
      </div>
    </div>
  );
}
