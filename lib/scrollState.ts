import {create} from "zustand";
import {subscribeWithSelector} from "zustand/middleware";

interface ScrollStore {
    isPinned: boolean;
    setIsPinned: (value: boolean) => void;
}

export const useScrollStore = create<ScrollStore>()(
    subscribeWithSelector((set) => ({
        isPinned: false,
        setIsPinned: (value) => set({isPinned: value}),
    }))
);
