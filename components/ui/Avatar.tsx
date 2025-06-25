import React from 'react';
import { 
  View, 
  Image, 
  StyleSheet, 
  ViewStyle, 
  TouchableOpacity 
} from 'react-native';
import colors from '@/constants/colors';
import layout from '@/constants/layout';

interface AvatarProps {
  source: string;
  size?: number;
  style?: ViewStyle;
  onPress?: () => void;
  borderColor?: string;
  borderWidth?: number;
}

const Avatar: React.FC<AvatarProps> = ({
  source,
  size = 40,
  style,
  onPress,
  borderColor = colors.primary,
  borderWidth = 0,
}) => {
  const avatarStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    borderWidth,
    borderColor,
  };

  const renderAvatar = () => (
    <Image
      source={{ uri: source }}
      style={[styles.image, avatarStyle]}
      resizeMode="cover"
    />
  );

  if (onPress) {
    return (
      <TouchableOpacity
        style={[styles.container, avatarStyle, style]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {renderAvatar()}
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.container, avatarStyle, style]}>
      {renderAvatar()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default Avatar;