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
  Banknote
} from 'lucide-react';
import { useState, useEffect, type ReactNode, type FormEvent, type InputHTMLAttributes } from 'react';

const CONTACT_NUMBER = "0536429445";
const WHATSAPP_URL = `https://wa.me/966${CONTACT_NUMBER.substring(1)}?text=${encodeURIComponent('السلام عليكم، أرغب في الاستفسار عن خدمات تسديد القروض')}`;

// Types for TikTok Pixel
declare global {
  interface Window {
    ttq: any;
  }
}

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
    window.scrollTo(0, 0); // Scroll to top on route change
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
          <Link to="/" className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-700 rounded-lg flex items-center justify-center shadow-lg shadow-blue-200">
              <ShieldCheck className="text-white w-5 h-5 md:w-6 md:h-6" />
            </div>
            <span className="text-lg md:text-2xl font-bold tracking-tight text-blue-900 block">
              عادل لتسديد القروض
            </span>
          </Link>
          
          <div className="flex items-center gap-2 md:gap-8">
            <div className="hidden lg:flex items-center gap-6 text-slate-600 font-bold ml-8">
              <Link to="/" className="hover:text-blue-700 transition-colors">الرئيسية</Link>
              <Link to="/services" className="hover:text-blue-700 transition-colors">خدماتنا</Link>
              <Link to="/contact" className="hover:text-blue-700 transition-colors">تواصل معنا</Link>
            </div>
            <a href={`tel:${CONTACT_NUMBER}`} className="bg-blue-700 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full font-bold hover:bg-blue-800 transition-all shadow-md active:scale-95 leading-none h-fit flex items-center gap-2 text-sm md:text-base">
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
                <span className="text-xl font-bold text-white tracking-tight">عادل</span>
              </div>
              <p className="leading-relaxed text-sm">
                شريكك المالي الموثوق في المملكة العربية السعودية لسداد القروض مع عادل لتسديد القروض.
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
                <a href={`tel:${CONTACT_NUMBER}`} className="text-white font-bold text-lg">{CONTACT_NUMBER}</a>
                <a href={WHATSAPP_URL} target="_blank" className="text-green-500 font-bold">راسلنا واتساب</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-8 text-center text-xs font-medium uppercase tracking-[0.2em]">
            &copy; {new Date().getFullYear()} عادل لتسديد المتعثرات والتمويل. جميع الحقوق محفوظة
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
  return (
    <>
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full -mr-64 -mt-64 blur-3xl -z-10 pointer-events-none"></div>
      
      {/* Hero */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 px-6 md:px-12 text-center">
        <div className="container mx-auto">
          <div className="flex flex-col items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-slate-900 leading-[1.2] mb-6">
                تمويل يصل إلى 36 راتب <br/>
                <span className="text-blue-700">عادل السداد - حلولك المالية بين يديك</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-6 leading-relaxed mx-auto max-w-2xl">
                نقدم لك حلولاً مالية مبتكرة تشمل تسديد القروض البنكية حتى 36 راتب، رفع التعثرات من سمة، سداد البطاقات الائتمانية، واستخراج قروض لجميع البنوك بسرعة وسهولة.
              </p>
              
              <div className="flex gap-4 justify-center">
                  <a href={`tel:${CONTACT_NUMBER}`} className="bg-blue-700 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-800 transition-all flex items-center gap-2">
                      <Phone className="w-5 h-5" />
                      اتصل الآن
                  </a>
                  <a href={WHATSAPP_URL} target="_blank" className="bg-green-600 text-white px-6 py-3 rounded-full font-bold hover:bg-green-700 transition-all flex items-center gap-2">
                      <MessageCircle className="w-5 h-5" />
                      واتساب
                  </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="container mx-auto px-6 md:px-12 mb-24">
        <div className="flex flex-col lg:flex-row justify-between items-center p-8 md:p-12 bg-blue-900 rounded-[2.5rem] text-white overflow-hidden relative shadow-2xl">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 skew-x-12 -z-0 pointer-events-none"></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 z-10 w-full lg:w-auto">
            <StatItem value="100%" label="طرق شرعية ونظامية" />
            <StatItem value="+20" label="بنك نتعامل معه" />
            <StatItem value="24h" label="سرعة في الإنجاز" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="container mx-auto text-right">
          <h2 className="text-4xl font-black text-slate-900 mb-12">خدماتنا</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <DetailServiceCard                
              title="تسديد القروض البنكية"
              content="نقوم بسداد مديونياتك الحالية في جميع البنوك السعودية لتمكينك من البدء من جديد بنظام ائتماني نظيف."
            />
            <DetailServiceCard 
              title="فك إيقاف الخدمات"
              content="حلول سريعة لرفع إيقاف الخدمات الحكومية الناتج عن الالتزامات المالية المتعثرة."
            />
            <DetailServiceCard 
              title="تحديث سمة"
              content="إجراءات قانونية لتحديث سجلك في شركة سمة الائتمانية ورفع الحظر عنك."
            />
          </div>
        </div>
      </section>
    </>
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
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    console.log("Form submitted, attempting API fetch...");
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    if (!data.bankType) {
        alert("يرجى اختيار البنك");
        return;
    }

    setStatus('loading');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (!response.ok) throw new Error(result.message || 'Failed to send request');
      
      // Track TikTok Event on the client side
      if (window.ttq) {
        window.ttq.track('CompleteRegistration');
      }

      setStatus('success');
      form.reset();
    } catch (error) {
      console.error("Error sending request:", error);
      setStatus('error');
    }
  };

  return (
    <div className="py-24 px-6 md:px-12 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-black text-slate-900 mb-4">تواصل معنا الآن</h1>
          <p className="text-slate-500">نحن هنا للإجابة على استفساراتك وتقديم أفضل الحلول المالية.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-slate-50 p-10 rounded-3xl text-right">
            <h3 className="text-2xl font-bold mb-8">معلومات التواصل</h3>
            <div className="space-y-6">
              <ContactInfo icon={<Phone className="w-5 h-5" />} label="اتصال مباشر" value={CONTACT_NUMBER} />
              <ContactInfo icon={<MessageCircle className="w-5 h-5 text-green-500" />} label="واتساب" value="متاح 24/7" />
              <ContactInfo icon={<ShieldCheck className="w-5 h-5 text-blue-600" />} label="المنطقة" value="جميع أنحاء المملكة" />
            </div>
            
            <div className="mt-12 p-6 bg-blue-900 text-white rounded-2xl">
              <p className="text-sm opacity-70 mb-2 font-bold uppercase tracking-wider">هل أنت مستعجل؟</p>
              <a href={`tel:${CONTACT_NUMBER}`} className="text-2xl font-black block">اتصل الآن ضغطة واحدة</a>
            </div>
          </div>

          <div className="text-right">
            {status === 'success' ? (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-green-50 p-8 rounded-3xl border border-green-100 text-center">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-900 mb-2">تم الإرسال بنجاح</h3>
                <p className="text-green-700">سنتواصل معك في أقرب وقت ممكن.</p>
                <button onClick={() => setStatus('idle')} className="mt-6 text-green-900 font-bold underline">إرسال طلب آخر</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="الاسم الكامل" name="fullName" placeholder="أدخل اسمك" required />
                <Input label="رقم الجوال" name="phone" placeholder="05xxxxxxxx" type="tel" required />
                <div className="space-y-2 text-right">
                  <label className="text-sm font-bold text-slate-700 block text-right">نوع البنك</label>
                  <select 
                    name="bankType"
                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium appearance-none cursor-pointer"
                  >
                    <option value="">اختر البنك...</option>
                    <option value="الراجحي">الراجحي</option>
                    <option value="الأهلي">الأهلي</option>
                    <option value="الإنماء">الإنماء</option>
                    <option value="الرياض">الرياض</option>
                    <option value="العربي">العربي</option>
                    <option value="ساب">ساب</option>
                    <option value="الجزيرة">الجزيرة</option>
                    <option value="البلاد">البلاد</option>
                    <option value="الفرنسي">الفرنسي</option>
                    <option value="السعودي الأول للاستثمار">السعودي الأول للاستثمار</option>
                  </select>
                </div>
                <Input label="الراتب" name="salary" placeholder="أدخل راتبك" type="tel" pattern="[0-9]*" inputMode="numeric" required />
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 block text-right">رسالتك أو تفاصيل الطلب</label>
                  <textarea 
                    name="message"
                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all h-32"
                    placeholder="اشرح مديونيتك..."
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-blue-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-800 transition-all disabled:opacity-50 relative z-50"
                >
                  {status === 'loading' ? 'جاري الإرسال...' : 'إرسال الطلب'}
                </button>
              </form>
            )}
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
  return (
    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      <h3 className="text-2xl font-bold text-blue-900 mb-4">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-sm">{content}</p>
      <div className="mt-auto pt-6 flex justify-end">
        <Link to="/contact" className="text-blue-700 font-bold flex items-center gap-2 group">
          <span>طلب الخدمة</span>
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        </Link>
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
