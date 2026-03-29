import React, { useState, useEffect } from "react";
import { Sparkles, RefreshCw, Video, X, Download, Layout, Info } from "lucide-react";
import Button from "../../../components/common/Button";
import { LayoutType, Frame } from "../types";
import { FrameStrip } from "./FrameStrip";
import { exportFinalImage } from "../utils/imageExport";
import FrameSelectionModal from "./FrameSelectionModal";

interface ResultStepProps {
  photos: string[];
  selectedLayout: LayoutType;
  selectedFrame: Frame;
  recapVideoUrl?: string | null;
  onRetake: () => void;
  onBooking: () => void;
  onSelectFrame: (frame: Frame) => void;
}

const ResultStep: React.FC<ResultStepProps> = ({
  photos,
  selectedLayout,
  selectedFrame,
  recapVideoUrl,
  onRetake,
  onBooking,
  onSelectFrame,
}) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isFrameModalOpen, setIsFrameModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detect iOS devices
    const isIOSDevice = 
      /iPad|iPhone|iPod/.test(navigator.userAgent) || 
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    setIsIOS(isIOSDevice);
  }, []);

  const dataURLtoBlob = (dataurl: string) => {
    const arr = dataurl.split(',');
    const match = arr[0].match(/:(.*?);/);
    if (!match) return new Blob();
    const mime = match[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const handleDownload = async () => {
    if (isExporting) return;
    setIsExporting(true);
    try {
      const dataUrl = await exportFinalImage(selectedFrame, photos);
      
      // On iOS, automatic download is often blocked or fails with large data URLs.
      // The best experience is to show the image in a modal so they can long-press to save.
      if (isIOS) {
        setPreviewImage(dataUrl);
        setIsExporting(false);
        return;
      }

      // For other platforms, use the Blob + download attribute method
      const blob = dataURLtoBlob(dataUrl);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `photo-palette-${new Date().getTime()}.jpg`;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);

    } catch (err) {
      console.error("Download failed:", err);
      alert("Có lỗi khi tải ảnh về, vui lòng thử lại!");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="p-4 md:p-10 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-center min-h-[calc(100vh-120px)]">
      <div className="flex justify-center w-full transition-all duration-500">
        <FrameStrip
          frame={selectedFrame}
          filled={true}
          photos={photos}
          size="xl"
          disableHover={true}
          imageFit="cover"
        />
      </div>

      <div className="flex flex-col gap-5 w-full max-w-sm text-center lg:text-left animate-in slide-in-from-bottom-4 duration-700">
        <div className="space-y-2">
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Xinh quá trời ơi! 😍
          </h3>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Ghé studio để được chụp với ánh sáng chuyên nghiệp và nhận ảnh in xịn
            xò nhé!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-col gap-3.5 mt-2">
          <Button
            onClick={handleDownload}
            disabled={isExporting}
            className="bg-green-500 hover:bg-green-600 border-none shadow-lg shadow-green-100 h-12"
          >
            <Download size={18} className="mr-2" />
            {isExporting ? "Đang xử lý..." : "Tải Ảnh Về"}
          </Button>

          <Button
            variant="outline"
            onClick={() => setIsFrameModalOpen(true)}
            className="border-brand-200 text-brand-600 hover:bg-brand-50 h-12"
          >
            <Layout size={18} className="mr-2" />
            Đổi Khung Ảnh
          </Button>

          <Button 
            onClick={onBooking}
            className="h-12"
          >
            <Sparkles size={18} className="mr-2" />
            Đặt Lịch Chụp
          </Button>

          {recapVideoUrl && (
            <Button
              variant="outline"
              onClick={() => setIsVideoOpen(true)}
              className="border-pink-200 text-pink-500 hover:bg-pink-50 h-12"
            >
              <Video size={18} className="mr-2" />
              Video Recap
            </Button>
          )}

          <Button 
            variant="secondary" 
            onClick={onRetake}
            className="h-12"
          >
            <RefreshCw size={18} className="mr-2" />
            Chụp Lại
          </Button>
        </div>

        <p className="text-[11px] sm:text-xs text-brand-400 mt-2 italic opacity-80">
          *Ảnh sẽ không được lưu trên hệ thống để bảo vệ quyền riêng tư.
        </p>
      </div>

      {/* Frame Selection Modal */}
      <FrameSelectionModal
        isOpen={isFrameModalOpen}
        onClose={() => setIsFrameModalOpen(false)}
        onSelect={onSelectFrame}
        selectedFrameId={selectedFrame.id}
        selectedLayoutId={selectedLayout}
      />

      {/* Video Recap Modal */}
      {isVideoOpen && recapVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative bg-black rounded-2xl overflow-hidden max-w-lg w-full shadow-2xl aspect-[3/4] md:aspect-video max-h-[90vh]">
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/50 p-2 rounded-full z-10"
            >
              <X size={24} />
            </button>
            <video
              src={recapVideoUrl}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}

      {/* iOS Download/Save Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative flex flex-col items-center max-w-lg w-full gap-4">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white flex items-center gap-2 font-medium"
            >
              Đóng <X size={24} />
            </button>
            
            <div className="bg-white/10 text-white p-4 rounded-xl flex items-start gap-3 w-full border border-white/20">
              <Info className="flex-shrink-0 text-brand-300" size={20} />
              <p className="text-sm">
                <strong>iPhone/iPad:</strong> Nhấn giữ vào ảnh bên dưới và chọn <strong>"Lưu vào Ảnh"</strong> (Save to Photos) để tải về máy nhé!
              </p>
            </div>

            <div className="relative w-full overflow-hidden rounded-lg shadow-2xl">
              <img
                src={previewImage}
                alt="Your Photo Palette"
                className="w-full h-auto max-h-[70vh] object-contain mx-auto"
              />
            </div>
            
            <Button
              onClick={() => setPreviewImage(null)}
              className="bg-white text-slate-900 hover:bg-slate-100 w-full"
            >
              Đã hiểu
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultStep;
