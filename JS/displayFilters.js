// console.log("%c displayFilters.js", "color: green; font-weight:bold;");

import { renderRecipes } from "./api.js";
import * as utils from "./utils.js";
import { listenFilter } from "./displayTags.js";

// NEW SET : distinct INGREDIENTS
export const displayFilterIngredients =
  (renderRecipes.prototype.displayFilterIngredients = function (data, filter) {
    // console.log(data, filter);

    const distinctIngredients = [
      ...new Set(
        data
          .map((recipe) =>
            recipe.ingredients.map((ingredient) =>
              ingredient.ingredient.toLowerCase().trim()
            )
          )
          .flat()
          .sort()
      ),
    ];

    // SI RECHERCHE DANS INPUT....
    if (filter) {
      // console.log(
      //   distinctIngredients.filter((ingredient) =>
      //     ingredient.includes(filter.toLowerCase().trim())
      //   )
      // );
      return distinctIngredients.filter((ingredient) =>
        ingredient.includes(filter.toLowerCase().trim())
      );
    }
    // SANS RECHERCHE
    return utils.shuffle(distinctIngredients);
  });

// NEW SET : distinct APPLIANCE
export const displayFilterAppliance =
  (renderRecipes.prototype.displayFilterAppliance = function (data, filter) {
    // console.log(data);
    const distinctAppliance = [
      ...new Set(
        data.map((recipe) => recipe.appliance.toLowerCase().trim()).sort()
      ),
    ];

    // SI RECHERCHE DANS INPUT....
    if (filter) {
      return distinctAppliance.filter((appliance) =>
        appliance.includes(filter.toLowerCase().trim())
      );
    }
    // SANS RECHERCHE
    // console.log(distinctAppliance);
    return distinctAppliance;
  });

// NEW SET : distinct USTENSILS
export const displayFilterUstensils =
  (renderRecipes.prototype.displayFilterUstensils = function (data, filter) {
    // console.log(data);
    const distinctUstensils = [
      ...new Set(
        data
          .map((recipe) =>
            recipe.ustensils.map((item) => item.toLowerCase().trim())
          )
          .flat()
          .sort()
      ),
    ];
    // SI RECHERCHE DANS INPUT....
    if (filter) {
      return distinctUstensils.filter((ustensil) =>
        ustensil.includes(filter.toLowerCase().trim())
      );
    }
    // SANS RECHERCHE
    return distinctUstensils;
  });

// HYDRATE HTML DANS LES FILTRES
const list_HTML = (renderRecipes.prototype.getList_HTML = (
  distinctData,
  datacolor
) => {
  // console.log(distinctData, datacolor);
  let li_HTML = "";
  distinctData.map((setLi) => {
    li_HTML += `<li class="filter__custom-option" data-color="${datacolor}">${utils.capitalize(
      setLi
    )}</li>`;
  });
  // console.log(li_HTML);
  return li_HTML;
});

// TEST CONDITIONNEL POUR ROUTER HTML
export const hydrateFilter = (renderRecipes.prototype.hydrateFilter = function (
  data,
  value,
  btn,
  datacolor,
  filter
) {
  // console.log(value);
  // console.log(data, value, btn, filter);
  switch (value) {
    case "Ingrédients":
      // console.log(data, filter);
      btn.insertAdjacentHTML(
        "afterend",
        `
        <ul class="filter__custom-menu filter__custom-menu--primary">
      ${list_HTML(displayFilterIngredients(data, filter), datacolor)}
      </ul>`
      );
      break;
    case "Appareil":
      btn.insertAdjacentHTML(
        "afterend",
        `
        <ul class="filter__custom-menu filter__custom-menu--success">
      ${list_HTML(displayFilterAppliance(data, filter), datacolor)}
      </ul>`
      );
      break;
    case "Ustensiles":
      btn.insertAdjacentHTML(
        "afterend",
        `
        <ul class="filter__custom-menu filter__custom-menu--danger">
      ${list_HTML(displayFilterUstensils(data, filter), datacolor)}
      </ul>`
      );
      break;
    default:
      break;
  }
});

// FONCTION GLOBALE
export const DISPLAY_FILTERS = (renderRecipes.displayFilters = function (
  data,
  btn,
  filter,
  value,
  color
) {
  if (btn && filter && value && color) {
    // console.log(data, btn, filter, value, color);
    hydrateFilter(data, value, btn, color, filter);
  } else if (data) {
    document.querySelectorAll(".filter__select").forEach((button) => {
      let value = button.getAttribute("value");
      // console.log(value, button);
      let datacolor = button.getAttribute("data-color");

      // console.log(data, value, button, datacolor);
      hydrateFilter(data, value, button, datacolor);
    });
  }

  // ECOUTE L'ENSEMBLE DES LI (textcontent et color)
  listenFilter(data, document.querySelectorAll(".filter__custom-option"));
});
