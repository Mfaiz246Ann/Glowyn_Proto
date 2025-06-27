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

export default function FaceShapeScreen() {
  const router = useRouter();
  const [selectedShape, setSelectedShape] = useState<string | null>(null);

  const faceShapes = [
    {
      id: "oval",
      name: "Oval",
      description: "Bentuk wajah yang seimbang dengan dahi sedikit lebih lebar dari dagu yang meruncing.",
      recommendations: [
        "Hampir semua gaya rambut cocok untuk bentuk wajah oval",
        "Kacamata dengan bentuk persegi atau kotak akan menyeimbangkan wajah",
        "Anting-anting panjang akan menonjolkan bentuk wajah yang proporsional"
      ]
    },
    {
      id: "round",
      name: "Round",
      description: "Bentuk wajah dengan lebar dan panjang yang hampir sama, dengan pipi yang lebih penuh.",
      recommendations: [
        "Gaya rambut yang menambah tinggi di bagian atas kepala",
        "Potongan asimetris untuk menambah sudut pada wajah",
        "Kacamata persegi atau kotak untuk menambah definisi"
      ]
    },
    {
      id: "square",
      name: "Square",
      description: "Bentuk wajah dengan rahang yang kuat dan garis dahi yang lurus.",
      recommendations: [
        "Gaya rambut yang melunakkan sudut wajah",
        "Layer dan tekstur di sekitar wajah",
        "Kacamata bulat atau oval untuk melunakkan garis wajah"
      ]
    },
    {
      id: "heart",
      name: "Heart",
      description: "Bentuk wajah dengan dahi lebar dan dagu yang meruncing.",
      recommendations: [
        "Gaya rambut yang menambah volume di sekitar dagu",
        "Poni samping untuk menyeimbangkan dahi yang lebar",
        "Kacamata dengan bingkai bawah yang lebih berat"
      ]
    },
  ];

  const handleShapeSelect = (shapeId: string) => {
    setSelectedShape(shapeId);
  };

  const selectedShapeData = faceShapes.find(shape => shape.id === selectedShape);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={layout.iconSize.m} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Analisis Bentuk Wajah</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <InfoCard
          title="Kenali Bentuk Wajah Anda"
          description="Temukan bentuk wajah Anda dan dapatkan rekomendasi gaya rambut, kacamata, dan aksesoris yang cocok."
          style={styles.infoCard}
        />

        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" }} 
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <Text style={styles.sectionTitle}>Pilih Bentuk Wajah Anda</Text>

        <View style={styles.shapesContainer}>
          {faceShapes.map((shape) => (
            <TouchableOpacity
              key={shape.id}
              style={[
                styles.shapeCard,
                selectedShape === shape.id && styles.selectedShapeCard
              ]}
              onPress={() => handleShapeSelect(shape.id)}
            >
              <Text style={styles.shapeName}>{shape.name}</Text>
              <Text style={styles.shapeDescription} numberOfLines={2}>
                {shape.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedShapeData && (
          <Card variant="elevated" style={styles.resultCard}>
            <Text style={styles.resultTitle}>Bentuk Wajah Anda: {selectedShapeData.name}</Text>
            <Text style={styles.resultDescription}>{selectedShapeData.description}</Text>
            
            <View style={styles.recommendationsContainer}>
              <Text style={styles.recommendationsTitle}>Rekomendasi:</Text>
              {selectedShapeData.recommendations.map((recommendation, index) => (
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
  shapesContainer: {
    marginBottom: layout.spacing.l,
  },
  shapeCard: {
    padding: layout.spacing.m,
    backgroundColor: colors.card,
    borderRadius: layout.borderRadius.m,
    marginBottom: layout.spacing.m,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedShapeCard: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  shapeName: {
    fontSize: typography.fontSize.l,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: layout.spacing.xs,
  },
  shapeDescription: {
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