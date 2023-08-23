import { dexContainer, wrapper } from "../HTMLElements.js";
import { createElement } from "../utils/DOMManipulation.js";

const typeColors = [
    { type: "normal", color: "A8A77A" },
    { type: "fire", color: "EE8130" },
    { type: "water", color: "6390F0" },
    { type: "electric", color: "F7D02C" },
    { type: "grass", color: "7AC74C" },
    { type: "ice", color: "96D9D6" },
    { type: "fighting", color: "C22E28" },
    { type: "poison", color: "A33EA1" },
    { type: "ground", color: "E2BF65" },
    { type: "flying", color: "A98FF3" },
    { type: "psychic", color: "F95587" },
    { type: "bug", color: "A6B91A" },
    { type: "rock", color: "B6A136" },
    { type: "ghost", color: "735797" },
    { type: "dragon", color: "6F35FC" },
    { type: "dark", color: "705746" },
    { type: "steel", color: "B7B7CE" },
    { type: "fairy", color: "D685AD" },
];

export function renderSearch(searchInput = "", pokemonsArr, imgFunc) {
    document.querySelectorAll(".results").forEach((e) => e.remove());
    if (searchInput.length >= 2) {
        const results = pokemonsArr
            .filter(
                (pokemon) =>
                    pokemon.name
                        .substring(0, searchInput.length)
                        .toLowerCase() === searchInput
            ) //
            .sort();

        const resultsContainer = createElement("div", {
            className: "results",
        });
        const resultsList = createElement("ul");
        results.forEach((result, i) => {
            if (i === 3) {
                return;
            }
            console.log(result.name);
            const resultContainer = createElement("li", {
                className: "pokemonResult",
            });
            const name = createElement("p", {
                className: "name",
                textContent: result.name,
            });
            const image = createElement("img", {
                src: "../images/pokeball.png",
                alt: `Picture displaying ${result.name}`,
            });
            resultContainer.append(name, image); //
            resultsList.append(resultContainer);
        });
        resultsContainer.append(resultsList);
        document.querySelector(".searchContainer").append(resultsContainer);
    } else {
        document.querySelectorAll(".results").forEach((e) => e.remove());
    }
}

export function renderPokedex(pokemonData, details) {
    const pokedexContainer = createElement("div", { className: "pokedex" });
    const pokemonContainer = createElement("div", {
        className: "pokemonContainer",
    });
    const pokemonName = createElement("h3", {
        style: "text-align: center",
        textContent:
            pokemonData.name.charAt(0).toUpperCase() +
            pokemonData.name.slice(1),
        class: `${pokemonData.name}`,
    });
    const pokemonImage = createElement("img", {
        classList: `pokemon ${pokemonData.name}`,
        src: details.sprites.other["official-artwork"].front_default,
        alt: `Sprite of ${pokemonData.name}`,
    });
    const container = createElement("div", { className: "stats" });

    const pokemonStats = details.stats.map(({ base_stat, stat }) => {
        const statAndValcontainer = createElement("div", {
            className: "statAndValue",
        });
        let statName = "";
        if (!stat.name.includes("special")) {
            statName = createElement("p", {
                textContent: stat.name.toUpperCase(),
                className: "stat",
            });
        } else {
            const specialStatName =
                stat.name.substring(0, 2) +
                ". " +
                stat.name.substring(8, 11) +
                ".";
            statName = createElement("p", {
                textContent: specialStatName.toUpperCase(),
                className: "stat",
            });
        }

        const statValue = createElement("span", {
            textContent: base_stat,
            className: "value",
        });
        statAndValcontainer.append(statName, statValue);

        return statAndValcontainer;
    });

    pokedexContainer.style.backgroundColor = `#${
        typeColors.find((entry) => entry.type == details.types[0].type.name)
            .color
    }`;
    container.append(...pokemonStats);
    pokemonContainer.append(pokemonName, pokemonImage, container);
    pokedexContainer.append(pokemonContainer);
    dexContainer.append(pokedexContainer);
}
