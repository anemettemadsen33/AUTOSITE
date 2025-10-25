import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const MAX_COMPARE = 4;

interface CompareState {
  compareList: string[];
  addToCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  toggleCompare: (id: string) => void;
  clearCompare: () => void;
  isInCompare: (id: string) => boolean;
  canAddMore: () => boolean;
}

export const useCompare = create<CompareState>()(
  persist(
    (set, get) => ({
      compareList: [],
      addToCompare: (id) =>
        set((state) => {
          if (state.compareList.length >= MAX_COMPARE) {
            return state;
          }
          if (state.compareList.includes(id)) {
            return state;
          }
          return { compareList: [...state.compareList, id] };
        }),
      removeFromCompare: (id) =>
        set((state) => ({
          compareList: state.compareList.filter((item) => item !== id),
        })),
      toggleCompare: (id) => {
        const { compareList } = get();
        if (compareList.includes(id)) {
          get().removeFromCompare(id);
        } else {
          get().addToCompare(id);
        }
      },
      clearCompare: () => set({ compareList: [] }),
      isInCompare: (id) => get().compareList.includes(id),
      canAddMore: () => get().compareList.length < MAX_COMPARE,
    }),
    {
      name: 'compare-storage',
    }
  )
);
