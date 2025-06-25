import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
} from 'react-native';
import { useRouter } from 'expo-router';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import layout from '@/constants/layout';
import { useFeedStore } from '@/store/feedStore';

// Components
import SearchBar from '@/components/ui/SearchBar';
import FeedPost from '@/components/ui/FeedPost';

export default function StyleFeedScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const { posts, likePost, unlikePost, savePost, unsavePost } = useFeedStore();

  const handlePostPress = (postId: string) => {
    router.push(`/post/${postId}`);
  };

  const handleLikePress = (postId: string, isLiked: boolean) => {
    if (isLiked) {
      unlikePost(postId);
    } else {
      likePost(postId);
    }
  };

  const handleSavePress = (postId: string, isSaved: boolean) => {
    if (isSaved) {
      unsavePost(postId);
    } else {
      savePost(postId);
    }
  };

  const handleUserPress = (userId: string) => {
    router.push(`/user/${userId}`);
  };

  const renderPost = ({ item }: { item: any }) => (
    <FeedPost
      post={item}
      onPress={() => handlePostPress(item.id)}
      onLikePress={() => handleLikePress(item.id, item.isLiked)}
      onCommentPress={() => handlePostPress(item.id)}
      onSavePress={() => handleSavePress(item.id, item.isSaved)}
      onSharePress={() => console.log('Share post:', item.id)}
      onUserPress={() => handleUserPress(item.user.id)}
      style={styles.post}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Style Feed</Text>
      </View>

      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Cari gaya, pengguna, atau tag..."
        />
      </View>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.feedContainer}
      />
    </View>
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
  searchContainer: {
    paddingHorizontal: layout.spacing.l,
    marginBottom: layout.spacing.m,
  },
  feedContainer: {
    paddingHorizontal: layout.spacing.l,
    paddingBottom: layout.spacing.xl,
  },
  post: {
    marginBottom: layout.spacing.l,
  },
});