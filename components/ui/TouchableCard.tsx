import React from 'react';
import { 
  TouchableOpacity, 
  StyleSheet, 
  ViewStyle, 
  TouchableOpacityProps 
} from 'react-native';
import colors from '@/constants/colors';
import layout from '@/constants/layout';

interface TouchableCardProps extends TouchableOpacityProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: keyof typeof layout.spacing | number;
}

const TouchableCard: React.FC<TouchableCardProps> = ({
  children,
  style,
  variant = 'default',
  padding = 'm',
  ...rest
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'elevated':
        return styles.elevated;
      case 'outlined':
        return styles.outlined;
      default:
        return styles.default;
    }
  };

  const getPadding = () => {
    if (typeof padding === 'number') {
      return padding;
    }
    return layout.spacing[padding];
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        getVariantStyle(),
        { padding: getPadding() },
        style,
      ]}
      activeOpacity={0.7}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: layout.borderRadius.m,
    backgroundColor: colors.card,
  },
  default: {
    backgroundColor: colors.card,
  },
  elevated: {
    backgroundColor: colors.card,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  outlined: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
});

export default TouchableCard;