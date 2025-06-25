import { AnalysisResult } from '@/types';
import colors from '@/constants/colors';

export const recentAnalysis: AnalysisResult[] = [
  {
    id: 'analysis-1',
    type: 'color',
    date: '2025-06-20',
    title: 'Analisis Warna',
    description: 'Temukan palet warna sempurnamu',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    result: {
      colorSeason: 'Spring Warm',
      palette: [
        { name: 'Coral', hex: colors.coral },
        { name: 'Peach', hex: colors.peach },
        { name: 'Warm Yellow', hex: colors.warmYellow },
        { name: 'Sage Green', hex: colors.sageGreen },
        { name: 'Turquoise', hex: colors.turquoise },
      ],
      recommendations: [
        'Wear warm-toned colors that enhance your natural glow',
        'Avoid cool blues and purples that may wash you out',
        'Gold jewelry will complement your warm undertones better than silver',
      ],
    },
  },
  {
    id: 'analysis-2',
    type: 'face',
    date: '2025-06-18',
    title: 'Bentuk Wajah',
    description: 'Temukan bentuk dan gaya ideal',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    result: {
      faceShape: 'Oval',
      recommendations: [
        'Your oval face shape is versatile and works with most hairstyles',
        'Try side-swept bangs to highlight your cheekbones',
        'Round or square glasses frames will complement your face shape',
      ],
    },
  },
  {
    id: 'analysis-3',
    type: 'skin',
    date: '2025-06-15',
    title: 'Analisis Kulit',
    description: 'Temukan jenis kulit dan perawatan terbaik',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    result: {
      skinType: 'Combination',
      recommendations: [
        "Use gentle cleansers that won't strip your skin",
        'Apply moisturizer more heavily on dry areas',
        'Use oil-control products on your T-zone',
      ],
    },
  },
];

export const analysisTypes = [
  {
    id: 'analysis-type-1',
    type: 'color',
    title: 'Analisis Warna',
    description: 'Temukan palet warna sempurnamu',
    icon: 'palette',
    backgroundColor: colors.primaryLight,
  },
  {
    id: 'analysis-type-2',
    type: 'face',
    title: 'Bentuk Wajah',
    description: 'Temukan bentuk dan gaya ideal',
    icon: 'user',
    backgroundColor: '#E1F5FE',
  },
  {
    id: 'analysis-type-3',
    type: 'skin',
    title: 'Analisis Kulit',
    description: 'Temukan jenis kulit dan perawatan terbaik',
    icon: 'droplet',
    backgroundColor: '#F3E5F5',
  },
  {
    id: 'analysis-type-4',
    type: 'style',
    title: 'Gaya Personal',
    description: 'Temukan gaya yang cocok dengan kepribadianmu',
    icon: 'shirt',
    backgroundColor: '#E8F5E9',
  },
];