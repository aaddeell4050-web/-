import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Phone, User, Calendar, MessageSquare, CreditCard, Wallet, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Lead {
  id: string;
  fullName: string;
  phone: string;
  bankType: string;
  salary: string;
  message: string;
  createdAt: string;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/leads')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setLeads(data);
        } else {
          setError('حدث خطأ أثناء تحميل البيانات');
        }
      })
      .catch(err => {
        console.error(err);
        setError('تعذر الاتصال بالخادم');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 font-sans">طلبات التواصل والرسائل</h1>
            <p className="mt-2 text-gray-600">إجمالي الطلبات: {leads.length}</p>
          </div>
          <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="ml-2 w-5 h-5" />
            العودة للموقع
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 border-r-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {leads.length === 0 && !error ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-xl">لا توجد رسائل جديدة حتى الآن</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {leads.map((lead) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="bg-blue-600 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center text-white">
                    <Calendar className="w-4 h-4 ml-2" />
                    <span className="text-xs">
                      {new Date(lead.createdAt).toLocaleString('ar-SA')}
                    </span>
                  </div>
                  <span className="bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full">طلب رقم {lead.id.substring(0, 5)}</span>
                </div>
                
                <div className="p-5">
                  <div className="flex items-start mb-4">
                    <div className="bg-blue-50 p-2 rounded-lg ml-3">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">الاسم الكامل</p>
                      <p className="font-bold text-gray-900">{lead.fullName}</p>
                    </div>
                  </div>

                  <div className="flex items-start mb-4">
                    <div className="bg-green-50 p-2 rounded-lg ml-3">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">رقم الجوال</p>
                      <a href={`tel:${lead.phone}`} className="font-bold text-blue-600 hover:underline">{lead.phone}</a>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-start">
                      <div className="bg-purple-50 p-2 rounded-lg ml-3">
                        <CreditCard className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500">البنك</p>
                        <p className="text-xs font-semibold">{lead.bankType}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-yellow-50 p-2 rounded-lg ml-3">
                        <Wallet className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500">الراتب</p>
                        <p className="text-xs font-semibold">{lead.salary} ريال</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-50">
                    <p className="text-xs text-gray-500 mb-2 flex items-center">
                      <MessageSquare className="w-3 h-3 ml-1" />
                      الرسالة / التفاصيل:
                    </p>
                    <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {lead.message || 'لا يوجد نص رسالة'}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
