import React, { useState, useEffect } from "react";
import { Scale, ShieldCheck } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const DisclaimerModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const hasSeen = localStorage.getItem("has_seen_disclaimer");
    const isReadingPolicy = location.pathname === "/privacy";
    const isAtHome = location.pathname === "/";

    setTimeout(() => {
      if (!hasSeen) {
        if (isReadingPolicy) {
          // Allow viewing policy without modal
          setIsOpen(false);
        } else if (!isAtHome) {
          // If user tries to go anywhere else (About, Gallery, etc.) without agreeing,
          // force them back to the home page where the modal is active.
          navigate("/", { replace: true });
          setIsOpen(true);
        } else {
          // Show modal on home page
          setIsOpen(true);
        }
      } else {
        setIsOpen(false);
      }
    }, 0);
  }, [location.pathname, navigate]);

  const handleClose = () => {
    localStorage.setItem("has_seen_disclaimer", "true");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300">
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all duration-300 scale-100 animate-slide-up border border-brand-100 flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="bg-brand-50 px-6 py-4 border-b border-brand-100 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-brand-100 p-2 rounded-full">
              <Scale className="w-5 h-5 text-brand-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-800" id="modal-title">
              Thông Báo Pháp Lý
            </h3>
          </div>
          {/* Close button removed to enforce agreement */}
        </div>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto flex-1 min-h-0 custom-scrollbar">
          {/* Body */}
          <div className="px-6 py-6 space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-1 space-y-3 text-slate-600">
                <p className="leading-relaxed">
                  Chào mừng bạn đến với <strong>Photo Palette</strong>!
                </p>
                <div className="text-sm bg-blue-50 text-blue-800 p-4 rounded-xl border border-blue-100 flex gap-3">
                  <span className="text-xl">📢</span>
                  <div>
                    <span className="font-bold block mb-1">Lưu ý:</span>
                    Đây là dự án cá nhân được phát triển với mục đích{" "}
                    <strong>học tập và nghiên cứu</strong>.
                  </div>
                </div>
                <p className="text-sm leading-relaxed">
                  Website này hoạt động <strong>PHI LỢI NHUẬN</strong>. Chúng
                  tôi không thu thập dữ liệu cá nhân hay sử dụng hình ảnh của
                  bạn cho mục đích thương mại.
                </p>
                <p className="text-sm text-slate-500 italic border-l-2 border-brand-200 pl-3">
                  Mọi tài nguyên hình ảnh chỉ mang tính chất minh họa cho giao
                  diện.
                </p>
              </div>
            </div>
          </div>

          {/* Checkbox Agreement */}
          <div className="px-6 pb-6">
            <label className="flex items-center gap-3 cursor-pointer group p-3 bg-slate-50 border border-slate-100 rounded-xl transition-all hover:border-brand-200">
              <div className="relative flex items-center justify-center flex-shrink-0">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                <div className="w-6 h-6 border-2 border-slate-300 rounded-lg peer-checked:bg-brand-600 peer-checked:border-brand-600 transition-all shadow-sm"></div>
                <svg
                  className="w-4 h-4 text-white absolute transform scale-0 peer-checked:scale-100 transition-transform duration-200 pointer-events-none"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="3.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-sm font-semibold text-slate-700 group-hover:text-brand-700 transition-colors select-none">
                Tôi đã đọc và đồng ý với nội dung trên
              </span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center flex-shrink-0">
          <Link
            to="/privacy?mode=read"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-brand-600 font-bold hover:underline hover:text-brand-700 px-2 py-1 flex items-center gap-1 group whitespace-nowrap"
          >
            Xem Chính sách
            <span className="group-hover:translate-x-1 transition-transform">
              &rarr;
            </span>
          </Link>
          <button
            onClick={handleClose}
            disabled={!isChecked}
            className={`w-full sm:w-auto px-8 py-3 font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3
                    ${
                      isChecked
                        ? "bg-brand-600 hover:bg-brand-700 text-white shadow-brand-500/20 transform active:scale-95"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                    }
                `}
          >
            <ShieldCheck className="w-5 h-5 flex-shrink-0" />
            <span>Đồng ý & Tiếp tục</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerModal;
