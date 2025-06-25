import { Category, Collection, Product } from '@/types';

export const productCategories: Category[] = [
  {
    id: 'category-1',
    name: 'Makeup',
    icon: 'brush',
    imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 'category-2',
    name: 'Skincare',
    icon: 'droplet',
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 'category-3',
    name: 'Fashion',
    icon: 'shirt',
    imageUrl: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 'category-4',
    name: 'Accessories',
    icon: 'gem',
    imageUrl: 'https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
];

export const featuredProducts: Product[] = [
  {
    id: 'product-1',
    name: 'Coral Sunset Lipstick',
    brand: 'Glowyn',
    price: 189000,
    imageUrl: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    rating: 4.8,
    category: 'Makeup',
    description: 'A vibrant coral lipstick that complements warm skin tones perfectly.',
    colors: ['#FF7F50', '#FF6347', '#FF4500'],
    isWishlisted: true,
  },
  {
    id: 'product-2',
    name: 'Hydrating Serum',
    brand: 'Glowyn Skin',
    price: 299000,
    imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    rating: 4.9,
    category: 'Skincare',
    description: 'An intensely hydrating serum with hyaluronic acid for all skin types.',
    isWishlisted: false,
  },
  {
    id: 'product-3',
    name: 'Gold Hoop Earrings',
    brand: 'Glowyn Accessories',
    price: 249000,
    imageUrl: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    rating: 4.7,
    category: 'Accessories',
    description: 'Classic gold hoop earrings that complement warm skin tones.',
    isWishlisted: false,
  },
  {
    id: 'product-4',
    name: 'Silk Scarf - Coral Pattern',
    brand: 'Glowyn Fashion',
    price: 349000,
    imageUrl: 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    rating: 4.6,
    category: 'Fashion',
    description: 'A luxurious silk scarf in warm coral tones, perfect for spring and summer.',
    isWishlisted: true,
  },
];

export const productCollections: Collection[] = [
  {
    id: 'collection-1',
    name: 'Spring Essentials',
    description: 'Must-have items for the spring season',
    imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    products: featuredProducts.slice(0, 3),
  },
  {
    id: 'collection-2',
    name: 'Warm Tone Favorites',
    description: 'Products that complement warm skin tones',
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    products: [featuredProducts[0], featuredProducts[3]],
  },
  {
    id: 'collection-3',
    name: 'Everyday Glam',
    description: 'Effortless beauty for your daily routine',
    imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    products: featuredProducts.slice(1, 4),
  },
];