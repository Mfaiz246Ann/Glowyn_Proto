import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ViewStyle 
} from 'react-native';
import { Heart, Star } from 'lucide-react-native';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import layout from '@/constants/layout';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
  onWishlistPress?: () => void;
  style?: ViewStyle;
  size?: 'small' | 'medium' | 'large';
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  onWishlistPress,
  style,
  size = 'medium',
}) => {
  const { name, brand, price, imageUrl, rating, isWishlisted } = product;

  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString('id-ID')}`;
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return styles.smallCard;
      case 'large':
        return styles.largeCard;
      default:
        return styles.mediumCard;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, getSizeStyle(), style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <TouchableOpacity
          style={styles.wishlistButton}
          onPress={onWishlistPress}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <Heart
            size={layout.iconSize.s}
            color={isWishlisted ? colors.primary : colors.textLight}
            fill={isWishlisted ? colors.primary : 'transparent'}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.brand}>{brand}</Text>
        <Text style={styles.name} numberOfLines={2}>{name}</Text>
        <View style={styles.priceRatingContainer}>
          <Text style={styles.price}>{formatPrice(price)}</Text>
          <View style={styles.ratingContainer}>
            <Star
              size={layout.iconSize.xs}
              color={colors.warning}
              fill={colors.warning}
            />
            <Text style={styles.rating}>{rating.toFixed(1)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: layout.borderRadius.m,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  smallCard: {
    width: 140,
  },
  mediumCard: {
    width: 160,
  },
  largeCard: {
    width: 180,
  },
  imageContainer: {
    position: 'relative',
    aspectRatio: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  wishlistButton: {
    position: 'absolute',
    top: layout.spacing.s,
    right: layout.spacing.s,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: layout.borderRadius.round,
    padding: layout.spacing.xs,
  },
  infoContainer: {
    padding: layout.spacing.s,
  },
  brand: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginBottom: layout.spacing.xs,
  },
  name: {
    fontSize: typography.fontSize.s,
    fontWeight: typography.fontWeight.medium,
    color: colors.text,
    marginBottom: layout.spacing.xs,
    height: 40,
  },
  priceRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: typography.fontSize.s,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginLeft: 2,
  },
});

export default ProductCard;