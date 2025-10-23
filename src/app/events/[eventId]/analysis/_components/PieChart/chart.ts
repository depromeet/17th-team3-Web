export type AnalysisType = 'preferred' | 'disliked';

interface AnalysisTheme {
  background: string;
  label: string;
  labelColor: string;
  labelBackground: string;
  tab: {
    backgroundClass: string;
    colorClass: string;
    backgroundStyle: string;
    colorStyle: string;
  };
}

export const CHART_THEME: AnalysisTheme = {
  background:
    'linear-gradient(243deg, rgba(255, 173, 0, 0.12) 3.06%, rgba(255, 255, 255, 0.12) 76.7%)',
  label: '가장 선호',
  labelColor: '#EBBB00',
  labelBackground: '#FFE47A2E',
  tab: {
    backgroundClass: 'bg-[rgba(255,228,122,0.18)]',
    colorClass: 'text-[#FFE47A]',
    backgroundStyle: 'rgba(255, 205, 0, 0.08)',
    colorStyle: '#FFE47A',
  },
};

export const PIE_GRADIENTS = [
  {
    id: 'color0',
    stops: [
      { offset: '0%', color: '#FFCD00' },
      { offset: '100%', color: '#FFF5CC' },
    ],
  },
  {
    id: 'color1',
    stops: [
      { offset: '0%', color: '#FF4F14' },
      { offset: '100%', color: '#FFF0EB' },
    ],
  },
  {
    id: 'color2',
    stops: [
      { offset: '100%', color: '#6D89F0' },
      { offset: '0%', color: '#EDF0FD' },
    ],
  },
];
