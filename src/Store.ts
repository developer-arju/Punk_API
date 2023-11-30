import { create } from 'zustand'

interface BearState {
  bears: [] | undefined,
  setBears: (newBears: []) => void
}
  
  const useStore = create<BearState>((set) => ({
    bears: [],
    setBears: (newBears: []) => set(() => ({ bears: newBears })),
  }))

export { useStore }