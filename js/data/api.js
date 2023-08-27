import { typeColors, pokemonUrl } from "./data.js";

async function getData(url) {
    const req = await fetch(url);
    const data = await req.json();
    return data;
}

async function getDetails(pokemonName) {
    try {
        const data = await getData(pokemonUrl);
        const pokemonData = data.results;
        const pokemon = pokemonData.find(
            (pokemon) => pokemon.name === pokemonName
        );
        const details = await getData(pokemon.url);
        return details;
    } catch (error) {
        alert("Something went wrong: " + error);
        console.log(error);
    }
}

async function fetchData() {
    const data = await getData(pokemonUrl);
    const pokemonData = data.results;

    const promises = pokemonData.map(async (pokemon, index) => {
        const details = await getDetails(pokemon.name);
        const sprite = details.sprites.other["official-artwork"].front_default;
        const type = details.types[0].type.name;
        const color = `#${
            typeColors.find((entry) => entry.type === type).color
        }`;
        const stats = details.stats.map(({ base_stat, stat }) => ({
            name: stat.name,
            value: base_stat,
        }));
        return {
            name: pokemon.name,
            index: index,
            sprite: sprite,
            alt: `Sprite of ${pokemon.name}`,
            color: color,
            stats: stats,
        };
    });

    return Promise.all(promises);
}

export { fetchData };
