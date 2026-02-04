import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../common/Button';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if scrolled for styling
      setIsScrolled(currentScrollY > 20);

      // Determine visibility
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past threshold -> Hide
        setIsVisible(false);
      } else {
        // Scrolling up -> Show
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: 'Trang chủ', path: '/', type: 'page' },
    { name: 'Giới thiệu', path: '/about', type: 'page' },
    { name: 'Bộ sưu tập', path: '/gallery', type: 'page' },
    { name: 'Dịch vụ', path: '/#features', type: 'scroll', id: 'features' },
    { name: 'Liên hệ', path: '/contact', type: 'page' },
  ];

  const handleNavigation = (link: { name: string, path: string, type: string, id?: string }) => {
    setIsOpen(false);
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

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const handleBooking = () => {
     setIsOpen(false);
     if (location.pathname === '/') {
        const element = document.getElementById('photobooth');
        if (element) {
           element.scrollIntoView({ behavior: 'smooth' });
        }
     } else {
        navigate('/#photobooth');
     }
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 select-none ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={handleLogoClick}>
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md rotate-3">
              <img src="/logo.jpeg" alt="Palette Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-2xl font-bold text-slate-800 tracking-tight">
              Photo Palette
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name} 
                onClick={() => handleNavigation(link)}
                className="text-slate-600 hover:text-brand-500 font-medium transition-colors bg-transparent border-none cursor-pointer"
              >
                {link.name}
              </button>
            ))}
            <Button onClick={handleBooking}>
              Chụp Thử Ngay
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-slate-600 hover:text-brand-500 p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-brand-100 shadow-xl p-4 flex flex-col gap-4 animate-in fade-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <button
              key={link.name} 
              onClick={() => handleNavigation(link)}
              className="text-lg font-medium text-slate-700 py-2 border-b border-slate-50 text-left w-full hover:text-brand-500 transition-colors"
            >
              {link.name}
            </button>
          ))}
          <Button fullWidth onClick={handleBooking}>
            Chụp Thử Ngay
          </Button>
        </div>
      )}
    </header>
  );
};

export default Navbar;