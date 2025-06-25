import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import layout from '@/constants/layout';
import { useUserStore } from '@/store/userStore';

// Components
import Button from '@/components/ui/Button';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useUserStore();

  const handleGoogleLogin = () => {
    // In a real app, this would trigger Google OAuth
    login();
    // The redirect will happen automatically in _layout.tsx
  };

  const handleGuestLogin = () => {
    // Navigate to home without changing login state
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Glowyn</Text>
          <Text style={styles.tagline}>Temukan Gaya Sempurnamu</Text>
        </View>

        <View style={styles.illustrationContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' }} 
            style={styles.illustration}
            resizeMode="cover"
          />
        </View>

        <View style={styles.actionsContainer}>
          <Button 
            title="Lanjutkan dengan Google" 
            onPress={handleGoogleLogin}
            style={styles.googleButton}
            leftIcon={
              <Image 
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' }} 
                style={styles.googleIcon} 
              />
            }
          />
          
          <Button 
            title="Lanjutkan sebagai Tamu" 
            variant="outline"
            onPress={handleGuestLogin}
            style={styles.guestButton}
          />
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            Dengan melanjutkan, Anda menyetujui
          </Text>
          <View style={styles.footerLinks}>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Syarat & Ketentuan</Text>
            </TouchableOpacity>
            <Text style={styles.footerText}> dan </Text>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Kebijakan Privasi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: layout.spacing.l,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: layout.spacing.xl,
  },
  title: {
    fontSize: 42,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    marginBottom: layout.spacing.s,
  },
  tagline: {
    fontSize: typography.fontSize.l,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: layout.spacing.xl,
  },
  illustration: {
    width: '100%',
    height: 250,
    borderRadius: layout.borderRadius.l,
  },
  actionsContainer: {
    marginBottom: layout.spacing.xl,
    gap: layout.spacing.m,
  },
  googleButton: {
    marginBottom: layout.spacing.m,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: layout.spacing.s,
  },
  guestButton: {
    backgroundColor: 'transparent',
  },
  footerContainer: {
    alignItems: 'center',
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  footerText: {
    fontSize: typography.fontSize.s,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  footerLink: {
    fontSize: typography.fontSize.s,
    color: colors.primary,
    fontWeight: typography.fontWeight.medium,
  },
});