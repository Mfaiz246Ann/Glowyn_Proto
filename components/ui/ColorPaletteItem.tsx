import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ViewStyle 
} from 'react-native';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import layout from '@/constants/layout';
import { ColorPalette } from '@/types';

interface ColorPaletteItemProps {
  color: ColorPalette;
  size?: number;
  style?: ViewStyle;
  showName?: boolean;
}

const ColorPaletteItem: React.FC<ColorPaletteItemProps> = ({
  color,
  size = 80,
  style,
  showName = true,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View 
        style={[
          styles.colorBox, 
          { 
            backgroundColor: color.hex,
            width: size,
            height: size,
            borderRadius: size / 8,
          }
        ]} 
      />
      {showName && (
        <Text style={styles.colorName}>{color.name}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  colorBox: {
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: layout.spacing.xs,
  },
  colorName: {
    fontSize: typography.fontSize.s,
    color: colors.text,
    textAlign: 'center',
  },
});

export default ColorPaletteItem;