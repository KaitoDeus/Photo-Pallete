import React from 'react';
import { Grid, Users, User } from 'lucide-react';
import { PhotoLayout, FrameTheme } from './types';

export const LAYOUTS: PhotoLayout[] = [
  { id: 'CLASSIC_4', name: 'Classic 4', count: 4, icon: React.createElement(Grid, { size: 24 }), description: '4 ảnh lưới 2x2' },
  { id: 'FUN_6', name: 'Fun 6', count: 6, icon: React.createElement(Users, { size: 24 }), description: '6 ảnh vui nhộn' },
  { id: 'COUPLE_2', name: 'Couple 2', count: 2, icon: React.createElement(User, { size: 24 }), description: '2 ảnh dọc lớn' },
];

export const THEMES: Record<FrameTheme, string> = {
  MINIMAL: 'bg-white border-slate-200',
  CUTE: 'bg-pink-100 border-pink-300',
  PASTEL: 'bg-blue-50 border-blue-200',
  EVENT: 'bg-slate-900 border-slate-700 text-white',
};
