import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product, Category, Collection } from '@/types';
import { featuredProducts, productCategories, productCollections } from '@/mocks/products';

interface ProductState {
  products: Product[];
  categories: Category[];
  collections: Collection[];
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (categoryId: string) => Product[];
  getProductsByCollection: (collectionId: string) => Product[];
  getFeaturedProducts: () => Product[];
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: featuredProducts,
      categories: productCategories,
      collections: productCollections,
      wishlist: featuredProducts.filter(p => p.isWishlisted),
      
      addToWishlist: (product) => {
        set((state) => ({
          wishlist: [...state.wishlist, { ...product, isWishlisted: true }],
          products: state.products.map(p => 
            p.id === product.id ? { ...p, isWishlisted: true } : p
          ),
        }));
      },
      
      removeFromWishlist: (productId) => {
        set((state) => ({
          wishlist: state.wishlist.filter(p => p.id !== productId),
          products: state.products.map(p => 
            p.id === productId ? { ...p, isWishlisted: false } : p
          ),
        }));
      },
      
      isWishlisted: (productId) => {
        return get().wishlist.some(p => p.id === productId);
      },
      
      getProductById: (id) => {
        return get().products.find(p => p.id === id);
      },
      
      getProductsByCategory: (categoryId) => {
        const category = get().categories.find(c => c.id === categoryId);
        if (!category) return [];
        return get().products.filter(p => p.category === category.name);
      },
      
      getProductsByCollection: (collectionId) => {
        const collection = get().collections.find(c => c.id === collectionId);
        if (!collection) return [];
        return collection.products;
      },
      
      getFeaturedProducts: () => {
        return get().products.slice(0, 4);
      },
    }),
    {
      name: 'glowyn-product-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);