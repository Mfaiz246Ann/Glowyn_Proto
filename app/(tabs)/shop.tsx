import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import layout from '@/constants/layout';
import { useProductStore } from '@/store/productStore';

// Components
import SearchBar from '@/components/ui/SearchBar';
import SectionHeader from '@/components/ui/SectionHeader';
import CategoryCard from '@/components/ui/CategoryCard';
import ProductCard from '@/components/ui/ProductCard';

export default function ShopScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const { 
    categories, 
    collections, 
    getFeaturedProducts, 
    addToWishlist, 
    removeFromWishlist, 
    isWishlisted 
  } = useProductStore();
  
  const featuredProducts = getFeaturedProducts();

  const handleCategoryPress = (categoryId: string) => {
    router.push(`/category/${categoryId}`);
  };

  const handleCollectionPress = (collectionId: string) => {
    router.push(`/collection/${collectionId}`);
  };

  const handleProductPress = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const handleWishlistPress = (productId: string) => {
    const product = featuredProducts.find(p => p.id === productId);
    if (!product) return;
    
    if (isWishlisted(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(product);
    }
  };

  const handleSearch = () => {
    // In a real app, this would filter products or navigate to search results
    console.log('Searching for:', searchQuery);
  };

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shop</Text>
      </View>

      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Cari produk..."
          onSubmitEditing={handleSearch}
        />
      </View>

      <SectionHeader 
        title="Kategori" 
        onActionPress={() => console.log('View all categories')}
      />

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity 
            key={category.id}
            style={styles.categoryItem}
            onPress={() => handleCategoryPress(category.id)}
          >
            <View style={styles.categoryIconContainer}>
              <CategoryCard
                title=""
                icon={category.icon}
                backgroundColor={colors.primaryLight}
                size="small"
                style={styles.categoryIcon}
              />
            </View>
            <Text style={styles.categoryName}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <SectionHeader 
        title="Koleksi" 
        onActionPress={() => console.log('View all collections')}
      />

      <View style={styles.collectionsContainer}>
        {collections.map((collection, index) => (
          <TouchableOpacity
            key={collection.id}
            style={[
              styles.collectionCard,
              index % 2 === 0 ? { marginRight: layout.spacing.m / 2 } : { marginLeft: layout.spacing.m / 2 }
            ]}
            onPress={() => handleCollectionPress(collection.id)}
          >
            <View style={styles.collectionImageContainer}>
              <View style={styles.collectionOverlay} />
              {collection.imageUrl && (
                <View style={StyleSheet.absoluteFill}>
                  <View style={styles.collectionImageWrapper}>
                    <View style={styles.collectionImage}>
                      <View style={StyleSheet.absoluteFill}>
                        <View style={styles.imageContainer}>
                          <View style={styles.image}>
                            <View style={styles.imageContent}>
                              <Text style={styles.collectionName}>{collection.name}</Text>
                              <Text style={styles.collectionDescription} numberOfLines={1}>
                                {collection.description}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <SectionHeader 
        title="Rekomendasi Produk" 
        onActionPress={() => console.log('View all products')}
      />

      <View style={styles.productsGrid}>
        {featuredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onPress={() => handleProductPress(product.id)}
            onWishlistPress={() => handleWishlistPress(product.id)}
            style={styles.productCard}
          />
        ))}
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
    paddingHorizontal: layout.spacing.l,
    paddingTop: layout.spacing.l,
    paddingBottom: layout.spacing.s,
  },
  headerTitle: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  searchContainer: {
    paddingHorizontal: layout.spacing.l,
    marginBottom: layout.spacing.l,
  },
  categoriesContainer: {
    paddingHorizontal: layout.spacing.l,
    paddingBottom: layout.spacing.l,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: layout.spacing.l,
    width: 70,
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: layout.spacing.xs,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryIcon: {
    width: 60,
    height: 60,
  },
  categoryName: {
    fontSize: typography.fontSize.s,
    color: colors.text,
    textAlign: 'center',
  },
  collectionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: layout.spacing.l,
    marginBottom: layout.spacing.l,
  },
  collectionCard: {
    width: '48%',
    aspectRatio: 1.5,
    marginBottom: layout.spacing.m,
    borderRadius: layout.borderRadius.m,
    overflow: 'hidden',
  },
  collectionImageContainer: {
    flex: 1,
    borderRadius: layout.borderRadius.m,
    overflow: 'hidden',
  },
  collectionOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1,
  },
  collectionImageWrapper: {
    flex: 1,
  },
  collectionImage: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: layout.spacing.m,
  },
  imageContent: {
    zIndex: 2,
  },
  collectionName: {
    fontSize: typography.fontSize.m,
    fontWeight: typography.fontWeight.bold,
    color: colors.card,
    marginBottom: layout.spacing.xs,
  },
  collectionDescription: {
    fontSize: typography.fontSize.xs,
    color: colors.card,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: layout.spacing.l,
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    marginBottom: layout.spacing.m,
  },
  spacer: {
    height: layout.spacing.xl,
  },
});