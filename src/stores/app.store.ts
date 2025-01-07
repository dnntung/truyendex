import { create } from "zustand";

interface AppState {
  showTopMenu: boolean;
}

interface AppAction {
  setShowTopMenu: (show: boolean) => void;
}

const useAppStore = create<AppState & AppAction>((set) => ({
  showTopMenu: true,
  setShowTopMenu: (show) => set({ showTopMenu: show }),
}));

export default useAppStore;
