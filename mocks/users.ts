import { UserProfile } from '@/types';

export const currentUser: UserProfile = {
  id: 'user-1',
  name: 'Cantik',
  username: 'cantik_style',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  bio: 'Fashion enthusiast | Beauty lover | Style explorer',
  followers: 245,
  following: 178,
  isVerified: true,
};

export const popularUsers: UserProfile[] = [
  {
    id: 'user-2',
    name: 'Anisa Wijaya',
    username: 'anisa_style',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    followers: 15400,
    following: 342,
    isVerified: true,
  },
  {
    id: 'user-3',
    name: 'Maya Putri',
    username: 'maya_fashion',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    followers: 8920,
    following: 512,
    isVerified: true,
  },
  {
    id: 'user-4',
    name: 'Dian Sastro',
    username: 'dian_beauty',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    followers: 12300,
    following: 230,
    isVerified: true,
  },
  {
    id: 'user-5',
    name: 'Rini Susanti',
    username: 'rini_glow',
    avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    followers: 5670,
    following: 432,
    isVerified: false,
  },
];

export const styleCategories = [
  {
    id: 'style-1',
    name: 'Kamu',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 'style-2',
    name: 'Elegant Style',
    imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 'style-3',
    name: 'Sweet Casual',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 'style-4',
    name: 'Cool Tomboy',
    imageUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
];