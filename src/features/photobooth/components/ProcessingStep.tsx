import React from 'react';
import { RefreshCw } from 'lucide-react';

const ProcessingStep: React.FC = () => {
  return (
    <div className="h-96 flex flex-col items-center justify-center text-center p-8">
      <RefreshCw className="w-12 h-12 text-brand-500 animate-spin mb-4" />
      <h3 className="text-xl font-bold text-slate-800">Đang tráng ảnh...</h3>
      <p className="text-slate-500">Đợi xíu nhé, đang thêm phép màu ✨</p>
    </div>
  );
};

export default ProcessingStep;
