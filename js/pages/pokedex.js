import {
    dexContainerEl,
    resultsEl,
    searchContainerEl,
} from "../utils/HTMLElements.js";
import { navigatePokemons } from "../utils/navigation.js";

const createElement = (type = "div", props = {}) => {
    const element = document.createElement(type);
    Object.entries(props).forEach(([key, value]) => (element[key] = value));
    return element;
};

export function renderSearch(pokemonArr, results) {
    // resultsEl.forEach((e) => e.remove());
    document.querySelectorAll(".results").forEach((e) => e.remove());

    if (results.length > 2) {
        const resultsContainer = createElement("div", {
            className: "results",
        });
        const resultsList = createElement("ul");
        results.forEach((result, index) => {
            const resultContainer = createElement("li", {
                className: "pokemonResult",
            });
            const name = createElement("p", {
                className: "name",
                textContent: result.name,
            });
            const image = createElement("img", {
                src: result.sprite,
                alt: `Picture displaying ${result.name}`,
            });
            //NEEDS UPDATE
            resultContainer.addEventListener("click", () => {
                navigatePokemons(pokemonArr, result.index);
            });
            resultContainer.append(name, image);
            resultContainer.style.backgroundColor = result.color;
            resultsList.append(resultContainer);
        });
        resultsContainer.append(resultsList);
        searchContainerEl.append(resultsContainer);
    } else {
        document.querySelectorAll(".results").forEach((e) => e.remove());
    }
}

export function renderPokedex(pokemon) {
    dexContainerEl.innerHTML = "";
    const pokedexContainer = createElement("div", {
        className: "pokedex ",
    });
    const pokemonContainer = createElement("div", {
        className: "pokemonContainer flex-col just-cen alig-cen",
    });
    const pokemonName = createElement("h3", {
        style: "text-align: center",
        textContent:
            pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
        class: `${pokemon.name}`,
    });
    const pokemonImage = createElement("img", {
        classList: `pokemon ${pokemon.name}`,
        src: pokemon.sprite,
        alt: `Sprite of ${pokemon.name}`,
    });
    const container = createElement("div", {
        className: "stats grid gtc-auto2",
    });

    pokemon.stats.forEach((stat) => {
        const statAndValcontainer = createElement("div", {
            className: "statAndValue flex-row just-spaB",
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
            textContent: stat.value,
            className: "value",
        });
        statAndValcontainer.append(statName, statValue);
        container.append(statAndValcontainer);
    });

    pokedexContainer.style.backgroundColor = pokemon.color;
    pokemonContainer.append(pokemonName, pokemonImage, container);
    pokedexContainer.append(pokemonContainer);
    dexContainerEl.append(pokedexContainer);
}
