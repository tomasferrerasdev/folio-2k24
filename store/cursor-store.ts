import { create } from 'zustand';

const clickableData = [
  {
    id: 1,
    text: 'Doom',
    subtitleText:
      "Playing Doom! My therapy session, because sometimes all you need is a shotgun and some demon-splattering. Let's go to the computer and unleash the chaos on the screen!",
    mediaPath: '/audio/doom.mp3',
  },
  {
    id: 2,
    text: 'Computer',
    subtitleText:
      'I could use it if I just got a little closer. Could you help me with that, maybe using your keyboard arrow keys',
    mediaPath: '/audio/computer.mp3',
  },
  {
    id: 3,
    text: 'Go to the park',
    subtitleText:
      'How I long for a stroll in the park and  breathe in the fresh air. Yet, Tomas has not yet mastered the art of developing this part, maybe he do it soon.',
    mediaPath: '/audio/park.mp3',
  },
  {
    id: 4,
    text: 'Fridge',
    subtitleText:
      "I'm craving a beer, but Tomas, the mastermind behind this world, decided it would be fun to leave it at x:-100.",
    mediaPath: '/audio/beer.mp3',
  },
  {
    id: 5,
    text: 'Turn Off',
    subtitleText: '',
    mediaPath: null,
  },
];

interface Item {
  id: number;
  text: string;
  subtitleText: string;
  mediaPath?: string | null;
}

interface State {
  removeCursor: boolean;
  hoverItem: Item | null;
  playingItem: Item | null;
  isPlaying: boolean;
  setHoverItem: (id: number | null) => void;
  setRemoveCursor: (value: boolean) => void;
  playAudio: () => void;
}

export const useCursorStore = create<State>((set, get) => ({
  removeCursor: false,
  hoverItem: null,
  playingItem: null,
  isPlaying: false,
  setRemoveCursor(value) {
    set({ removeCursor: value });
  },
  setHoverItem(id) {
    if (id === null) {
      set({ hoverItem: null });
    } else {
      set({ hoverItem: clickableData.find((item) => item.id === id) || null });
    }
  },
  playAudio() {
    const { hoverItem } = get();
    if (hoverItem && hoverItem.mediaPath) {
      const audio = new Audio(hoverItem.mediaPath);
      audio.play();
      set({ isPlaying: true, playingItem: hoverItem });
      audio.onended = () => {
        set({ isPlaying: false, playingItem: null });
      };
    }
  },
}));
