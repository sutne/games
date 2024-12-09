export type Difficulty = 'beginner' | 'intermediate' | 'expert';

export const DifficultySettings = {
  beginner: {
    height: 8,
    width: 8,
    mines: 10,
  },
  intermediate: {
    height: 16,
    width: 16,
    mines: 40,
  },
  expert: {
    height: 30,
    width: 16,
    mines: 99,
  },
};
