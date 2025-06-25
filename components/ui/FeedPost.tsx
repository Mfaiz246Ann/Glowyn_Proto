import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ViewStyle 
} from 'react-native';
import { Heart, MessageCircle, Bookmark, Share2 } from 'lucide-react-native';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import layout from '@/constants/layout';
import { FeedPost as FeedPostType } from '@/types';
import Avatar from './Avatar';

interface FeedPostProps {
  post: FeedPostType;
  onPress?: () => void;
  onLikePress?: () => void;
  onCommentPress?: () => void;
  onSavePress?: () => void;
  onSharePress?: () => void;
  onUserPress?: () => void;
  style?: ViewStyle;
}

const FeedPost: React.FC<FeedPostProps> = ({
  post,
  onPress,
  onLikePress,
  onCommentPress,
  onSavePress,
  onSharePress,
  onUserPress,
  style,
}) => {
  const { user, imageUrl, caption, likes, comments, date, isLiked, isSaved } = post;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity 
        style={styles.header} 
        onPress={onUserPress}
        activeOpacity={0.7}
      >
        <Avatar source={user.avatar} size={40} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.date}>{formatDate(date)}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        activeOpacity={0.95}
        onPress={onPress}
      >
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </TouchableOpacity>

      <View style={styles.actionsContainer}>
        <View style={styles.leftActions}>
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={onLikePress}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <Heart
              size={layout.iconSize.m}
              color={isLiked ? colors.primary : colors.textSecondary}
              fill={isLiked ? colors.primary : 'transparent'}
            />
            <Text style={styles.actionText}>{likes}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={onCommentPress}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <MessageCircle
              size={layout.iconSize.m}
              color={colors.textSecondary}
            />
            <Text style={styles.actionText}>{comments}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={onSharePress}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <Share2
              size={layout.iconSize.m}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          onPress={onSavePress}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <Bookmark
            size={layout.iconSize.m}
            color={isSaved ? colors.primary : colors.textSecondary}
            fill={isSaved ? colors.primary : 'transparent'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.captionContainer}>
        <Text style={styles.caption}>
          <Text style={styles.userName}>{user.name} </Text>
          {caption}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: layout.borderRadius.m,
    overflow: 'hidden',
    marginBottom: layout.spacing.l,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: layout.spacing.m,
  },
  userInfo: {
    marginLeft: layout.spacing.s,
  },
  userName: {
    fontSize: typography.fontSize.m,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  date: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: layout.spacing.m,
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
    paddingHorizontal: layout.spacing.m,
    paddingBottom: layout.spacing.m,
  },
  caption: {
    fontSize: typography.fontSize.m,
    color: colors.text,
    lineHeight: typography.lineHeight.m,
  },
});

export default FeedPost;