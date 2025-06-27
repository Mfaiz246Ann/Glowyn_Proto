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

export default function SkinAnalysisScreen() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const skinTypes = [
    {
      id: "dry",
      name: "Dry",
      description: "Kulit kering cenderung terasa kaku, kasar, dan mudah mengelupas.",
      recommendations: [
        "Gunakan pelembab yang kaya dan berat",
        "Hindari produk dengan alkohol yang dapat mengeringkan kulit",
        "Gunakan pembersih wajah yang lembut dan tidak mengandung sabun"
      ]
    },
    {
      id: "oily",
      name: "Oily",
      description: "Kulit berminyak cenderung mengkilap, terutama di zona T (dahi, hidung, dan dagu).",
      recommendations: [
        "Gunakan produk non-comedogenic yang tidak menyumbat pori-pori",
        "Pilih pelembab ringan berbasis gel",
        "Gunakan masker tanah liat seminggu sekali untuk mengontrol minyak"
      ]
    },
    {
      id: "combination",
      name: "Combination",
      description: "Kulit kombinasi memiliki area berminyak (biasanya di zona T) dan area kering di pipi.",
      recommendations: [
        "Gunakan produk berbeda untuk area yang berbeda pada wajah",
        "Pilih toner tanpa alkohol untuk menyeimbangkan pH kulit",
        "Eksfoliasi lembut 1-2 kali seminggu"
      ]
    },
    {
      id: "normal",
      name: "Normal",
      description: "Kulit normal memiliki keseimbangan yang baik, tidak terlalu berminyak atau kering.",
      recommendations: [
        "Pertahankan rutinitas perawatan kulit yang konsisten",
        "Gunakan tabir surya setiap hari",
        "Pilih produk yang mempertahankan kelembaban alami kulit"
      ]
    },
  ];

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
  };

  const selectedTypeData = skinTypes.find(type => type.id === selectedType);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={layout.iconSize.m} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Analisis Kulit</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <InfoCard
          title="Kenali Jenis Kulit Anda"
          description="Temukan jenis kulit Anda dan dapatkan rekomendasi perawatan yang tepat untuk kulit sehat dan bercahaya."
          style={styles.infoCard}
        />

        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: "https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" }} 
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <Text style={styles.sectionTitle}>Pilih Jenis Kulit Anda</Text>

        <View style={styles.typesContainer}>
          {skinTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.typeCard,
                selectedType === type.id && styles.selectedTypeCard
              ]}
              onPress={() => handleTypeSelect(type.id)}
            >
              <Text style={styles.typeName}>{type.name}</Text>
              <Text style={styles.typeDescription} numberOfLines={2}>
                {type.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedTypeData && (
          <Card variant="elevated" style={styles.resultCard}>
            <Text style={styles.resultTitle}>Jenis Kulit Anda: {selectedTypeData.name}</Text>
            <Text style={styles.resultDescription}>{selectedTypeData.description}</Text>
            
            <View style={styles.recommendationsContainer}>
              <Text style={styles.recommendationsTitle}>Rekomendasi Perawatan:</Text>
              {selectedTypeData.recommendations.map((recommendation, index) => (
                <Text key={index} style={styles.recommendationItem}>• {recommendation}</Text>
              ))}
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
  typesContainer: {
    marginBottom: layout.spacing.l,
  },
  typeCard: {
    padding: layout.spacing.m,
    backgroundColor: colors.card,
    borderRadius: layout.borderRadius.m,
    marginBottom: layout.spacing.m,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedTypeCard: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  typeName: {
    fontSize: typography.fontSize.l,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: layout.spacing.xs,
  },
  typeDescription: {
    fontSize: typography.fontSize.s,
    color: colors.textSecondary,
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