import { AnalysisType } from '@/types';

// Mock AI analysis service
export const analyzeImage = async (
  imageUri: string,
  analysisType: AnalysisType
): Promise<any> => {
  try {
    // In a real app, this would make an API call to an AI service
    // For now, we'll return mock data based on the analysis type
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    switch (analysisType) {
      case 'color':
        return {
          colorSeason: 'Spring Warm',
          palette: [
            { name: 'Coral', hex: '#FF7F50' },
            { name: 'Peach', hex: '#FFDAB9' },
            { name: 'Warm Yellow', hex: '#FFD700' },
            { name: 'Sage Green', hex: '#BCB88A' },
            { name: 'Turquoise', hex: '#40E0D0' },
          ],
          recommendations: [
            'Wear warm-toned colors that enhance your natural glow',
            'Avoid cool blues and purples that may wash you out',
            'Gold jewelry will complement your warm undertones better than silver',
          ],
        };
        
      case 'face':
        return {
          faceShape: 'Oval',
          recommendations: [
            'Your oval face shape is versatile and works with most hairstyles',
            'Try side-swept bangs to highlight your cheekbones',
            'Round or square glasses frames will complement your face shape',
          ],
        };
        
      case 'skin':
        return {
          skinType: 'Combination',
          recommendations: [
            "Use gentle cleansers that won't strip your skin",
            'Apply moisturizer more heavily on dry areas',
            'Use oil-control products on your T-zone',
          ],
        };
        
      case 'style':
        return {
          styleType: 'Elegant Casual',
          recommendations: [
            'Focus on well-fitted basics with a few statement pieces',
            'Incorporate your warm color palette into your wardrobe',
            'Accessorize with gold-toned jewelry to enhance your look',
          ],
        };
        
      default:
        throw new Error('Unknown analysis type');
    }
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
};

// This would be a real API call in a production app
export const getProductRecommendations = async (
  analysisResult: any,
  analysisType: AnalysisType
): Promise<any[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return mock product recommendations
  return [
    {
      id: 'rec-product-1',
      name: 'Coral Sunset Lipstick',
      brand: 'Glowyn',
      price: 189000,
      imageUrl: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.8,
      category: 'Makeup',
    },
    {
      id: 'rec-product-2',
      name: 'Hydrating Serum',
      brand: 'Glowyn Skin',
      price: 299000,
      imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.9,
      category: 'Skincare',
    },
    {
      id: 'rec-product-3',
      name: 'Gold Hoop Earrings',
      brand: 'Glowyn Accessories',
      price: 249000,
      imageUrl: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.7,
      category: 'Accessories',
    },
  ];
};