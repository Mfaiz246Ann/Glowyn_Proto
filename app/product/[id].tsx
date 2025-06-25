import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Heart, Star, ShoppingBag, Share2 } from 'lucide-react-native';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import layout from '@/constants/layout';
import { useProductStore } from '@/store/productStore';

// Components
import Button from '@/components/ui/Button';
import ProductCard from '@/components/ui/ProductCard';

export default function ProductDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { 
    getProductById, 
    getFeaturedProducts, 
    addToWishlist, 
    removeFromWishlist, 
    isWishlisted 
  } = useProductStore();
  
  const product = getProductById(id as string);
  const relatedProducts = getFeaturedProducts().filter(p => p.id !== id);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found</Text>
      </View>
    );
  }

  const handleWishlistToggle = () => {
    if (isWishlisted(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleRelatedProductPress = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={layout.iconSize.m} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={handleWishlistToggle}
        >
          <Heart 
            size={layout.iconSize.m} 
            color={isWishlisted(product.id) ? colors.primary : colors.text}
            fill={isWishlisted(product.id) ? colors.primary : 'transparent'}
          />
        </TouchableOpacity>
      </View>

      <Image 
        source={{ uri: product.imageUrl }} 
        style={styles.productImage} 
        resizeMode="cover"
      />

      <View style={styles.productInfo}>
        <View style={styles.brandRow}>
          <Text style={styles.brand}>{product.brand}</Text>
          <View style={styles.ratingContainer}>
            <Star 
              size={layout.iconSize.s} 
              color={colors.warning}
              fill={colors.warning}
            />
            <Text style={styles.rating}>{product.rating.toFixed(1)}</Text>
          </View>
        </View>

        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.price}>Rp {product.price.toLocaleString('id-ID')}</Text>

        {product.colors && product.colors.length > 0 && (
          <View style={styles.colorsContainer}>
            <Text style={styles.sectionTitle}>Colors</Text>
            <View style={styles.colorOptions}>
              {product.colors.map((color, index) => (
                <TouchableOpacity 
                  key={index}
                  style={[styles.colorOption, { backgroundColor: color }]}
                />
              ))}
            </View>
          </View>
        )}

        <View style={styles.descriptionContainer}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description || 'No description available.'}</Text>
        </View>

        <View style={styles.actionsContainer}>
          <Button 
            title="Add to Cart" 
            leftIcon={<ShoppingBag size={layout.iconSize.s} color="white" />}
            style={styles.addToCartButton}
          />
          <TouchableOpacity style={styles.shareButton}>
            <Share2 size={layout.iconSize.m} color={colors.text} />
          </TouchableOpacity>
        </View>

        {relatedProducts.length > 0 && (
          <View style={styles.relatedProductsContainer}>
            <Text style={styles.sectionTitle}>You May Also Like</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.relatedProductsList}
            >
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  onPress={() => handleRelatedProductPress(relatedProduct.id)}
                  onWishlistPress={() => {
                    if (isWishlisted(relatedProduct.id)) {
                      removeFromWishlist(relatedProduct.id);
                    } else {
                      addToWishlist(relatedProduct);
                    }
                  }}
                  style={styles.relatedProductCard}
                />
              ))}
            </ScrollView>
          </View>
        )}
      </View>

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
    justifyContent: 'space-between',
    position: 'absolute',
    top: layout.spacing.l,
    left: layout.spacing.l,
    right: layout.spacing.l,
    zIndex: 10,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 400,
  },
  productInfo: {
    padding: layout.spacing.l,
  },
  brandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: layout.spacing.s,
  },
  brand: {
    fontSize: typography.fontSize.m,
    color: colors.textSecondary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: typography.fontSize.m,
    color: colors.text,
    marginLeft: layout.spacing.xs,
  },
  productName: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: layout.spacing.s,
  },
  price: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    marginBottom: layout.spacing.l,
  },
  colorsContainer: {
    marginBottom: layout.spacing.l,
  },
  sectionTitle: {
    fontSize: typography.fontSize.l,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: layout.spacing.m,
  },
  colorOptions: {
    flexDirection: 'row',
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: layout.spacing.m,
    borderWidth: 1,
    borderColor: colors.border,
  },
  descriptionContainer: {
    marginBottom: layout.spacing.l,
  },
  description: {
    fontSize: typography.fontSize.m,
    color: colors.text,
    lineHeight: typography.lineHeight.m,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: layout.spacing.xl,
  },
  addToCartButton: {
    flex: 1,
    marginRight: layout.spacing.m,
  },
  shareButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  relatedProductsContainer: {
    marginBottom: layout.spacing.l,
  },
  relatedProductsList: {
    paddingBottom: layout.spacing.m,
    gap: layout.spacing.m,
  },
  relatedProductCard: {
    marginRight: layout.spacing.m,
  },
  spacer: {
    height: layout.spacing.xl,
  },
});