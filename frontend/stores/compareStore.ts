import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CompareStore {
  compareList: number[];
  maxCompare: number;
  addToCompare: (id: number) => boolean;
  removeFromCompare: (id: number) => void;
  isInCompare: (id: number) => boolean;
  clearCompare: () => void;
  canAddMore: () => boolean;
}

export const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      compareList: [],
      maxCompare: 4,
      
      addToCompare: (id) => {
        const { compareList, maxCompare } = get();
        if (compareList.length >= maxCompare) {
          return false;
        }
        if (compareList.includes(id)) {
          return false;
        }
        set((state) => ({
          compareList: [...state.compareList, id],
        }));
        return true;
      },
      
      removeFromCompare: (id) => {
        set((state) => ({
          compareList: state.compareList.filter((item) => item !== id),
        }));
      },
      
      isInCompare: (id) => {
        return get().compareList.includes(id);
      },
      
      clearCompare: () => {
        set({ compareList: [] });
      },
      
      canAddMore: () => {
        const { compareList, maxCompare } = get();
        return compareList.length < maxCompare;
      },
    }),
    {
      name: 'autosite-compare',
    }
  )
);
