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
6;
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
    //Removes old results
    document.querySelectorAll(".results").forEach((e) => e.remove());

    //Checks if input field has more than one letter
    if (searchInput.length > 0) {
        //Filters pokemon from all 151 pokemons, to pokemons which names, contains the the input string
        const results = pokemonsArr
            .filter((pokemon) =>
                pokemon.name.toLowerCase().includes(searchInput)
            ) //
            .sort();

        const resultsContainer = createElement("div", {
            className: "results",
        });

        const resultsList = createElement("ul");

        //Loops through the filtered pokemon arrray,
        //to create list elements with pokemon name
        //and image, then lastly appending each into the ul element resultslist
        results.forEach(async (result, i) => {
            const resultContainer = createElement("li", {
                className: "pokemonResult",
            });

            const name = createElement("p", {
                className: "name",
                textContent: result.name,
            });

            const image = createElement("img", {
                //for each pokemons in the filtered array, getDetails is ran,
                //to access the give pokemons sprite, so imagessrc can be set to
                //display the image
                src: `${
                    (await getDetails(result.name)).sprites.other[
                        "official-artwork"
                    ].front_default
                }`,
                alt: `Picture displaying ${result.name}`,
            });
            //Eventlistener for click is added, so that if the listed pokemon is clicked, it is displayed on the pokedex
            resultContainer.addEventListener("click", async () => {
                index = (await getDetails(result.name)).id - 1;
                navigatePokemons(index);
            });
            resultContainer.append(name, image);
            //for each pokemons in the filtered array, getDetails is ran,
            //to access the give pokemons type, so a background color to
            //the li element can be set based on this
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
