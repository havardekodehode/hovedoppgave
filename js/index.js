import { navigatePokemons } from "./utils/navigation.js";
import { fetchData } from "./data/api.js";
import { setupEventListeners } from "./utils/setup.js";
import { transistion } from "./utils/animations.js";

const pokemonUrl = "https://pokeapi.co/api/v2/pokemon?limit=151/";

async function init() {
    try {
        const pokemonArr = await fetchData();
        transistion();
        navigatePokemons(pokemonArr, 0);
        setupEventListeners(pokemonArr);
    } catch (error) {
        console.log(error);
    }
}
init();
