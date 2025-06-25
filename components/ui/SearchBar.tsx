import React from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  ViewStyle,
  TextInputProps
} from 'react-native';
import { Search, X } from 'lucide-react-native';
import colors from '@/constants/colors';
import layout from '@/constants/layout';
import typography from '@/constants/typography';

interface SearchBarProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
  placeholder?: string;
  style?: ViewStyle;
  autoFocus?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onClear,
  placeholder = 'Search...',
  style,
  autoFocus = false,
  ...rest
}) => {
  const handleClear = () => {
    onChangeText('');
    if (onClear) {
      onClear();
    }
  };

  return (
    <View style={[styles.container, style]}>
      <Search 
        size={layout.iconSize.m} 
        color={colors.textSecondary} 
        style={styles.searchIcon} 
      />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textLight}
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus={autoFocus}
        clearButtonMode="never"
        {...rest}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <X size={layout.iconSize.s} color={colors.textSecondary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: layout.borderRadius.m,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: layout.spacing.m,
    height: 44,
  },
  searchIcon: {
    marginRight: layout.spacing.s,
  },
  input: {
    flex: 1,
    fontSize: typography.fontSize.m,
    color: colors.text,
    height: '100%',
  },
  clearButton: {
    padding: layout.spacing.xs,
  },
});

export default SearchBar;