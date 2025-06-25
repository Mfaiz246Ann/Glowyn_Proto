import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Camera, Upload } from 'lucide-react-native';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import layout from '@/constants/layout';
import { useUserStore } from '@/store/userStore';
import { ColorPalette } from '@/types';

// Components
import Button from '@/components/ui/Button';
import InfoCard from '@/components/ui/InfoCard';
import ColorPaletteItem from '@/components/ui/ColorPaletteItem';
import ProductCard from '@/components/ui/ProductCard';

// Services
import { takePhoto, pickImage } from '@/services/imageService';
import { analyzeImage, getProductRecommendations } from '@/services/aiService';

export default function ColorAnalysisScreen() {
  const router = useRouter();
  const { addAnalysisResult, getAnalysisByType } = useUserStore();
  
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);
  
  const existingAnalysis = getAnalysisByType('color');

  const handleTakePhoto = async () => {
    const uri = await takePhoto();
    if (uri) {
      setImageUri(uri);
      setAnalysisResult(null);
    }
  };

  const handlePickImage = async () => {
    const uri = await pickImage();
    if (uri) {
      setImageUri(uri);
      setAnalysisResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!imageUri) return;
    
    setIsAnalyzing(true);
    
    try {
      const result = await analyzeImage(imageUri, 'color');
      setAnalysisResult(result);
      
      const products = await getProductRecommendations(result, 'color');
      setRecommendedProducts(products);
      
      // Save analysis result
      const newAnalysis = {
        id: `color-analysis-${Date.now()}`,
        type: 'color',
        date: new Date().toISOString(),
        title: 'Analisis Warna',
        description: 'Temukan palet warna sempurnamu',
        imageUrl: imageUri,
        result: result,
        recommendedProducts: products,
      };
      
      addAnalysisResult(newAnalysis);
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderAnalysisResult = () => {
    if (!analysisResult) return null;
    
    const { colorSeason, palette, recommendations } = analysisResult;
    
    return (
      <View style={styles.resultContainer}>
        <View style={styles.resultSection}>
          <Text style={styles.resultTitle}>Musim Warnamu</Text>
          <Text style={styles.seasonResult}>{colorSeason}</Text>
        </View>
        
        <View style={styles.resultSection}>
          <Text style={styles.resultTitle}>Palet Warnamu</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.paletteContainer}
          >
            {palette.map((color: ColorPalette, index: number) => (
              <ColorPaletteItem 
                key={index} 
                color={color} 
                style={styles.colorItem} 
              />
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.resultSection}>
          <Text style={styles.resultTitle}>Rekomendasi</Text>
          <View style={styles.recommendationsContainer}>
            {recommendations.map((recommendation: string, index: number) => (
              <Text key={index} style={styles.recommendationText}>
                • {recommendation}
              </Text>
            ))}
          </View>
        </View>
        
        {recommendedProducts.length > 0 && (
          <View style={styles.resultSection}>
            <Text style={styles.resultTitle}>Produk Rekomendasi</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.productsContainer}
            >
              {recommendedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onPress={() => router.push(`/product/${product.id}`)}
                  style={styles.productCard}
                />
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    );
  };

  const renderExistingAnalysis = () => {
    if (!existingAnalysis || !existingAnalysis.result) return null;
    
    const { colorSeason, palette, recommendations } = existingAnalysis.result;
    
    return (
      <View style={styles.resultContainer}>
        <View style={styles.resultSection}>
          <Text style={styles.resultTitle}>Musim Warnamu</Text>
          <Text style={styles.seasonResult}>{colorSeason}</Text>
        </View>
        
        <View style={styles.resultSection}>
          <Text style={styles.resultTitle}>Palet Warnamu</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.paletteContainer}
          >
            {palette.map((color: ColorPalette, index: number) => (
              <ColorPaletteItem 
                key={index} 
                color={color} 
                style={styles.colorItem} 
              />
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.resultSection}>
          <Text style={styles.resultTitle}>Rekomendasi</Text>
          <View style={styles.recommendationsContainer}>
            {recommendations.map((recommendation: string, index: number) => (
              <Text key={index} style={styles.recommendationText}>
                • {recommendation}
              </Text>
            ))}
          </View>
        </View>
        
        {existingAnalysis.recommendedProducts && existingAnalysis.recommendedProducts.length > 0 && (
          <View style={styles.resultSection}>
            <Text style={styles.resultTitle}>Produk Rekomendasi</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.productsContainer}
            >
              {existingAnalysis.recommendedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onPress={() => router.push(`/product/${product.id}`)}
                  style={styles.productCard}
                />
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={layout.iconSize.m} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Color Analysis</Text>
        <View style={styles.placeholder} />
      </View>

      <InfoCard
        title="Analisis Warna Personal"
        description="Temukan palet warna alami berdasarkan undertone kulit, rambut, dan warna mata."
        style={styles.infoCard}
      />

      {!imageUri && !analysisResult && !existingAnalysis && (
        <View style={styles.uploadSection}>
          <Text style={styles.uploadTitle}>Unggah Foto</Text>
          <Text style={styles.uploadDescription}>
            Ambil atau pilih foto dengan pencahayaan alami dan tanpa filter untuk hasil terbaik.
          </Text>
          
          <View style={styles.buttonContainer}>
            <Button 
              title="Ambil Foto" 
              leftIcon={<Camera size={layout.iconSize.s} color="white" />}
              onPress={handleTakePhoto}
              style={styles.button}
            />
            <Button 
              title="Pilih Foto" 
              variant="outline"
              leftIcon={<Upload size={layout.iconSize.s} color={colors.primary} />}
              onPress={handlePickImage}
              style={styles.button}
            />
          </View>
        </View>
      )}

      {imageUri && !analysisResult && !isAnalyzing && (
        <View style={styles.previewSection}>
          <Image 
            source={{ uri: imageUri }} 
            style={styles.previewImage} 
            resizeMode="cover"
          />
          <View style={styles.buttonContainer}>
            <Button 
              title="Analisis Warna" 
              onPress={handleAnalyze}
              style={styles.analyzeButton}
            />
            <Button 
              title="Ganti Foto" 
              variant="outline"
              onPress={() => setImageUri(null)}
            />
          </View>
        </View>
      )}

      {isAnalyzing && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Menganalisis warna...</Text>
        </View>
      )}

      {analysisResult && renderAnalysisResult()}
      
      {!imageUri && !analysisResult && existingAnalysis && (
        <>
          <View style={styles.existingAnalysisHeader}>
            <Text style={styles.existingAnalysisTitle}>Hasil Analisis Sebelumnya</Text>
            <Text style={styles.existingAnalysisDate}>
              {new Date(existingAnalysis.date).toLocaleDateString('id-ID')}
            </Text>
          </View>
          
          {existingAnalysis.imageUrl && (
            <Image 
              source={{ uri: existingAnalysis.imageUrl }} 
              style={styles.existingAnalysisImage} 
              resizeMode="cover"
            />
          )}
          
          {renderExistingAnalysis()}
          
          <Button 
            title="Analisis Baru" 
            onPress={() => setImageUri(null)}
            style={styles.newAnalysisButton}
          />
        </>
      )}

      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: layout.spacing.l,
    paddingTop: layout.spacing.l,
    paddingBottom: layout.spacing.m,
  },
  backButton: {
    padding: layout.spacing.xs,
  },
  headerTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  placeholder: {
    width: layout.iconSize.m + layout.spacing.xs * 2,
  },
  infoCard: {
    marginHorizontal: layout.spacing.l,
  },
  uploadSection: {
    padding: layout.spacing.l,
    alignItems: 'center',
  },
  uploadTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: layout.spacing.s,
  },
  uploadDescription: {
    fontSize: typography.fontSize.m,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: layout.spacing.l,
  },
  buttonContainer: {
    width: '100%',
    gap: layout.spacing.m,
  },
  button: {
    width: '100%',
  },
  previewSection: {
    padding: layout.spacing.l,
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: 400,
    borderRadius: layout.borderRadius.m,
    marginBottom: layout.spacing.l,
  },
  analyzeButton: {
    marginBottom: layout.spacing.m,
  },
  loadingContainer: {
    padding: layout.spacing.xl,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: typography.fontSize.m,
    color: colors.textSecondary,
    marginTop: layout.spacing.m,
  },
  resultContainer: {
    padding: layout.spacing.l,
  },
  resultSection: {
    marginBottom: layout.spacing.xl,
  },
  resultTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: layout.spacing.m,
  },
  seasonResult: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  paletteContainer: {
    paddingBottom: layout.spacing.m,
  },
  colorItem: {
    marginRight: layout.spacing.l,
  },
  recommendationsContainer: {
    backgroundColor: colors.card,
    borderRadius: layout.borderRadius.m,
    padding: layout.spacing.m,
    borderWidth: 1,
    borderColor: colors.border,
  },
  recommendationText: {
    fontSize: typography.fontSize.m,
    color: colors.text,
    marginBottom: layout.spacing.s,
    lineHeight: typography.lineHeight.m,
  },
  productsContainer: {
    paddingBottom: layout.spacing.m,
    gap: layout.spacing.m,
  },
  productCard: {
    marginRight: layout.spacing.m,
  },
  existingAnalysisHeader: {
    paddingHorizontal: layout.spacing.l,
    marginTop: layout.spacing.l,
  },
  existingAnalysisTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  existingAnalysisDate: {
    fontSize: typography.fontSize.s,
    color: colors.textSecondary,
    marginTop: layout.spacing.xs,
  },
  existingAnalysisImage: {
    width: '100%',
    height: 250,
    marginVertical: layout.spacing.l,
  },
  newAnalysisButton: {
    marginHorizontal: layout.spacing.l,
  },
  spacer: {
    height: layout.spacing.xl,
  },
});