import { renderRecipes } from "./api.js";
import { capitalize } from "./utils.js";

// CARDS COMPONENT
export const DISPLAY_CARDS = (renderRecipes.prototype.displayCards = function (
  recipes
) {
  const cards = document.querySelector(".cards");
  cards.innerHTML = "";
  if (recipes == 0 && !document.querySelector(".cards__no-recipes")) {
    return cards.insertAdjacentHTML(
      "beforebegin",
      `<div class="cards__no-recipes">
      <p class="cards__no-recipes-text">Aucune recette ne correspond à votre critère… </p>
  </div>`
    );
  } else {
    // to remove the message
    if (document.querySelector(".cards__no-recipes") && recipes != 0) {
      document.querySelector(".cards__no-recipes").remove();
    }
  }

  recipes.forEach((recipe) => {
    // console.log(recipe);
    let listCard_HTML = "";

    recipe.ingredients.map((elt) => {
      listCard_HTML += `<li class="card__ingredient">
          <span class="card__ingredient--bold">${
            elt.ingredient ? capitalize(elt.ingredient).trim() : ""
          }</span>  ${elt.quantity ? elt.quantity.toString().trim() : ""} ${
        elt.unit ? elt.unit.toLowerCase().trim() : ""
      }
         </li>`;

      return listCard_HTML;
    });

    document.querySelector(".cards").insertAdjacentHTML(
      "afterbegin",
      `<article class="card">
        <a href="#">
        <div class="card__thumb"></div>
        <div class="card__body">
        <div class="card__head">
        <h2 class="card__title">${capitalize(recipe?.name.trim())}</h2>
        <div class="card__time">
        <i class="card__timeclock"></i>
        <p class="card__minutes">${recipe?.time.toString().trim()} min</p>
        </div>
        </div>
        <div class="card__content">
        <ul class="card__ingredients">
                        ${listCard_HTML}
                        </ul>
                        <p class="card__description">
                        ${recipe?.description.trim()}
                        </p>
                      </div>
                      </div>
                  </a>
                </article>`
    );
  });
});
