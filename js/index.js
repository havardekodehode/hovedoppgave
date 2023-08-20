// import {getData} from "./data/api.js"

const mainContainer = document.querySelector(".dexContainer");

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

async function getData(url) {
    const req = await fetch(url);
    const data = await req.json();
    return data;
}

async function navigate(url) {
    const data = await getData(url);
    mainContainer.innerHTML = "";
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

function renderPokedex(pokemonData, details) {
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

    container.append(...pokemonStats);
    pokemonContainer.append(pokemonName, pokemonImage, container);
    pokedexContainer.append(pokemonContainer);
    mainContainer.append(pokedexContainer);
}

navigate(baseUrl);

const createElement = (type = "div", props = {}) => {
    const element = document.createElement(type);
    Object.entries(props).forEach(([key, value]) => (element[key] = value));
    return element;
};

// Load SVGS

// function addSVG(container, url) {
//     getSVGDoc(url).then((doc) => {
//         let svgEl = doc.querySelector("svg");

//         container.append(svgEl);
//     });
// }

// /**
//  * @param {string} url - URL for the svg file
//  * @returns {SVGSVGElement} - Returns the SVG element, of the given file in the url
//  */
// function getSVGDoc(url) {
//     return new Promise((resolve, reject) => {
//         fetch(url)
//             .then((response) => response.text())
//             .then((str) =>
//                 resolve(
//                     new window.DOMParser().parseFromString(str, "image/svg+xml")
//                 )
//             )
//             .catch((error) => {
//                 reject(error);
//             });
//     });
// }

// function render() {
//     window.onload = () => {
//         getSVGDoc("images/rucksack.svg").then((doc) => {
//             // console.log(doc);
//             const svgEl = doc.getElementById("openingOpened");
//             console.log(svgEl);
//             svgEl.classList.toggle("slideIn");
//             setTimeout(() => {
//                 addSVG(mainContainer, "images/rucksack.svg");
//                 // svgEl.classList.toggle("slideIn");
//                 console.log("saødkfjhaslkd");
//             }, 3000);
//         });
//     };
// }

// render();
