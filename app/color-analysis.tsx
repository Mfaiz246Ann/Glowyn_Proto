import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Image,
  SafeAreaView
} from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import colors from "@/constants/colors";
import typography from "@/constants/typography";
import layout from "@/constants/layout";

// Components
import Button from "@/components/ui/Button";
import InfoCard from "@/components/ui/InfoCard";
import Card from "@/components/ui/Card";

export default function ColorAnalysisScreen() {
  const router = useRouter();
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null);

  const colorSeasons = [
    {
      id: "spring",
      name: "Spring Warm",
      description: "Warna-warna cerah dan hangat yang cocok untuk kulit dengan undertone hangat kekuningan.",
      colors: [colors.coral, colors.peach, colors.warmYellow, colors.sageGreen, colors.turquoise],
    },
    {
      id: "summer",
      name: "Summer Cool",
      description: "Warna-warna lembut dan dingin yang cocok untuk kulit dengan undertone dingin kebiruan.",
      colors: ["#B0C4DE", "#D8BFD8", "#ADD8E6", "#E6E6FA", "#F0F8FF"],
    },
    {
      id: "autumn",
      name: "Autumn Warm",
      description: "Warna-warna hangat dan dalam yang cocok untuk kulit dengan undertone hangat keemasan.",
      colors: ["#D2691E", "#CD853F", "#DAA520", "#556B2F", "#8B4513"],
    },
    {
      id: "winter",
      name: "Winter Cool",
      description: "Warna-warna kontras dan dingin yang cocok untuk kulit dengan undertone dingin kebiruan.",
      colors: ["#4B0082", "#800000", "#000080", "#008080", "#FFFFFF"],
    },
  ];

  const handleSeasonSelect = (seasonId: string) => {
    setSelectedSeason(seasonId);
  };

  const renderColorPalette = (colors: string[]) => {
    return (
      <View style={styles.colorPalette}>
        {colors.map((color, index) => (
          <View 
            key={index} 
            style={[styles.colorSwatch, { backgroundColor: color }]} 
          />
        ))}
      </View>
    );
  };

  const selectedSeasonData = colorSeasons.find(season => season.id === selectedSeason);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={layout.iconSize.m} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Analisis Warna</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <InfoCard
          title="Analisis Warna Personal"
          description="Temukan palet warna alami berdasarkan undertone kulit, rambut, dan warna mata Anda."
          style={styles.infoCard}
        />

        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" }} 
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <Text style={styles.sectionTitle}>Pilih Musim Warna Anda</Text>

        <View style={styles.seasonsContainer}>
          {colorSeasons.map((season) => (
            <TouchableOpacity
              key={season.id}
              style={[
                styles.seasonCard,
                selectedSeason === season.id && styles.selectedSeasonCard
              ]}
              onPress={() => handleSeasonSelect(season.id)}
            >
              <Text style={styles.seasonName}>{season.name}</Text>
              <View style={styles.seasonColorPreview}>
                {season.colors.slice(0, 3).map((color, index) => (
                  <View 
                    key={index} 
                    style={[styles.previewSwatch, { backgroundColor: color }]} 
                  />
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {selectedSeasonData && (
          <Card variant="elevated" style={styles.resultCard}>
            <Text style={styles.resultTitle}>Musim Warna Anda: {selectedSeasonData.name}</Text>
            <Text style={styles.resultDescription}>{selectedSeasonData.description}</Text>
            {renderColorPalette(selectedSeasonData.colors)}
            
            <View style={styles.recommendationsContainer}>
              <Text style={styles.recommendationsTitle}>Rekomendasi:</Text>
              <Text style={styles.recommendationItem}>• Gunakan warna-warna dari palet ini untuk pakaian dan makeup</Text>
              <Text style={styles.recommendationItem}>• Hindari warna yang bertentangan dengan musim warna Anda</Text>
              <Text style={styles.recommendationItem}>• Aksesoris dengan warna yang sesuai akan meningkatkan penampilan Anda</Text>
            </View>
          </Card>
        )}

        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: layout.spacing.l,
    paddingVertical: layout.spacing.m,
  },
  backButton: {
    padding: layout.spacing.xs,
  },
  headerTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  placeholder: {
    width: layout.iconSize.m + layout.spacing.xs * 2,
  },
  scrollView: {
    flex: 1,
    padding: layout.spacing.l,
  },
  infoCard: {
    marginBottom: layout.spacing.l,
  },
  imageContainer: {
    height: 200,
    borderRadius: layout.borderRadius.m,
    overflow: "hidden",
    marginBottom: layout.spacing.l,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: layout.spacing.m,
  },
  seasonsContainer: {
    marginBottom: layout.spacing.l,
  },
  seasonCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: layout.spacing.m,
    backgroundColor: colors.card,
    borderRadius: layout.borderRadius.m,
    marginBottom: layout.spacing.m,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedSeasonCard: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  seasonName: {
    fontSize: typography.fontSize.m,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  seasonColorPreview: {
    flexDirection: "row",
  },
  previewSwatch: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginLeft: layout.spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
  },
  resultCard: {
    marginBottom: layout.spacing.l,
  },
  resultTitle: {
    fontSize: typography.fontSize.l,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: layout.spacing.s,
  },
  resultDescription: {
    fontSize: typography.fontSize.m,
    color: colors.text,
    marginBottom: layout.spacing.m,
  },
  colorPalette: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: layout.spacing.m,
  },
  colorSwatch: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.border,
  },
  recommendationsContainer: {
    backgroundColor: colors.primaryLight,
    borderRadius: layout.borderRadius.m,
    padding: layout.spacing.m,
  },
  recommendationsTitle: {
    fontSize: typography.fontSize.m,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: layout.spacing.s,
  },
  recommendationItem: {
    fontSize: typography.fontSize.m,
    color: colors.text,
    marginBottom: layout.spacing.xs,
  },
  spacer: {
    height: layout.spacing.xl,
  },
});