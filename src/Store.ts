import { create } from 'zustand'

interface BeerState {
  beers: [] | undefined,
  totalPages: number | undefined,
  setBeers: (newBears: []) => void,
  setPageCount: (total: number) => void,
}
  
  const useStore = create<BeerState>((set) => ({
    beers: [],
    totalPages: undefined,
    setBeers: (newBeers: []) => set(() => ({ beers: newBeers })),
    setPageCount: (total: number) => set(() => ({ totalPages: total}))
  }))

export { useStore }