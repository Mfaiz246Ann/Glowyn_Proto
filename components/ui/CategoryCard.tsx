import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ViewStyle,
  Image
} from 'react-native';
import { Palette, User, Droplet, Shirt } from 'lucide-react-native';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import layout from '@/constants/layout';

interface CategoryCardProps {
  title: string;
  description?: string;
  icon?: string;
  backgroundColor?: string;
  imageUrl?: string;
  onPress?: () => void;
  style?: ViewStyle;
  size?: 'small' | 'medium' | 'large';
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  icon,
  backgroundColor = colors.primaryLight,
  imageUrl,
  onPress,
  style,
  size = 'medium',
}) => {
  const getIconComponent = () => {
    const iconSize = size === 'small' ? layout.iconSize.m : layout.iconSize.l;
    const iconColor = colors.primary;

    switch (icon) {
      case 'palette':
        return <Palette size={iconSize} color={iconColor} />;
      case 'user':
        return <User size={iconSize} color={iconColor} />;
      case 'droplet':
        return <Droplet size={iconSize} color={iconColor} />;
      case 'shirt':
        return <Shirt size={iconSize} color={iconColor} />;
      default:
        return <Palette size={iconSize} color={iconColor} />;
    }
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
      style={[
        styles.container,
        { backgroundColor },
        getSizeStyle(),
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <View style={styles.iconContainer}>
          {getIconComponent()}
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: layout.borderRadius.m,
    overflow: 'hidden',
  },
  smallCard: {
    height: 80,
    width: 80,
    padding: layout.spacing.s,
  },
  mediumCard: {
    height: 160,
    flex: 1,
    padding: layout.spacing.m,
  },
  largeCard: {
    height: 200,
    flex: 1,
    padding: layout.spacing.l,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: layout.spacing.s,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: layout.borderRadius.m,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: typography.fontSize.l,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: layout.spacing.xs,
  },
  description: {
    fontSize: typography.fontSize.s,
    color: colors.textSecondary,
  },
});

export default CategoryCard;