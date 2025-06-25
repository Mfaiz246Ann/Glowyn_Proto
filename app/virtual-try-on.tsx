import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Camera, Upload } from 'lucide-react-native';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import layout from '@/constants/layout';

// Components
import Button from '@/components/ui/Button';
import InfoCard from '@/components/ui/InfoCard';

// Services
import { takePhoto, pickImage } from '@/services/imageService';

export default function VirtualTryOnScreen() {
  const router = useRouter();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('lipstick');
  
  const handleTakePhoto = async () => {
    const uri = await takePhoto();
    if (uri) {
      setImageUri(uri);
    }
  };

  const handlePickImage = async () => {
    const uri = await pickImage();
    if (uri) {
      setImageUri(uri);
    }
  };

  const renderCategories = () => {
    const categories = [
      { id: 'lipstick', name: 'Lipstick' },
      { id: 'blush', name: 'Blush' },
      { id: 'eyeshadow', name: 'Eyeshadow' },
      { id: 'foundation', name: 'Foundation' },
    ];

    return (
      <View style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryTab,
              activeCategory === category.id && styles.activeCategoryTab,
            ]}
            onPress={() => setActiveCategory(category.id)}
          >
            <Text
              style={[
                styles.categoryText,
                activeCategory === category.id && styles.activeCategoryText,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderProductOptions = () => {
    // Mock product options based on active category
    const products = [
      { id: 'product-1', name: 'Coral Sunset', color: '#FF7F50' },
      { id: 'product-2', name: 'Pink Blush', color: '#FFC0CB' },
      { id: 'product-3', name: 'Ruby Red', color: '#E0115F' },
      { id: 'product-4', name: 'Nude Beige', color: '#E6BE8A' },
    ];

    return (
      <View style={styles.productsContainer}>
        {products.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={styles.productOption}
            onPress={() => console.log('Selected product:', product.id)}
          >
            <View 
              style={[
                styles.colorSwatch,
                { backgroundColor: product.color }
              ]} 
            />
            <Text style={styles.productName}>{product.name}</Text>
          </TouchableOpacity>
        ))}
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
        <Text style={styles.headerTitle}>Virtual Try-On</Text>
        <View style={styles.placeholder} />
      </View>

      <InfoCard
        title="Try Before You Buy"
        description="Virtually try on makeup and accessories to see how they look on you before making a purchase."
        style={styles.infoCard}
      />

      {!imageUri ? (
        <View style={styles.uploadSection}>
          <Text style={styles.uploadTitle}>Upload Your Photo</Text>
          <Text style={styles.uploadDescription}>
            Take a selfie or upload a photo to try on products.
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
        </View>
      ) : (
        <View style={styles.tryOnSection}>
          <Image 
            source={{ uri: imageUri }} 
            style={styles.previewImage} 
            resizeMode="cover"
          />
          
          <View style={styles.tryOnControls}>
            {renderCategories()}
            {renderProductOptions()}
            
            <Button 
              title="Try Another Photo" 
              variant="outline"
              onPress={() => setImageUri(null)}
              style={styles.changePhotoButton}
            />
          </View>
        </View>
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
  tryOnSection: {
    padding: layout.spacing.l,
  },
  previewImage: {
    width: '100%',
    height: 400,
    borderRadius: layout.borderRadius.m,
    marginBottom: layout.spacing.l,
  },
  tryOnControls: {
    backgroundColor: colors.card,
    borderRadius: layout.borderRadius.m,
    padding: layout.spacing.m,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoriesContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: layout.spacing.m,
  },
  categoryTab: {
    flex: 1,
    paddingVertical: layout.spacing.m,
    alignItems: 'center',
  },
  activeCategoryTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  categoryText: {
    fontSize: typography.fontSize.m,
    color: colors.textSecondary,
  },
  activeCategoryText: {
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: layout.spacing.l,
  },
  productOption: {
    width: '48%',
    alignItems: 'center',
    marginBottom: layout.spacing.m,
  },
  colorSwatch: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: layout.spacing.s,
    borderWidth: 1,
    borderColor: colors.border,
  },
  productName: {
    fontSize: typography.fontSize.s,
    color: colors.text,
  },
  changePhotoButton: {
    marginTop: layout.spacing.m,
  },
  spacer: {
    height: layout.spacing.xl,
  },
});