// console.log("%c openCloseFilters.js", "color: green; font-weight:bold;");

import { renderRecipes } from "./api.js";
import * as filters from "./displayFilters.js";

// fonction globale
// permet d'ouvrir et de fermer les filtres / btn
export const isFiltersInteractive =
  (renderRecipes.prototype.isFiltersInteractive = (btn, buttonValue) => {
    // composant liste de mots clés
    const displayKeyword = btn.nextElementSibling;
    if (displayKeyword.classList.contains("filter__show")) {
      closeSelectFilter(
        // supprime le placeholder, attribue une value, attribue un type button
        displayKeyword.previousElementSibling,
        // supprime la class CSS assurant l'affichange
        displayKeyword,
        // réduit la largeur du composant
        displayKeyword.parentNode,
        // assure la rotation de la flèche vers le haut
        displayKeyword.parentNode.firstElementChild
      );
    } else {
      // vérifie si les filtres sont ouverts ailleurs pour les fermer
      isFilterClosed();
      // ouvre le filtre sélectionné
      changeInputTypeInText(btn, buttonValue);
    }
  });

// ferme le menu sélectionné
export const closeSelectFilter = (renderRecipes.prototype.closeSelectFilter = (
  inputBtn,
  filterShow,
  parentWidth,
  rotateArrow
) => {
  inputBtn.setAttribute("type", "button");
  inputBtn.setAttribute("value", `${inputBtn.getAttribute("data-value")}`);
  inputBtn.removeAttribute("placeholder");
  filterShow.classList.remove("filter__show");
  parentWidth.style.width = "170px";
  rotateArrow.classList.remove("filter__custom-arrow--rotate");
});

// vérifie si les filtres sont ouverts ailleurs pour les fermer
export const isFilterClosed = (renderRecipes.prototype.isFilterClosed = () => {
  document.querySelectorAll(".filter__custom-menu").forEach((filter) => {
    if (filter.classList.contains("filter__show")) {
      closeSelectFilter(
        // supprime le placeholder, attribue une value, attribue un type button
        filter.previousElementSibling,
        // supprime la class CSS assurant l'affichage
        filter,
        // réduit la largeur du composant
        filter.parentNode,
        // assure la rotation de la flèche vers le haut
        filter.parentNode.firstElementChild
      );
    }
  });
});

// FERME LE FILTRE ET CHARGE NOUVEAUX ELEMENTS
export const isFilterReload = (renderRecipes.prototype.isFilterClosed = (
  data
) => {
  document.querySelectorAll(".filter__custom-menu").forEach((filter) => {
    if (filter.classList.contains("filter__show")) {
      let btn = filter.previousElementSibling;
      let btnvalue = btn.getAttribute("value");
      // console.log(btn, btnvalue);

      // SUPPRESSION DES PRECEDENTES UL CONTENANT LES LI
      document.querySelectorAll(".filter__custom-menu").forEach((ul) => {
        // console.log(ul);
        ul.remove();
      });
      // HYDRATE LES LI AVEC LA NOUVELLE RECHERCHE
      filters.DISPLAY_FILTERS(data);
      // OUVRE A NOUVEAU L'INPUT EN MODE TEXTE
      changeInputTypeInText(btn, btnvalue);
    }
  });
});

export const changeInputTypeInText =
  (renderRecipes.prototype.changeInputTypeInText = (button, buttonValue) => {
    button.setAttribute("type", "text");
    button.setAttribute("data-value", `${buttonValue}`);
    // button.removeAttribute("value");
    button.value = "";

    switch (buttonValue) {
      case "Appareil":
        // élargie le button type texte
        button.parentNode.style.width = "66%";
        // set un placeholder
        button.setAttribute("placeholder", "Recherche un appareil");
        // affiche la liste
        button.nextElementSibling.classList.add("filter__show");
        // rotate de la fleche
        button.previousElementSibling.classList.add(
          "filter__custom-arrow--rotate"
        );

        break;
      case "Ingrédients":
        button.parentNode.style.width = "66%";
        button.setAttribute("placeholder", "Recherche un ingrédient");
        button.nextElementSibling.classList.add("filter__show");
        button.previousElementSibling.classList.add(
          "filter__custom-arrow--rotate"
        );

        break;
      case "Ustensiles":
        button.parentNode.style.width = "66%";
        button.setAttribute("placeholder", "Recherche un ustensile");
        button.nextElementSibling.classList.add("filter__show");
        button.previousElementSibling.classList.add(
          "filter__custom-arrow--rotate"
        );

        break;
      default:
        break;
    }
  });
