import { renderPokedex, typeColors } from "./pages/pokedex.js";
import { dexContainer, navButtons } from "./HTMLElements.js";
import { getData } from "./data/data.js";
import { createElement } from "./utils/DOMManipulation.js";

const pokemonUrl = "https://pokeapi.co/api/v2/pokemon?limit=151/";

let index = 0;

async function getPokemonData(url) {
    try {
        const data = await getData(url);
        const pokemonData = data.results;
        return pokemonData;
    } catch (error) {
        alert("Something went wrong: " + error);
        console.log(error);
    }
}

// getPokemonData(pokemonUrl).then(arr=>console.log(arr))
// console.log(getPokemonData(pokemonUrl));

//Add Try catch

async function navigatePokemons(index) {
    try {
        console.log("navigating: " + index);
        const data = await getData(pokemonUrl);
        dexContainer.innerHTML = "";
        const pokemonData = data.results[index];
        const details = await getData(pokemonData.url);
        renderPokedex(pokemonData, details);
    } catch (error) {
        alert("Something went wrong: " + error);
        console.log(error);
    }
}
// document.getElementById("search").oninput((e)=>{
//     console.log(e);
//     // alert("hei")
// })

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

async function getPokemonSprite(pokemonName) {
    try {
        const data = await getData(pokemonUrl);
        const pokemonData = data.results;

        const details = await getData(pokemon.url);
        return details.sprites.other["official-artwork".front_default];
    } catch (error) {
        console.log(error);
    }
}

document.getElementById("search").addEventListener("input", (e) => {
    getPokemonData(pokemonUrl).then((pokemons) =>
        renderSearch(e.target.value.toLowerCase(), pokemons)
    );
});
//renderSearch(this.value, pokemonData)
navButtons(index, navigatePokemons);
navigatePokemons(0);

// e.target.value === ""
// ? document.querySelectorAll(".results").forEach(remove())
// :

function renderSearch(searchInput = "", pokemonsArr, pokemonDetails) {
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
        results.forEach(async (result, i) => {
            if (i === resultsList.length) {
                //|| i === 3
                return;
            }
            // console.log(result.name);
            const resultContainer = createElement("li", {
                className: "pokemonResult",
            });
            const name = createElement("p", {
                className: "name",
                textContent: result.name,
            });
            const image = createElement("img", {
                src: `${
                    (await getDetails(result.name)).sprites.other[
                        "official-artwork"
                    ].front_default
                }`,
                alt: `Picture displaying ${result.name}`,
            });
            resultContainer.addEventListener("click", async () => {
                // console.log("You clicked: " + result.name);
                // console.log(await getDetails(result.name));
                index = (await getDetails(result.name)).id - 1;
                navigatePokemons(index);
                // renderPokedex();
            });
            resultContainer.append(name, image); //
            const type = (await getDetails(result.name)).types[0].type.name;
            const pokemonColor = `#${
                typeColors.find((entry) => entry.type === type).color
            }`;
            resultContainer.style.backgroundColor = pokemonColor;
            resultsList.append(resultContainer);
        });
        resultsContainer.append(resultsList);
        document.querySelector(".searchContainer").append(resultsContainer);
    } else {
        document.querySelectorAll(".results").forEach((e) => e.remove());
    }
}

document.addEventListener("click", (event) => {
    const resultContainer = document.querySelector(".results");
    if (document.querySelector(".results")) {
        if (!resultContainer.contains(event.target)) {
            resultContainer.remove();
        }
    }
});
