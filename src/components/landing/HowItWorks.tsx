import React from 'react';
import Reveal from '../common/Reveal';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: "01",
      title: "Đặt Lịch",
      text: "Chọn ngày, giờ và gói chụp phù hợp chỉ với vài cú click."
    },
    {
      num: "02",
      title: "Chụp Ảnh",
      text: "Đến studio, chọn phụ kiện và tự do tạo dáng với điều khiển từ xa."
    },
    {
      num: "03",
      title: "Nhận Ảnh",
      text: "Chọn những tấm đẹp nhất. Ảnh sẽ được in ra ngay lập tức để bạn mang về."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-brand-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Quy Trình Đơn Giản
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-brand-200 -z-10" />

          {steps.map((step, idx) => (
            <Reveal key={idx} delay={idx * 0.2} className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-white rounded-full border-4 border-brand-100 flex items-center justify-center shadow-lg mb-6 text-3xl font-bold text-brand-400">
                {step.num}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{step.title}</h3>
              <p className="text-slate-600 max-w-xs">{step.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;