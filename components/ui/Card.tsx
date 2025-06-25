import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import colors from '@/constants/colors';
import layout from '@/constants/layout';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: keyof typeof layout.spacing | number;
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  variant = 'default',
  padding = 'm',
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
    <View
      style={[
        styles.card,
        getVariantStyle(),
        { padding: getPadding() },
        style,
      ]}
    >
      {children}
    </View>
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

export default Card;