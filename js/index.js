// import {getData} from "./data/api.js"
import { renderPokedex } from "./pages/pokedex.js";
import { dexContainer } from "./HTMLElements.js";
import { getData } from "./data/data.js";

const baseUrl = "https://pokeapi.co/api/v2/pokemon?limit=151";
// const baseUrl = "https://pokeapi.co/api/v2/pokemon/1/";

let navState = "getDetails";

let index = 0;

document
    .getElementById("prev")
    .addEventListener(
        "click",
        () => (index !== 0 ? index-- : null, navigate(baseUrl))
    );
document
    .getElementById("next")
    .addEventListener(
        "click",
        () => (index !== 151 ? index++ : null, navigate(baseUrl))
    );

async function navigate(url) {
    const data = await getData(url);
    dexContainer.innerHTML = "";
    if (navState == "main") {
    } else {
        const pokemonList = data.results;
        pokemonList.forEach(async (pokemon, i) => {
            if (i != index) {
                return;
            }
            const details = await getData(pokemon.url);
            renderPokedex(pokemon, details);
        });
    }
}

navigate(baseUrl);
