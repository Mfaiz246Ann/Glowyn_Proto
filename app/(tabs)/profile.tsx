import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  ActionSheetIOS,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Settings, Grid, Bookmark, Heart, Clock, LogOut } from 'lucide-react-native';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import layout from '@/constants/layout';
import { useUserStore } from '@/store/userStore';
import { useProductStore } from '@/store/productStore';
import { useFeedStore } from '@/store/feedStore';

// Components
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import SectionHeader from '@/components/ui/SectionHeader';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, analysisResults, logout } = useUserStore();
  const { wishlist } = useProductStore();
  const { posts, getSavedPosts } = useFeedStore();
  
  const savedPosts = getSavedPosts();
  const userPosts = posts.filter(post => post.user.id === user?.id);

  const [activeTab, setActiveTab] = useState('analyses');

  const handleLogout = () => {
    // Explicitly call logout function from the store
    logout();
    // The redirect will happen automatically in _layout.tsx
    console.log('Logout function called');
  };

  const handleSettingsPress = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Edit Profile', 'Logout'],
          cancelButtonIndex: 0,
          destructiveButtonIndex: 2,
          title: 'Settings',
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            // Edit Profile
            console.log('Edit Profile pressed');
          } else if (buttonIndex === 2) {
            // Logout - Make sure to call handleLogout directly
            handleLogout();
          }
        }
      );
    } else {
      // For Android and other platforms
      Alert.alert(
        'Settings',
        'Choose an option',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Edit Profile', onPress: () => console.log('Edit Profile pressed') },
          // Make sure the onPress handler is correctly bound to handleLogout
          { 
            text: 'Logout', 
            onPress: () => handleLogout(), 
            style: 'destructive' 
          },
        ],
        { cancelable: true }
      );
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'analyses':
        return (
          <View style={styles.analysesContainer}>
            {analysisResults.map((analysis) => (
              <TouchableOpacity 
                key={analysis.id}
                style={styles.analysisCard}
                onPress={() => {
                  switch (analysis.type) {
                    case 'color':
                      router.push('/color-analysis');
                      break;
                    case 'face':
                      router.push('/face-shape');
                      break;
                    case 'skin':
                      router.push('/skin-analysis');
                      break;
                    default:
                      console.log('Navigate to analysis:', analysis.id);
                  }
                }}
              >
                <View style={styles.analysisContent}>
                  <Text style={styles.analysisTitle}>{analysis.title}</Text>
                  <Text style={styles.analysisDate}>{new Date(analysis.date).toLocaleDateString('id-ID')}</Text>
                  <Text style={styles.analysisDescription}>{analysis.description}</Text>
                </View>
                {analysis.imageUrl && (
                  <Image 
                    source={{ uri: analysis.imageUrl }} 
                    style={styles.analysisImage} 
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        );
      case 'posts':
        return (
          <View style={styles.postsGrid}>
            {userPosts.map((post) => (
              <TouchableOpacity 
                key={post.id}
                style={styles.postThumbnail}
                onPress={() => router.push(`/post/${post.id}`)}
              >
                <Image 
                  source={{ uri: post.imageUrl }} 
                  style={styles.postImage} 
                />
              </TouchableOpacity>
            ))}
          </View>
        );
      case 'saved':
        return (
          <View style={styles.postsGrid}>
            {savedPosts.map((post) => (
              <TouchableOpacity 
                key={post.id}
                style={styles.postThumbnail}
                onPress={() => router.push(`/post/${post.id}`)}
              >
                <Image 
                  source={{ uri: post.imageUrl }} 
                  style={styles.postImage} 
                />
              </TouchableOpacity>
            ))}
          </View>
        );
      case 'wishlist':
        return (
          <View style={styles.wishlistGrid}>
            {wishlist.map((product) => (
              <TouchableOpacity 
                key={product.id}
                style={styles.wishlistItem}
                onPress={() => router.push(`/product/${product.id}`)}
              >
                <Image 
                  source={{ uri: product.imageUrl }} 
                  style={styles.wishlistImage} 
                />
                <View style={styles.wishlistInfo}>
                  <Text style={styles.wishlistName} numberOfLines={1}>{product.name}</Text>
                  <Text style={styles.wishlistPrice}>Rp {product.price.toLocaleString('id-ID')}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        );
      default:
        return null;
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={handleSettingsPress}>
          <Settings size={layout.iconSize.m} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <Avatar source={user.avatar} size={100} borderWidth={3} borderColor={colors.primary} />
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userUsername}>@{user.username}</Text>
        <Text style={styles.userBio}>{user.bio}</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.following}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userPosts.length}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
        </View>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'analyses' && styles.activeTabButton]}
          onPress={() => setActiveTab('analyses')}
        >
          <Clock 
            size={layout.iconSize.s} 
            color={activeTab === 'analyses' ? colors.primary : colors.textSecondary} 
          />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'posts' && styles.activeTabButton]}
          onPress={() => setActiveTab('posts')}
        >
          <Grid 
            size={layout.iconSize.s} 
            color={activeTab === 'posts' ? colors.primary : colors.textSecondary} 
          />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'saved' && styles.activeTabButton]}
          onPress={() => setActiveTab('saved')}
        >
          <Bookmark 
            size={layout.iconSize.s} 
            color={activeTab === 'saved' ? colors.primary : colors.textSecondary} 
          />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'wishlist' && styles.activeTabButton]}
          onPress={() => setActiveTab('wishlist')}
        >
          <Heart 
            size={layout.iconSize.s} 
            color={activeTab === 'wishlist' ? colors.primary : colors.textSecondary} 
          />
        </TouchableOpacity>
      </View>

      {renderTabContent()}

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: layout.spacing.l,
    paddingTop: layout.spacing.l,
    paddingBottom: layout.spacing.m,
  },
  headerTitle: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: layout.spacing.l,
    paddingVertical: layout.spacing.l,
  },
  userName: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginTop: layout.spacing.m,
  },
  userUsername: {
    fontSize: typography.fontSize.m,
    color: colors.textSecondary,
    marginBottom: layout.spacing.s,
  },
  userBio: {
    fontSize: typography.fontSize.m,
    color: colors.text,
    textAlign: 'center',
    marginBottom: layout.spacing.m,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: layout.spacing.l,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: typography.fontSize.l,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  statLabel: {
    fontSize: typography.fontSize.s,
    color: colors.textSecondary,
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: colors.border,
    alignSelf: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
    marginTop: layout.spacing.l,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: layout.spacing.m,
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  analysesContainer: {
    padding: layout.spacing.l,
  },
  analysisCard: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: layout.borderRadius.m,
    padding: layout.spacing.m,
    marginBottom: layout.spacing.m,
    borderWidth: 1,
    borderColor: colors.border,
  },
  analysisContent: {
    flex: 1,
    marginRight: layout.spacing.m,
  },
  analysisTitle: {
    fontSize: typography.fontSize.l,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: layout.spacing.xs,
  },
  analysisDate: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginBottom: layout.spacing.s,
  },
  analysisDescription: {
    fontSize: typography.fontSize.s,
    color: colors.textSecondary,
  },
  analysisImage: {
    width: 80,
    height: 80,
    borderRadius: layout.borderRadius.m,
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: layout.spacing.s,
  },
  postThumbnail: {
    width: '33.33%',
    aspectRatio: 1,
    padding: layout.spacing.xs,
  },
  postImage: {
    width: '100%',
    height: '100%',
    borderRadius: layout.borderRadius.s,
  },
  wishlistGrid: {
    padding: layout.spacing.l,
  },
  wishlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: layout.borderRadius.m,
    padding: layout.spacing.m,
    marginBottom: layout.spacing.m,
    borderWidth: 1,
    borderColor: colors.border,
  },
  wishlistImage: {
    width: 60,
    height: 60,
    borderRadius: layout.borderRadius.s,
    marginRight: layout.spacing.m,
  },
  wishlistInfo: {
    flex: 1,
  },
  wishlistName: {
    fontSize: typography.fontSize.m,
    fontWeight: typography.fontWeight.medium,
    color: colors.text,
    marginBottom: layout.spacing.xs,
  },
  wishlistPrice: {
    fontSize: typography.fontSize.m,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  spacer: {
    height: layout.spacing.xl,
  },
});