import React from 'react';

export type BoothStep = 'INTRO' | 'SELECT_FRAME' | 'INSTRUCTION' | 'CAPTURE' | 'PROCESSING' | 'RESULT';
export type LayoutType = 'CLASSIC_4' | 'FUN_6' | 'COUPLE_2';
export type FrameTheme = 'MINIMAL' | 'CUTE' | 'PASTEL' | 'EVENT';

export interface PhotoLayout {
  id: LayoutType;
  name: string;
  count: number;
  icon: React.ReactNode;
  description: string;
}
