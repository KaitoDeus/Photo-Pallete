import React from 'react';
import Button from '../../../components/common/Button';

interface InstructionStepProps {
  permissionDenied: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
  onRetryPermission: () => void;
  onStartCapture: () => void;
}

const InstructionStep: React.FC<InstructionStepProps> = ({
  permissionDenied,
  videoRef,
  onRetryPermission,
  onStartCapture,
}) => {
  return (
    <div className="p-8 text-center h-full flex flex-col justify-center items-center">
      {permissionDenied ? (
        <div className="text-red-500">
          <p className="mb-4">Không thể truy cập camera. Vui lòng cấp quyền để tiếp tục.</p>
          <Button onClick={onRetryPermission} variant="secondary">Thử lại</Button>
        </div>
      ) : (
        <>
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Sẵn Sàng Chưa?</h3>
          <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-xl mb-6 w-full max-w-sm aspect-[3/4] relative mx-auto">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className="w-full h-full object-cover transform -scale-x-100" 
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/10">
              <span className="text-white/80 text-sm font-medium bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">Preview</span>
            </div>
          </div>
          
          <ul className="text-slate-600 text-sm mb-8 space-y-2">
            <li>✨ Chỉnh lại tóc tai và trang phục</li>
            <li>📸 Camera sẽ chụp mỗi 5 giây</li>
            <li>💃 Đổi dáng liên tục sau mỗi lần nháy đèn</li>
          </ul>

          <Button onClick={onStartCapture} className="animate-pulse">Bắt Đầu Chụp!</Button>
        </>
      )}
    </div>
  );
};

export default InstructionStep;
