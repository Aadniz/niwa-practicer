import { create } from "zustand";

type WatchMode = "live"|"guess";
interface SettingsState {
    mode: WatchMode,
    twentyFour: boolean,
    mouseFollow: boolean,
    initialDelay: number,
    randomStart: boolean,
    startPosition: {x: number, y: number, z: number},
    smoothing: number,
    timings: [number, number, number, number, number, number, number]
}
type BooleanKeys<T> = {
    [K in keyof T]-?: T[K] extends boolean ? K : never
}[keyof T];

interface SettingsActions {
    toggle: <K extends BooleanKeys<SettingsState>>(key: K) => void;
    toggleMode: () => void;
    setInitialDelay: (delay: number) => void;
}

export const useSettingsStore = create<SettingsState & SettingsActions>((set) => ({
    mode: "guess",
    twentyFour: true,
    mouseFollow: false,
    initialDelay: 2,
    randomStart: true,
    startPosition: {x: 0, y: 20, z: 0},
    smoothing: 2,
    // Initial off delay, Hours, off, minutes, off, seconds, off, seconds, off, seconds etc etc
    timings: [1.5, 1.0, 0.4, 1.3, 0.8, 0.6, 0.4],

    toggle: (key) =>
        set((s) => ({ [key]: !s[key] } as unknown as Partial<SettingsState>)),
    toggleMode: () => {
        set(s => ({ mode: s.mode === "guess" ? "live" : "guess" }));
    },
    setInitialDelay: (delay) => {
        set(s => ({ initialDelay: delay }));
    }
}));

interface ScoreState {
    value: number,
    setScore: (score: number) => void,
}
export const useScoreStore = create<ScoreState>((set) => ({
    value: 0.00,
    setScore: (score) => set({ value: score })
}));

interface RandomTimeState {
    value: Date,
    randomize: () => void,
}
export const useRandomTimeStore = create<RandomTimeState>((set) => ({
    value: new Date(Math.random() * Date.now()),
    randomize: () => set({ value: new Date(Math.random() * Date.now()) })
}));