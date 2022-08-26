// console.log("%c displayTags.js", "color: green; font-weight:bold;");

import * as cards from "./displayCards.js";
import { DISPLAY_FILTERS } from "./displayFilters.js";
import { theMillTurns } from "./google.js";
import { isFilterReload } from "./openCloseFilters.js";
import { deleteDuplicatesGoogled, windowLocationReload } from "./utils.js";
import { DISPLAY_CARDS } from "./displayCards.js";

var originalRecipes = [];
var distinctFilteredRecipes = [];

export var tagsArray = [
  // { title: "", color: "" },
];

// LISTENNER DES TAGS
const listenToTags = function (data) {
  document.querySelectorAll(".tags__close").forEach((X) => {
    // console.log(tagsArray.length);
    X.addEventListener("click", tagIsNone);
  });
};

const tagIsNone = (e) => {
  let ID = e.currentTarget.id;

  // console.log(ID);
  ID = parseInt(ID);
  tagsArray.splice(ID, 1);
  // console.log(tagsArray);

  if (tagsArray.length === 0) {
    // console.log("zero");
    // console.log(originalRecipes[0]);
    DISPLAY_CARDS(originalRecipes[0]);
    isFilterReload(originalRecipes[0]);
  } else if (tagsArray.length >= 1) {
    let tagReload = [];
    tagReload.push(originalRecipes[0]);
    // console.log(tagReload);
    tagsArray.forEach((item) => {
      let distinctFilteredRecipes = deleteDuplicatesGoogled(
        theMillTurns(tagReload[0], item.title)
      );
      // console.log(distinctFilteredRecipes);
      tagReload[0] = [...distinctFilteredRecipes];
    });
    isFilterReload(tagReload[0]);
    cards.DISPLAY_CARDS(tagReload[0]);
  }
  showListOfTags(tagsArray);
};

export const listenFilter = (data, keywordlist) => {
  originalRecipes.push(data);

  for (const keyword of keywordlist) {
    keyword.addEventListener("click", () => {
      let dataTitle = keyword.textContent;
      let dataColor = keyword.getAttribute("data-color");
      let tagObject = { title: `${dataTitle}`, color: `${dataColor}` };

      //------
      // console.log(originalRecipes[0]);

      // VERIFIE SI LE TAG EST PRESENT pour éviter doublons OU lancer algo
      let inTagsArray = false;

      tagsArray.forEach((tag) => {
        // console.log(tag);
        inTagsArray = tag.title === tagObject.title;
      });

      if (!inTagsArray) {
        // console.log(tagsArray.length);
        // console.log(filteredRecipes);

        // AU CLICK LES LI DEVIENT UN TAG AFFICHé
        // console.log(originalRecipes);
        tagsArray.push(tagObject);
        showListOfTags(tagsArray, data);

        //ON FAIT LA RECHERCHE SUR CHAQUE TAG
        tagsArray.forEach((item) => {
          distinctFilteredRecipes = deleteDuplicatesGoogled(
            theMillTurns(data, item.title)
          );
          // console.log(distinctFilteredRecipes);
          data = [...distinctFilteredRecipes];
        });

        isFilterReload(distinctFilteredRecipes);
        cards.DISPLAY_CARDS(distinctFilteredRecipes);
        // console.log(distinctFilteredRecipes);

        // SI RESTE UNE CARD ALORS DESACTIVATION DES LI
        if (distinctFilteredRecipes.length === 1) {
          document.querySelectorAll(".filter__custom-option").forEach((li) => {
            li.classList.remove("filter__custom-option");
            li.classList.add("filter__custom-option--enable");
          });
        }

        // AU CLICK LE LI DEVIEN INACTIF ET GRISE
        tagsArray.forEach((tag) => {
          document.querySelectorAll(".filter__custom-option").forEach((li) => {
            if (tag.title.includes(li.textContent)) {
              li.classList.remove("filter__custom-option");
              li.classList.add("filter__custom-option--enable");
            }
          });
        });
      }
    });
  }
};

export const showListOfTags = function (arrayOfTags, data) {
  // console.log(data);
  let tag_HTML = "";

  arrayOfTags.forEach((tag, index, data) => {
    tag_HTML += `<span class="tags__item tags__item--${tag.color}">
    <span  class="tags__name">${tag.title}</span>
    <span id="${index}" class="tags__close">
    <img src="./assets/image/remove-icon.png" alt=""
    /></span>
    </span>`;
  });
  document.querySelector(".tags").innerHTML = tag_HTML;

  listenToTags(data);
};
// console.log(originalRecipes);
