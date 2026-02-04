import React, { useMemo, useEffect } from 'react';
import Reveal from '../components/common/Reveal';
import { BRANCHES, Branch } from '../data/branches';
import { MapPin, Building2, Map, Store, Flag, Calendar, Star } from 'lucide-react';
import storyImage from '../assets/6.webp';

const AboutPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedCity, setSelectedCity] = React.useState('');
  const [selectedDistrict, setSelectedDistrict] = React.useState('');
  const [filteredBranches, setFilteredBranches] = React.useState(BRANCHES);
  const [selectedBranch, setSelectedBranch] = React.useState(BRANCHES[0]);

  // Extract unique cities
  const cities = useMemo(() => {
    return Array.from(new Set(BRANCHES.map(b => b.city))).sort();
  }, []);

  // Extract districts based on selected city
  const districts = useMemo(() => {
    if (!selectedCity) return [];
    return Array.from(new Set(BRANCHES.filter(b => b.city === selectedCity).map(b => b.area))).sort();
  }, [selectedCity]);

  // Handle Search
  const handleSearch = () => {
    let results = BRANCHES;
    if (selectedCity) {
      results = results.filter(b => b.city === selectedCity);
    }
    if (selectedDistrict) {
      results = results.filter(b => b.area === selectedDistrict);
    }
    setFilteredBranches(results);
    if (results.length > 0) {
      setSelectedBranch(results[0]);
    }
  };

  // Reset district when city changes
  useEffect(() => {
    setSelectedDistrict('');
  }, [selectedCity]);

  return (
    <div className="pt-20 min-h-screen bg-brand-50/30">


      {/* Brand Story */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left Side - Image */}
              <div className="relative">
                <div className="rounded-[2.5rem] overflow-hidden shadow-2xl aspect-square bg-slate-100 relative group">
                  <img 
                    src={storyImage} 
                    alt="Palette Studio Story" 
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105" 
                  />
                  </div>
                {/* Decorative blob */}
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-200 rounded-full blur-3xl opacity-50 -z-10"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-50 -z-10"></div>
              </div>

               {/* Right Side - Content */}
               <div>
                 <div>
                    <span className="inline-block px-3 py-1 bg-brand-100 text-brand-600 rounded-full text-[10px] font-bold tracking-wider mb-4 uppercase">
                      Câu Chuyện Thương Hiệu
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-brand-500 mb-6 leading-tight">
                      Photo Palette
                    </h1>
                    
                    <div className="space-y-6 text-slate-600 text-lg leading-relaxed mb-10">
                      <p>
                        Được thành lập với niềm đam mê văn hóa Photobooth Hàn Quốc
                      </p>
                      <p>
                        Từ một cửa hàng nhỏ, chúng tôi đã phát triển thành hệ thống Photobooth 
                        hàng đầu Việt Nam với 24 chi nhánh trải dài từ Bắc vào Nam, 
                        mang đến trải nghiệm chụp ảnh lấy ngay hiện đại, trẻ trung và đầy màu sắc.
                      </p>
                    </div>
                 </div>

                 {/* Stats Grid */}
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-slate-100">
                    <div>
                      <Store className="w-6 h-6 text-brand-400 mb-2" />
                      <div className="text-2xl font-bold text-slate-900">24</div>
                      <div className="text-xs text-slate-500 font-medium">Chi Nhánh</div>
                    </div>
                    <div>
                      <Flag className="w-6 h-6 text-brand-400 mb-2" />
                      <div className="text-2xl font-bold text-slate-900">6+</div>
                      <div className="text-xs text-slate-500 font-medium">Tỉnh Thành</div>
                    </div>
                    <div>
                      <Calendar className="w-6 h-6 text-brand-400 mb-2" />
                      <div className="text-2xl font-bold text-slate-900">3</div>
                      <div className="text-xs text-slate-500 font-medium">Năm Hoạt Động</div>
                    </div>
                    <div>
                      <Star className="w-6 h-6 text-brand-400 mb-2" />
                      <div className="text-2xl font-bold text-slate-900">4.9/5</div>
                      <div className="text-xs text-slate-500 font-medium">Đánh Giá</div>
                    </div>
                 </div>
               </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Branches Locator Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Hệ thống Chi Nhánh</h2>
          </Reveal>

          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden h-[700px] flex flex-col lg:flex-row">
            {/* Left Col: Search & List */}
            <div className="lg:w-1/3 flex flex-col h-full border-r border-slate-100">
               {/* Search Form */}
               <div className="bg-brand-50/50 p-6 border-b border-brand-100">
                  <div className="space-y-4">
                     <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Tỉnh / Thành Phố</label>
                        <select 
                           value={selectedCity}
                           onChange={(e) => setSelectedCity(e.target.value)}
                           className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none bg-white transition-all text-slate-700"
                        >
                           <option value="">Tất cả chi nhánh</option>
                           {cities.map(city => (
                              <option key={city} value={city}>{city}</option>
                           ))}
                        </select>
                     </div>
                     <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Quận / Huyện</label>
                        <select 
                           value={selectedDistrict}
                           onChange={(e) => setSelectedDistrict(e.target.value)}
                           disabled={!selectedCity}
                           className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none bg-white transition-all text-slate-700 disabled:bg-slate-100 disabled:text-slate-400"
                        >
                           <option value="">Tất cả khu vực</option>
                           {districts.map(dist => (
                              <option key={dist} value={dist}>{dist}</option>
                           ))}
                        </select>
                     </div>
                     <button 
                        onClick={handleSearch}
                        className="w-full bg-brand-500 text-white font-bold py-3 rounded-xl hover:bg-brand-600 transition-all shadow-md hover:shadow-lg active:scale-95 transform duration-150"
                     >
                        Tìm Kiếm
                     </button>
                  </div>
               </div>

               {/* Results List */}
               <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar bg-slate-50/30">
                  {filteredBranches.map(branch => (
                     <div 
                        key={branch.id}
                        onClick={() => setSelectedBranch(branch)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${selectedBranch?.id === branch.id ? 'bg-brand-500 border-brand-500 ring-2 ring-brand-200 shadow-md' : 'bg-white border-slate-100 hover:border-brand-200 hover:shadow-sm'}`}
                     >
                        <h4 className={`font-bold text-sm mb-1 ${selectedBranch?.id === branch.id ? 'text-white' : 'text-slate-800'}`}>
                           {branch.name}
                        </h4>
                        <div className="flex items-start gap-2">
                           <MapPin size={14} className={`mt-0.5 flex-shrink-0 ${selectedBranch?.id === branch.id ? 'text-brand-100' : 'text-slate-400'}`} />
                           <p className={`text-xs ${selectedBranch?.id === branch.id ? 'text-brand-50' : 'text-slate-500'}`}>
                              {branch.address || "Đang cập nhật địa chỉ"}
                           </p>
                        </div>
                     </div>
                  ))}
                  {filteredBranches.length === 0 && (
                     <div className="text-center py-12 text-slate-500 text-sm">
                        <MapPin size={32} className="mx-auto mb-3 opacity-20" />
                        Không tìm thấy chi nhánh nào.
                     </div>
                  )}
               </div>
            </div>

            {/* Right Col: Google Map */}
            <div className="lg:w-2/3 h-full bg-slate-100 relative">
               {selectedBranch ? (
                  <iframe 
                     width="100%" 
                     height="100%" 
                     id="gmap_canvas" 
                     src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedBranch.address ? selectedBranch.name + " " + selectedBranch.address : selectedBranch.city)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                     frameBorder="0" 
                     scrolling="no" 
                     marginHeight={0} 
                     marginWidth={0}
                     className="w-full h-full"
                     title="Branch Map"
                  ></iframe>
               ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-50">
                     <div className="text-center">
                        <Map size={48} className="mx-auto mb-2 opacity-50" />
                        <p>Chọn một chi nhánh để xem bản đồ</p>
                     </div>
                  </div>
               )}
            </div>
          </div>
        </div>
      </section>

      <style>{`
         .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
         }
         .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 4px;
         }
         .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 4px;
         }
         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
         }
      `}</style>
    </div>
  );
};

export default AboutPage;
