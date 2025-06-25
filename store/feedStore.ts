import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FeedPost, Comment } from '@/types';
import { feedPosts, postComments } from '@/mocks/feed';

interface FeedState {
  posts: FeedPost[];
  comments: Record<string, Comment[]>;
  likePost: (postId: string) => void;
  unlikePost: (postId: string) => void;
  savePost: (postId: string) => void;
  unsavePost: (postId: string) => void;
  addComment: (postId: string, comment: Comment) => void;
  getPostById: (postId: string) => FeedPost | undefined;
  getCommentsByPostId: (postId: string) => Comment[];
  getSavedPosts: () => FeedPost[];
}

export const useFeedStore = create<FeedState>()(
  persist(
    (set, get) => ({
      posts: feedPosts,
      comments: postComments,
      
      likePost: (postId) => {
        set((state) => ({
          posts: state.posts.map(post => 
            post.id === postId 
              ? { ...post, likes: post.isLiked ? post.likes : post.likes + 1, isLiked: true } 
              : post
          ),
        }));
      },
      
      unlikePost: (postId) => {
        set((state) => ({
          posts: state.posts.map(post => 
            post.id === postId 
              ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes, isLiked: false } 
              : post
          ),
        }));
      },
      
      savePost: (postId) => {
        set((state) => ({
          posts: state.posts.map(post => 
            post.id === postId ? { ...post, isSaved: true } : post
          ),
        }));
      },
      
      unsavePost: (postId) => {
        set((state) => ({
          posts: state.posts.map(post => 
            post.id === postId ? { ...post, isSaved: false } : post
          ),
        }));
      },
      
      addComment: (postId, comment) => {
        set((state) => {
          const postComments = state.comments[postId] || [];
          return {
            comments: {
              ...state.comments,
              [postId]: [comment, ...postComments],
            },
            posts: state.posts.map(post => 
              post.id === postId ? { ...post, comments: post.comments + 1 } : post
            ),
          };
        });
      },
      
      getPostById: (postId) => {
        return get().posts.find(post => post.id === postId);
      },
      
      getCommentsByPostId: (postId) => {
        return get().comments[postId] || [];
      },
      
      getSavedPosts: () => {
        return get().posts.filter(post => post.isSaved);
      },
    }),
    {
      name: 'glowyn-feed-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);