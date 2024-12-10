import {create} from 'zustand';

const apiUrl = 'https://dummyjson.com/recipes';

export const useFoodStore = create(set => ({
  foodItems: [],
  refreshing: false,
  refreshFoodItems: async () => {
    set({foodItems: []});
    set({refreshing: true});
    const response = await fetch(apiUrl);
    const data = await response.json();
    set({foodItems: data.recipes, refreshing: false});
  },
}));
