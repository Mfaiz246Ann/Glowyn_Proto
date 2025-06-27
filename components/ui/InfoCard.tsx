import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ViewStyle 
} from "react-native";
import { Info } from "lucide-react-native";
import colors from "@/constants/colors";
import typography from "@/constants/typography";
import layout from "@/constants/layout";

interface InfoCardProps {
  title: string;
  description: string;
  style?: ViewStyle;
  type?: "info" | "warning" | "error";
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  description,
  style,
  type = "info",
}) => {
  const getBackgroundColor = () => {
    switch (type) {
      case "warning":
        return "rgba(255, 193, 7, 0.1)";
      case "error":
        return "rgba(244, 67, 54, 0.1)";
      default:
        return "rgba(33, 150, 243, 0.1)";
    }
  };

  const getIconColor = () => {
    switch (type) {
      case "warning":
        return colors.warning;
      case "error":
        return colors.error;
      default:
        return colors.info;
    }
  };

  return (
    <View 
      style={[
        styles.container, 
        { backgroundColor: getBackgroundColor() },
        style
      ]}
    >
      <View style={styles.iconContainer}>
        <Info size={layout.iconSize.m} color={getIconColor()} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: layout.borderRadius.m,
    padding: layout.spacing.m,
    marginVertical: layout.spacing.m,
  },
  iconContainer: {
    marginRight: layout.spacing.m,
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: typography.fontSize.m,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: layout.spacing.xs,
  },
  description: {
    fontSize: typography.fontSize.s,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.s,
  },
});

export default InfoCard;