import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  Image
} from "react-native";
import { useRouter } from "expo-router";
import colors from "@/constants/colors";
import typography from "@/constants/typography";
import layout from "@/constants/layout";

// Components
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import CategoryCard from "@/components/ui/CategoryCard";
import InfoCard from "@/components/ui/InfoCard";

export default function HomeScreen() {
  const router = useRouter();

  const handleAnalysisPress = (type: string) => {
    switch (type) {
      case "color":
        router.push("/color-analysis");
        break;
      case "face":
        router.push("/face-shape");
        break;
      case "skin":
        router.push("/skin-analysis");
        break;
      default:
        console.log("Unknown analysis type");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Analisis Kecantikan</Text>
          <Text style={styles.subtitle}>Temukan gaya sempurnamu</Text>
        </View>

        <InfoCard
          title="Selamat Datang!"
          description="Aplikasi ini membantu Anda menemukan warna, bentuk wajah, dan jenis kulit yang cocok untuk Anda."
          style={styles.infoCard}
        />

        <View style={styles.bannerContainer}>
          <Image 
            source={{ uri: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" }} 
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>Temukan Kecantikanmu</Text>
            <Text style={styles.bannerSubtitle}>Analisis warna, bentuk wajah, dan kulit</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Pilih Analisis</Text>

        <CategoryCard
          title="Analisis Warna"
          description="Temukan palet warna yang cocok dengan warna kulit Anda"
          icon="palette"
          backgroundColor="#FFC1E3"
          onPress={() => handleAnalysisPress("color")}
        />

        <CategoryCard
          title="Bentuk Wajah"
          description="Kenali bentuk wajah Anda dan gaya yang cocok"
          icon="user"
          backgroundColor="#E1F5FE"
          onPress={() => handleAnalysisPress("face")}
        />

        <CategoryCard
          title="Analisis Kulit"
          description="Kenali jenis kulit dan perawatan yang tepat"
          icon="droplet"
          backgroundColor="#F3E5F5"
          onPress={() => handleAnalysisPress("skin")}
        />

        <Card variant="elevated" style={styles.tipCard}>
          <Text style={styles.tipTitle}>Tips Kecantikan</Text>
          <Text style={styles.tipText}>
            Gunakan tabir surya setiap hari untuk melindungi kulit dari sinar UV yang berbahaya.
          </Text>
          <Button 
            title="Lihat Semua Tips" 
            variant="outline"
            size="small"
            style={styles.tipButton}
          />
        </Card>

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
  scrollView: {
    flex: 1,
    padding: layout.spacing.l,
  },
  header: {
    marginBottom: layout.spacing.l,
  },
  title: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: layout.spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.m,
    color: colors.textSecondary,
  },
  infoCard: {
    marginBottom: layout.spacing.l,
  },
  bannerContainer: {
    height: 200,
    borderRadius: layout.borderRadius.m,
    overflow: "hidden",
    marginBottom: layout.spacing.xl,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "flex-end",
    padding: layout.spacing.l,
  },
  bannerTitle: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: "white",
    marginBottom: layout.spacing.xs,
  },
  bannerSubtitle: {
    fontSize: typography.fontSize.m,
    color: "white",
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: layout.spacing.m,
  },
  tipCard: {
    marginTop: layout.spacing.l,
  },
  tipTitle: {
    fontSize: typography.fontSize.l,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: layout.spacing.s,
  },
  tipText: {
    fontSize: typography.fontSize.m,
    color: colors.text,
    lineHeight: typography.lineHeight.m,
    marginBottom: layout.spacing.m,
  },
  tipButton: {
    alignSelf: "flex-start",
  },
  spacer: {
    height: layout.spacing.xl,
  },
});