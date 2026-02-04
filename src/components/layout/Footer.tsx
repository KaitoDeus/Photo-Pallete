import React from 'react';
import { Instagram, MapPin, Phone, Facebook } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (link: { path: string, type: string, id?: string }) => {
    if (link.type === 'page') {
      navigate(link.path);
      window.scrollTo(0, 0);
    } else if (link.type === 'scroll' && link.id) {
      if (location.pathname === '/') {
        const element = document.getElementById(link.id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate(`/#${link.id}`);
      }
    }
  };

  const footerLinks = [
    { name: 'Giới thiệu', path: '/about', type: 'page' },
    { name: 'Thư viện', path: '/gallery', type: 'page' },
    { name: 'Bảng giá', path: '/#pricing', type: 'scroll', id: 'pricing' },
    { name: 'Đánh giá', path: '/#testimonials', type: 'scroll', id: 'testimonials' },
  ];

  return (
    <footer className="bg-brand-50 pt-16 pb-8 border-t border-brand-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md rotate-3">
                <img src="/logo.jpeg" alt="Palette Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-xl font-bold text-slate-800">Photo Palette</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Lưu giữ bản sắc riêng của bạn trong không gian sáng tạo và thoải mái nhất.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Khám Phá</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={() => handleNavigation(link)} 
                    className="hover:text-brand-500 transition-colors cursor-pointer block bg-transparent border-none p-0 text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Liên Hệ</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-brand-400" />
                <span>+84 90 123 4567</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-brand-400 mt-0.5" />
                <div>
                   <span className="block mb-1 font-medium">Hệ thống 24 chi nhánh</span>
                   <button 
                      onClick={() => { navigate('/about'); window.scrollTo(0,0); }}
                      className="text-brand-500 hover:text-brand-600 font-medium hover:underline text-xs flex items-center gap-1 cursor-pointer bg-transparent border-none p-0 transition-colors"
                   >
                      Tìm chi nhánh gần bạn &rarr;
                   </button>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Theo Dõi</h4>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/photopalette_vn/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-500 hover:bg-brand-400 hover:text-white transition-all">
                <Instagram size={20} />
              </a>
              <a href="https://www.tiktok.com/@photopalette_vn" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-500 hover:bg-brand-400 hover:text-white transition-all">
                {/* Custom TikTok Icon since it might not be in the current Lucide version */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
              <a href="https://www.facebook.com/photopalettevn" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-500 hover:bg-brand-400 hover:text-white transition-all">
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} Photo Palette</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;