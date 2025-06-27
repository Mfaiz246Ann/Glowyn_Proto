import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ViewStyle
} from "react-native";
import { Palette, User, Droplet } from "lucide-react-native";
import colors from "@/constants/colors";
import typography from "@/constants/typography";
import layout from "@/constants/layout";

interface CategoryCardProps {
  title: string;
  description?: string;
  icon?: string;
  backgroundColor?: string;
  onPress?: () => void;
  style?: ViewStyle;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  icon,
  backgroundColor = colors.primaryLight,
  onPress,
  style,
}) => {
  const getIconComponent = () => {
    const iconSize = layout.iconSize.l;
    const iconColor = colors.primary;

    switch (icon) {
      case "palette":
        return <Palette size={iconSize} color={iconColor} />;
      case "user":
        return <User size={iconSize} color={iconColor} />;
      case "droplet":
        return <Droplet size={iconSize} color={iconColor} />;
      default:
        return <Palette size={iconSize} color={iconColor} />;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        {getIconComponent()}
      </View>
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
    padding: layout.spacing.m,
    marginBottom: layout.spacing.m,
    height: 160,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: layout.spacing.s,
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-end",
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