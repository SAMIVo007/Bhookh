import {create} from 'zustand';

export const useFoodStore = create(set => ({
  foodItems: [],
  refreshing: false,
  refreshFoodItems: async () => {
    set({foodItems: []});
    set({refreshing: true});
    const response = await fetch('https://dummyjson.com/recipes');
    const data = await response.json();
    set({foodItems: data.recipes, refreshing: false});
  },
}));
