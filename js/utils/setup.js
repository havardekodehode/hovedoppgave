import { filterOnSearch } from "./searchUtils.js";
import { renderSearch } from "../pages/pokedex.js";
import { navigatePokemons } from "./navigation.js";

let index = 0;

export function setupEventListeners(pokemonArr) {
    const searchInput = document.getElementById("search");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");

    searchInput.addEventListener("input", (e) => {
        const filteredPokemons = filterOnSearch(pokemonArr, e.target.value);
        renderSearch(pokemonArr, filteredPokemons);
    });

    document.addEventListener("click", (event) => {
        const resultContainer = document.querySelector(".results");
        if (document.querySelector(".results")) {
            if (!resultContainer.contains(event.target)) {
                resultContainer.remove();
            }
        }
    });

    prevButton.addEventListener("click", () => {
        navigateToPrevious(pokemonArr);
    });

    nextButton.addEventListener("click", () => {
        navigateToNext(pokemonArr);
    });
}

function navigateToPrevious(pokemonArr) {
    if (index !== 0) {
        index--;
        navigatePokemons(pokemonArr, index);
    }
}

function navigateToNext(pokemonArr) {
    if (index !== 151) {
        index++;
        navigatePokemons(pokemonArr, index);
    }
}
