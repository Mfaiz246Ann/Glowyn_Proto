import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps
} from 'react-native';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import layout from '@/constants/layout';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  disabled = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
  ...rest
}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return styles.primaryButton;
      case 'secondary':
        return styles.secondaryButton;
      case 'outline':
        return styles.outlineButton;
      case 'text':
        return styles.textButton;
      default:
        return styles.primaryButton;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'primary':
        return styles.primaryText;
      case 'secondary':
        return styles.secondaryText;
      case 'outline':
        return styles.outlineText;
      case 'text':
        return styles.textButtonText;
      default:
        return styles.primaryText;
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return styles.smallButton;
      case 'medium':
        return styles.mediumButton;
      case 'large':
        return styles.largeButton;
      default:
        return styles.mediumButton;
    }
  };

  const getTextSizeStyle = () => {
    switch (size) {
      case 'small':
        return styles.smallText;
      case 'medium':
        return styles.mediumText;
      case 'large':
        return styles.largeText;
      default:
        return styles.mediumText;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        getSizeStyle(),
        disabled && styles.disabledButton,
        style,
      ]}
      disabled={disabled || isLoading}
      activeOpacity={0.7}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator 
          color={variant === 'primary' ? 'white' : colors.primary} 
          size="small" 
        />
      ) : (
        <>
          {leftIcon && leftIcon}
          <Text
            style={[
              styles.text,
              getTextStyle(),
              getTextSizeStyle(),
              disabled && styles.disabledText,
              textStyle,
              leftIcon && { marginLeft: layout.spacing.s },
              rightIcon && { marginRight: layout.spacing.s },
            ]}
          >
            {title}
          </Text>
          {rightIcon && rightIcon}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: layout.borderRadius.m,
  },
  text: {
    fontWeight: typography.fontWeight.medium,
    textAlign: 'center',
  },
  // Variants
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.primaryLight,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  textButton: {
    backgroundColor: 'transparent',
  },
  // Text styles
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: colors.primaryDark,
  },
  outlineText: {
    color: colors.primary,
  },
  textButtonText: {
    color: colors.primary,
  },
  // Sizes
  smallButton: {
    paddingVertical: layout.spacing.xs,
    paddingHorizontal: layout.spacing.m,
    minHeight: 32,
  },
  mediumButton: {
    paddingVertical: layout.spacing.s,
    paddingHorizontal: layout.spacing.l,
    minHeight: 44,
  },
  largeButton: {
    paddingVertical: layout.spacing.m,
    paddingHorizontal: layout.spacing.xl,
    minHeight: 56,
  },
  // Text sizes
  smallText: {
    fontSize: typography.fontSize.s,
  },
  mediumText: {
    fontSize: typography.fontSize.m,
  },
  largeText: {
    fontSize: typography.fontSize.l,
  },
  // Disabled
  disabledButton: {
    backgroundColor: colors.textLight,
    borderColor: colors.textLight,
    opacity: 0.5,
  },
  disabledText: {
    color: colors.textSecondary,
  },
});

export default Button;