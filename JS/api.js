import * as index from "../index.js";

// GET DATA
export const GET_RECIPES = (async () => {
  await fetch("./recipes.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      index.GET_RECIPES_HYDRATE(data.recipes);

    })
    .catch((error) => {
      error.message;
    });
})();
// constructeur 
export function renderRecipes(data) {
  // console.log(data);
  this.data = data;
  this.returnRecipes = function (data) {
    console.log(data);
    return data;
  };
}
