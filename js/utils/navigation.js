import { renderPokedex } from "../pages/pokedex.js";

export function navigatePokemons(pokemonArr, index) {
    try {
        renderPokedex(pokemonArr[index]);
    } catch (error) {
        console.log(error);
    }
}
