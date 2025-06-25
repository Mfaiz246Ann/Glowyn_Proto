import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ViewStyle 
} from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import layout from '@/constants/layout';

interface SectionHeaderProps {
  title: string;
  actionText?: string;
  onActionPress?: () => void;
  style?: ViewStyle;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  actionText = 'Lihat Semua',
  onActionPress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      {onActionPress && (
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={onActionPress}
          activeOpacity={0.7}
        >
          <Text style={styles.actionText}>{actionText}</Text>
          <ChevronRight size={layout.iconSize.s} color={colors.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: layout.spacing.m,
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: typography.fontSize.m,
    color: colors.primary,
    marginRight: layout.spacing.xs,
  },
});

export default SectionHeader;