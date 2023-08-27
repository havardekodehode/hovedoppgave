export const filterOnSearch = (pokemonArray, query) =>
    pokemonArray
        .filter((pokemon) => pokemon.name.toLowerCase().includes(query))
        .sort();
