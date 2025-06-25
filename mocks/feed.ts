import { FeedPost, Comment } from '@/types';
import { popularUsers, currentUser } from './users';
import { featuredProducts } from './products';

export const feedPosts: FeedPost[] = [
  {
    id: 'post-1',
    user: popularUsers[0],
    imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    caption: 'Found my perfect spring palette! Loving these warm coral tones. #SpringStyle #ColorAnalysis',
    likes: 1243,
    comments: 42,
    date: '2025-06-01',
    products: [featuredProducts[0], featuredProducts[3]],
    tags: ['SpringStyle', 'ColorAnalysis', 'GlowynApp'],
    isLiked: true,
    isSaved: false,
  },
  {
    id: 'post-2',
    user: popularUsers[1],
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    caption: 'Just discovered my face shape is heart-shaped! Now I know which hairstyles work best for me. #FaceShapeAnalysis',
    likes: 892,
    comments: 36,
    date: '2025-05-28',
    products: [featuredProducts[2]],
    tags: ['FaceShape', 'BeautyTips', 'GlowynApp'],
    isLiked: false,
    isSaved: true,
  },
  {
    id: 'post-3',
    user: popularUsers[2],
    imageUrl: 'https://images.unsplash.com/photo-1550928431-ee0ec6db30d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    caption: 'My skin analysis showed I have combination skin. Following the recommended routine and already seeing improvements! #SkinCare',
    likes: 754,
    comments: 28,
    date: '2025-05-25',
    products: [featuredProducts[1]],
    tags: ['SkinCare', 'BeautyRoutine', 'GlowynApp'],
    isLiked: true,
    isSaved: false,
  },
  {
    id: 'post-4',
    user: currentUser,
    imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    caption: 'Trying out my new style recommendations from Glowyn. What do you think? #StyleAnalysis #NewLook',
    likes: 423,
    comments: 19,
    date: '2025-05-20',
    products: [featuredProducts[3]],
    tags: ['StyleAnalysis', 'FashionTips', 'GlowynApp'],
    isLiked: false,
    isSaved: false,
  },
];

export const postComments: Record<string, Comment[]> = {
  'post-1': [
    {
      id: 'comment-1-1',
      user: popularUsers[1],
      text: 'That coral shade is perfect for you!',
      date: '2025-06-01',
      likes: 24,
    },
    {
      id: 'comment-1-2',
      user: popularUsers[2],
      text: 'I need to try that lipstick! 😍',
      date: '2025-06-01',
      likes: 18,
    },
    {
      id: 'comment-1-3',
      user: currentUser,
      text: 'Your color analysis is spot on!',
      date: '2025-06-02',
      likes: 12,
    },
  ],
  'post-2': [
    {
      id: 'comment-2-1',
      user: popularUsers[0],
      text: 'I have a heart-shaped face too! Those earrings look amazing on you.',
      date: '2025-05-28',
      likes: 15,
    },
    {
      id: 'comment-2-2',
      user: currentUser,
      text: 'Love your hairstyle! Perfect for your face shape.',
      date: '2025-05-29',
      likes: 9,
    },
  ],
};