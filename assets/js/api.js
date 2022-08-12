async function getRecipes() {
    let url = "./recipe.js";
    try {
      let res = await fetch(url);
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  }
  getRecipes()