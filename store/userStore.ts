import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile, AnalysisResult } from '@/types';
import { currentUser } from '@/mocks/users';
import { recentAnalysis } from '@/mocks/analysis';

interface UserState {
  user: UserProfile | null;
  isLoggedIn: boolean;
  analysisResults: AnalysisResult[];
  setUser: (user: UserProfile | null) => void;
  login: () => void;
  logout: () => void;
  addAnalysisResult: (result: AnalysisResult) => void;
  getAnalysisByType: (type: string) => AnalysisResult | undefined;
  getRecentAnalysis: () => AnalysisResult[];
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: currentUser,
      isLoggedIn: false, // Changed to false by default to show login screen
      analysisResults: recentAnalysis,
      
      setUser: (user) => set({ user }),
      
      login: () => set({ isLoggedIn: true, user: currentUser }),
      
      logout: () => set({ isLoggedIn: false }),
      
      addAnalysisResult: (result) => {
        set((state) => ({
          analysisResults: [result, ...state.analysisResults],
        }));
      },
      
      getAnalysisByType: (type) => {
        const { analysisResults } = get();
        return analysisResults.find((analysis) => analysis.type === type);
      },
      
      getRecentAnalysis: () => {
        const { analysisResults } = get();
        return analysisResults.slice(0, 3);
      },
    }),
    {
      name: 'glowyn-user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);