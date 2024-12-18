// Using Zustand for state management instead of SQLite/Prisma
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      data: [],
      addData: (item) => set((state) => ({ data: [...state.data, item] })),
    }),
    {
      name: 'app-storage',
    }
  )
);

export const db = {
  getDailySales: () => useStore.getState().data,
  addDailySales: (data) => useStore.getState().addData(data),
};