import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Bell } from 'lucide-react-native';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import layout from '@/constants/layout';
import { useUserStore } from '@/store/userStore';
import { useProductStore } from '@/store/productStore';
import { useFeedStore } from '@/store/feedStore';
import { styleCategories } from '@/mocks/users';
import { analysisTypes } from '@/mocks/analysis';

// Components
import SectionHeader from '@/components/ui/SectionHeader';
import CategoryCard from '@/components/ui/CategoryCard';
import ProductCard from '@/components/ui/ProductCard';
import Avatar from '@/components/ui/Avatar';
import FeedPost from '@/components/ui/FeedPost';

export default function HomeScreen() {
  const router = useRouter();
  const { user, getRecentAnalysis } = useUserStore();
  const { getFeaturedProducts, addToWishlist, removeFromWishlist, isWishlisted } = useProductStore();
  const { posts, likePost, unlikePost, savePost, unsavePost } = useFeedStore();
  
  const recentAnalysis = getRecentAnalysis();
  const featuredProducts = getFeaturedProducts();
  const latestPost = posts[0];

  const handleAnalysisPress = (type: string) => {
    switch (type) {
      case 'color':
        router.push('/color-analysis');
        break;
      case 'face':
        router.push('/face-shape');
        break;
      case 'skin':
        router.push('/skin-analysis');
        break;
      case 'style':
        router.push('/style-analysis');
        break;
      default:
        router.push('/analyze');
    }
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

  const handlePostPress = (postId: string) => {
    router.push(`/post/${postId}`);
  };

  const handleStyleCategoryPress = (categoryId: string) => {
    router.push(`/category/${categoryId}`);
  };

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home</Text>
      </View>

      <View style={styles.welcomeSection}>
        <View>
          <Text style={styles.welcomeTitle}>Halo, {user?.name}!</Text>
          <Text style={styles.welcomeSubtitle}>Temukan gaya sempurnamu</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={layout.iconSize.m} color={colors.text} />
        </TouchableOpacity>
      </View>

      <SectionHeader 
        title="Temukan Kecantikanmu" 
        onActionPress={() => router.push('/analyze')}
      />

      <View style={styles.analysisGrid}>
        {analysisTypes.slice(0, 2).map((item) => (
          <CategoryCard
            key={item.id}
            title={item.title}
            description={item.description}
            icon={item.icon}
            backgroundColor={item.backgroundColor}
            onPress={() => handleAnalysisPress(item.type)}
            style={styles.analysisCard}
          />
        ))}
      </View>

      <SectionHeader 
        title="Trending di Style Feed" 
        onActionPress={() => router.push('/style-feed')}
      />

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.trendingContainer}
      >
        {styleCategories.map((category) => (
          <TouchableOpacity 
            key={category.id}
            style={styles.trendingItem}
            onPress={() => handleStyleCategoryPress(category.id)}
          >
            <Image 
              source={{ uri: category.imageUrl }} 
              style={styles.trendingImage} 
            />
            <Text style={styles.trendingName}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {latestPost && (
        <View style={styles.latestPostContainer}>
          <FeedPost
            post={latestPost}
            onPress={() => handlePostPress(latestPost.id)}
            onLikePress={() => latestPost.isLiked ? unlikePost(latestPost.id) : likePost(latestPost.id)}
            onCommentPress={() => handlePostPress(latestPost.id)}
            onSavePress={() => latestPost.isSaved ? unsavePost(latestPost.id) : savePost(latestPost.id)}
            onUserPress={() => router.push(`/user/${latestPost.user.id}`)}
          />
        </View>
      )}

      <SectionHeader 
        title="Rekomendasi Produk" 
        onActionPress={() => router.push('/shop')}
      />

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productsContainer}
      >
        {featuredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onPress={() => handleProductPress(product.id)}
            onWishlistPress={() => handleWishlistPress(product.id)}
            style={styles.productCard}
          />
        ))}
      </ScrollView>

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
  welcomeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: layout.spacing.l,
    paddingVertical: layout.spacing.l,
  },
  welcomeTitle: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: layout.spacing.xs,
  },
  welcomeSubtitle: {
    fontSize: typography.fontSize.m,
    color: colors.textSecondary,
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  analysisGrid: {
    flexDirection: 'row',
    paddingHorizontal: layout.spacing.l,
    marginBottom: layout.spacing.xl,
    gap: layout.spacing.m,
  },
  analysisCard: {
    flex: 1,
  },
  trendingContainer: {
    paddingHorizontal: layout.spacing.l,
    paddingBottom: layout.spacing.l,
  },
  trendingItem: {
    alignItems: 'center',
    marginRight: layout.spacing.l,
  },
  trendingImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: colors.primary,
    marginBottom: layout.spacing.xs,
  },
  trendingName: {
    fontSize: typography.fontSize.s,
    color: colors.text,
    textAlign: 'center',
  },
  latestPostContainer: {
    paddingHorizontal: layout.spacing.l,
    marginBottom: layout.spacing.l,
  },
  productsContainer: {
    paddingHorizontal: layout.spacing.l,
    paddingBottom: layout.spacing.l,
    gap: layout.spacing.m,
  },
  productCard: {
    marginRight: layout.spacing.m,
  },
  spacer: {
    height: layout.spacing.xl,
  },
});