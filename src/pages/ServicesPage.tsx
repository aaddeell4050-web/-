import React, { useState } from "react";
import { DetailServiceCard } from "../components/Cards";

export default function ServicesPage() {
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