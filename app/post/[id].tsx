import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Heart, MessageCircle, Bookmark, Share2, Send } from 'lucide-react-native';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import layout from '@/constants/layout';
import { useFeedStore } from '@/store/feedStore';
import { useUserStore } from '@/store/userStore';

// Components
import Avatar from '@/components/ui/Avatar';
import ProductCard from '@/components/ui/ProductCard';

export default function PostDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { 
    getPostById, 
    getCommentsByPostId, 
    likePost, 
    unlikePost, 
    savePost, 
    unsavePost,
    addComment,
  } = useFeedStore();
  const { user } = useUserStore();
  
  const [commentText, setCommentText] = useState('');
  
  const post = getPostById(id as string);
  const comments = getCommentsByPostId(id as string);

  if (!post) {
    return (
      <View style={styles.container}>
        <Text>Post not found</Text>
      </View>
    );
  }

  const handleLikePress = () => {
    if (post.isLiked) {
      unlikePost(post.id);
    } else {
      likePost(post.id);
    }
  };

  const handleSavePress = () => {
    if (post.isSaved) {
      unsavePost(post.id);
    } else {
      savePost(post.id);
    }
  };

  const handleSubmitComment = () => {
    if (!commentText.trim() || !user) return;
    
    const newComment = {
      id: `comment-${Date.now()}`,
      user: user,
      text: commentText,
      date: new Date().toISOString(),
      likes: 0,
    };
    
    addComment(post.id, newComment);
    setCommentText('');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={layout.iconSize.m} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Post</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.postContainer}>
          <View style={styles.postHeader}>
            <TouchableOpacity 
              style={styles.userInfo}
              onPress={() => router.push(`/user/${post.user.id}`)}
            >
              <Avatar source={post.user.avatar} size={40} />
              <View style={styles.userTextInfo}>
                <Text style={styles.userName}>{post.user.name}</Text>
                <Text style={styles.postDate}>{formatDate(post.date)}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <Image 
            source={{ uri: post.imageUrl }} 
            style={styles.postImage} 
            resizeMode="cover"
          />

          <View style={styles.actionsContainer}>
            <View style={styles.leftActions}>
              <TouchableOpacity 
                style={styles.actionButton} 
                onPress={handleLikePress}
              >
                <Heart
                  size={layout.iconSize.m}
                  color={post.isLiked ? colors.primary : colors.textSecondary}
                  fill={post.isLiked ? colors.primary : 'transparent'}
                />
                <Text style={styles.actionText}>{post.likes}</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.actionButton} 
              >
                <MessageCircle
                  size={layout.iconSize.m}
                  color={colors.textSecondary}
                />
                <Text style={styles.actionText}>{post.comments}</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.actionButton} 
              >
                <Share2
                  size={layout.iconSize.m}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleSavePress}>
              <Bookmark
                size={layout.iconSize.m}
                color={post.isSaved ? colors.primary : colors.textSecondary}
                fill={post.isSaved ? colors.primary : 'transparent'}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.captionContainer}>
            <Text style={styles.caption}>
              <Text style={styles.userName}>{post.user.name} </Text>
              {post.caption}
            </Text>
          </View>

          {post.tags && post.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              {post.tags.map((tag, index) => (
                <TouchableOpacity key={index} style={styles.tag}>
                  <Text style={styles.tagText}>#{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {post.products && post.products.length > 0 && (
            <View style={styles.productsContainer}>
              <Text style={styles.sectionTitle}>Products in this post</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.productsList}
              >
                {post.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onPress={() => router.push(`/product/${product.id}`)}
                    style={styles.productCard}
                  />
                ))}
              </ScrollView>
            </View>
          )}

          <View style={styles.commentsContainer}>
            <Text style={styles.sectionTitle}>Comments</Text>
            
            {comments.length > 0 ? (
              comments.map((comment) => (
                <View key={comment.id} style={styles.commentItem}>
                  <Avatar source={comment.user.avatar} size={36} />
                  <View style={styles.commentContent}>
                    <View style={styles.commentHeader}>
                      <Text style={styles.commentUserName}>{comment.user.name}</Text>
                      <Text style={styles.commentDate}>{formatDate(comment.date)}</Text>
                    </View>
                    <Text style={styles.commentText}>{comment.text}</Text>
                    <View style={styles.commentActions}>
                      <TouchableOpacity style={styles.commentAction}>
                        <Text style={styles.commentActionText}>Like</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.commentAction}>
                        <Text style={styles.commentActionText}>Reply</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.noCommentsText}>No comments yet. Be the first to comment!</Text>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.commentInputContainer}>
        <Avatar source={user?.avatar || ''} size={36} />
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment..."
          placeholderTextColor={colors.textLight}
          value={commentText}
          onChangeText={setCommentText}
          multiline
        />
        <TouchableOpacity 
          style={[
            styles.sendButton,
            !commentText.trim() && styles.disabledSendButton
          ]}
          onPress={handleSubmitComment}
          disabled={!commentText.trim()}
        >
          <Send 
            size={layout.iconSize.s} 
            color={!commentText.trim() ? colors.textLight : colors.primary} 
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: layout.spacing.l,
    paddingTop: layout.spacing.l,
    paddingBottom: layout.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
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
  scrollContainer: {
    flex: 1,
  },
  postContainer: {
    padding: layout.spacing.l,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: layout.spacing.m,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userTextInfo: {
    marginLeft: layout.spacing.m,
  },
  userName: {
    fontSize: typography.fontSize.m,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  postDate: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  postImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: layout.borderRadius.m,
    marginBottom: layout.spacing.m,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: layout.spacing.m,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: layout.spacing.l,
  },
  actionText: {
    fontSize: typography.fontSize.s,
    color: colors.textSecondary,
    marginLeft: layout.spacing.xs,
  },
  captionContainer: {
    marginBottom: layout.spacing.m,
  },
  caption: {
    fontSize: typography.fontSize.m,
    color: colors.text,
    lineHeight: typography.lineHeight.m,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: layout.spacing.l,
  },
  tag: {
    backgroundColor: colors.primaryLight,
    borderRadius: layout.borderRadius.s,
    paddingHorizontal: layout.spacing.s,
    paddingVertical: layout.spacing.xs,
    marginRight: layout.spacing.s,
    marginBottom: layout.spacing.s,
  },
  tagText: {
    fontSize: typography.fontSize.s,
    color: colors.primaryDark,
  },
  productsContainer: {
    marginBottom: layout.spacing.l,
  },
  sectionTitle: {
    fontSize: typography.fontSize.l,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: layout.spacing.m,
  },
  productsList: {
    gap: layout.spacing.m,
  },
  productCard: {
    marginRight: layout.spacing.m,
  },
  commentsContainer: {
    marginBottom: layout.spacing.l,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: layout.spacing.m,
  },
  commentContent: {
    flex: 1,
    marginLeft: layout.spacing.m,
    backgroundColor: colors.card,
    borderRadius: layout.borderRadius.m,
    padding: layout.spacing.m,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: layout.spacing.xs,
  },
  commentUserName: {
    fontSize: typography.fontSize.s,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  commentDate: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  commentText: {
    fontSize: typography.fontSize.m,
    color: colors.text,
    marginBottom: layout.spacing.s,
  },
  commentActions: {
    flexDirection: 'row',
  },
  commentAction: {
    marginRight: layout.spacing.m,
  },
  commentActionText: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  noCommentsText: {
    fontSize: typography.fontSize.m,
    color: colors.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: layout.spacing.l,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: layout.spacing.m,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.card,
  },
  commentInput: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: layout.borderRadius.m,
    paddingHorizontal: layout.spacing.m,
    paddingVertical: layout.spacing.s,
    marginHorizontal: layout.spacing.m,
    fontSize: typography.fontSize.m,
    maxHeight: 100,
  },
  sendButton: {
    padding: layout.spacing.s,
  },
  disabledSendButton: {
    opacity: 0.5,
  },
});