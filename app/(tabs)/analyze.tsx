import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
} from 'react-native';
import { useRouter } from 'expo-router';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import layout from '@/constants/layout';
import { analysisTypes } from '@/mocks/analysis';

// Components
import CategoryCard from '@/components/ui/CategoryCard';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import { Camera } from 'lucide-react-native';

export default function AnalyzeScreen() {
  const router = useRouter();

  const handleAnalysisPress = (type: string) => {
    switch (type) {
      case 'color':
        router.push('/color-analysis');
        break;
      case 'face':
        router.push('/face-shape');
        break;
      case 'skin':
        router.push('/skin-analysis');
        break;
      case 'style':
        router.push('/style-analysis');
        break;
      default:
        console.log('Unknown analysis type');
    }
  };

  const handleVirtualTryOnPress = () => {
    router.push('/virtual-try-on');
  };

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Analyze</Text>
      </View>

      <View style={styles.introSection}>
        <Text style={styles.introTitle}>Temukan Kecantikanmu</Text>
        <Text style={styles.introText}>
          Gunakan AI kami untuk menganalisis warna, bentuk wajah, kulit, dan gaya personal Anda untuk rekomendasi yang dipersonalisasi.
        </Text>
      </View>

      <SectionHeader 
        title="Pilih Analisis" 
      />

      <View style={styles.analysisGrid}>
        {analysisTypes.map((item) => (
          <CategoryCard
            key={item.id}
            title={item.title}
            description={item.description}
            icon={item.icon}
            backgroundColor={item.backgroundColor}
            onPress={() => handleAnalysisPress(item.type)}
            style={styles.analysisCard}
          />
        ))}
      </View>

      <View style={styles.virtualTryOnSection}>
        <Text style={styles.virtualTryOnTitle}>Virtual Try-On</Text>
        <Text style={styles.virtualTryOnText}>
          Coba produk makeup dan aksesoris secara virtual sebelum membeli.
        </Text>
        <Button 
          title="Coba Sekarang" 
          leftIcon={<Camera size={layout.iconSize.s} color="white" />}
          onPress={handleVirtualTryOnPress}
          style={styles.virtualTryOnButton}
        />
      </View>

      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: layout.spacing.l,
    paddingTop: layout.spacing.l,
    paddingBottom: layout.spacing.s,
  },
  headerTitle: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  introSection: {
    paddingHorizontal: layout.spacing.l,
    paddingVertical: layout.spacing.l,
  },
  introTitle: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: layout.spacing.s,
  },
  introText: {
    fontSize: typography.fontSize.m,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.m,
  },
  analysisGrid: {
    paddingHorizontal: layout.spacing.l,
    marginBottom: layout.spacing.xl,
  },
  analysisCard: {
    marginBottom: layout.spacing.m,
  },
  virtualTryOnSection: {
    margin: layout.spacing.l,
    padding: layout.spacing.l,
    backgroundColor: colors.primaryLight,
    borderRadius: layout.borderRadius.m,
  },
  virtualTryOnTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: layout.spacing.s,
  },
  virtualTryOnText: {
    fontSize: typography.fontSize.m,
    color: colors.textSecondary,
    marginBottom: layout.spacing.l,
  },
  virtualTryOnButton: {
    alignSelf: 'flex-start',
  },
  spacer: {
    height: layout.spacing.xl,
  },
});