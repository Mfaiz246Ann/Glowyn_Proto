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

// Components
import Button from '@/components/ui/Button';
import InfoCard from '@/components/ui/InfoCard';
import ProductCard from '@/components/ui/ProductCard';

// Services
import { takePhoto, pickImage } from '@/services/imageService';
import { analyzeImage, getProductRecommendations } from '@/services/aiService';

export default function FaceShapeScreen() {
  const router = useRouter();
  const { addAnalysisResult, getAnalysisByType } = useUserStore();
  
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);
  
  const existingAnalysis = getAnalysisByType('face');

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
      const result = await analyzeImage(imageUri, 'face');
      setAnalysisResult(result);
      
      const products = await getProductRecommendations(result, 'face');
      setRecommendedProducts(products);
      
      // Save analysis result
      const newAnalysis = {
        id: `face-analysis-${Date.now()}`,
        type: 'face',
        date: new Date().toISOString(),
        title: 'Bentuk Wajah',
        description: 'Temukan bentuk dan gaya ideal',
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

  const renderPhotoTips = () => (
    <View style={styles.tipsContainer}>
      <Text style={styles.tipsTitle}>How to take a good photo:</Text>
      <Text style={styles.tipText}>• Pull hair away from your face</Text>
      <Text style={styles.tipText}>• Face the camera directly</Text>
      <Text style={styles.tipText}>• Maintain a neutral expression</Text>
      <Text style={styles.tipText}>• Use good lighting</Text>
    </View>
  );

  const renderAnalysisResult = () => {
    if (!analysisResult) return null;
    
    const { faceShape, recommendations } = analysisResult;
    
    return (
      <View style={styles.resultContainer}>
        <View style={styles.resultSection}>
          <Text style={styles.resultTitle}>Bentuk Wajahmu</Text>
          <Text style={styles.faceShapeResult}>{faceShape}</Text>
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
    
    const { faceShape, recommendations } = existingAnalysis.result;
    
    return (
      <View style={styles.resultContainer}>
        <View style={styles.resultSection}>
          <Text style={styles.resultTitle}>Bentuk Wajahmu</Text>
          <Text style={styles.faceShapeResult}>{faceShape}</Text>
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
        <Text style={styles.headerTitle}>Face Shape Analysis</Text>
        <View style={styles.placeholder} />
      </View>

      <InfoCard
        title="Discover Your Face Shape"
        description="Find out your face shape and get personalized recommendations for hairstyles, glasses, and accessories that complement your features."
        style={styles.infoCard}
      />

      {!imageUri && !analysisResult && !existingAnalysis && (
        <View style={styles.uploadSection}>
          <Text style={styles.uploadTitle}>Upload Photo</Text>
          <Text style={styles.uploadDescription}>
            Take or select a clear photo of your face for accurate analysis.
          </Text>
          
          <View style={styles.buttonContainer}>
            <Button 
              title="Take Photo" 
              leftIcon={<Camera size={layout.iconSize.s} color="white" />}
              onPress={handleTakePhoto}
              style={styles.button}
            />
            <Button 
              title="Upload Photo" 
              variant="outline"
              leftIcon={<Upload size={layout.iconSize.s} color={colors.primary} />}
              onPress={handlePickImage}
              style={styles.button}
            />
          </View>
          
          {renderPhotoTips()}
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
              title="Analyze Face Shape" 
              onPress={handleAnalyze}
              style={styles.analyzeButton}
            />
            <Button 
              title="Change Photo" 
              variant="outline"
              onPress={() => setImageUri(null)}
            />
          </View>
        </View>
      )}

      {isAnalyzing && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Analyzing face shape...</Text>
        </View>
      )}

      {analysisResult && renderAnalysisResult()}
      
      {!imageUri && !analysisResult && existingAnalysis && (
        <>
          <View style={styles.existingAnalysisHeader}>
            <Text style={styles.existingAnalysisTitle}>Previous Analysis Result</Text>
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
            title="New Analysis" 
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
  tipsContainer: {
    width: '100%',
    backgroundColor: colors.primaryLight,
    borderRadius: layout.borderRadius.m,
    padding: layout.spacing.m,
    marginTop: layout.spacing.l,
  },
  tipsTitle: {
    fontSize: typography.fontSize.m,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: layout.spacing.s,
  },
  tipText: {
    fontSize: typography.fontSize.m,
    color: colors.text,
    marginBottom: layout.spacing.xs,
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
  faceShapeResult: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
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