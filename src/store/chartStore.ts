import { create } from 'zustand';

interface ChartState {
  symbol: string;
  interval: string;
  trackedSymbols: string[];
  isRsiVisible: boolean; // <--- НОВОЕ: Флаг видимости RSI
  setSymbol: (symbol: string) => void;
  setInterval: (interval: string) => void;
  toggleTrackedSymbol: (symbol: string) => void;
  toggleRsi: () => void; // <--- НОВОЕ: Функция переключения RSI
  loadState: () => void;
}

export const useChartStore = create<ChartState>((set) => ({
  symbol: 'BTCUSDT',
  interval: '1h',
  trackedSymbols: ['BTCUSDT'],
  isRsiVisible: false, // По умолчанию RSI выключен
  
  setSymbol: (symbol) => set({ symbol }),
  setInterval: (interval) => set({ interval }),
  
  toggleTrackedSymbol: (symbol) => set((state) => ({
    trackedSymbols: state.trackedSymbols.includes(symbol)
      ? state.trackedSymbols.filter((s) => s !== symbol)
      : [...state.trackedSymbols, symbol]
  })),

  // Функция, которая просто меняет false на true и наоборот
  toggleRsi: () => set((state) => ({ isRsiVisible: !state.isRsiVisible })),
  
  loadState: () => {
    const savedSymbol = localStorage.getItem('chartSymbol');
    const savedInterval = localStorage.getItem('chartInterval');
    if (savedSymbol) set({ symbol: savedSymbol });
    if (savedInterval) set({ interval: savedInterval });
  },
}));