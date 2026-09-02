export interface Mood {
  id: number;
  name: string;
  emoji: string;
}

export type Ingredient = string;

export type Instruction = string;

export interface Recipe {
  id: number;
  name: string;
  emoji: string;
  description: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
}
