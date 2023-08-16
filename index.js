const mainContainer = document.querySelector("main");

const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

let navState = "main";

async function getData(url) {
    const req = await fetch(url);
    const data = await req.json();

    return data;

    // console.log(data.results);
}

async function navigate(url) {
    const data = await getData(url);

    const pokemonList = data.results;
    pokemonList.forEach(renderPokemonNames);
}

function renderPokemonNames(pokemon) {
    const pokemonWrapper = document.createElement("div");
    const pokemonTitle = document.createElement("h3");
    pokemonTitle.textContent = pokemon.name;
    // const pokemonStats = document.createElement("div");
    // pokemonStats.textContent = JSON.stringify(pokemon);
    pokemonWrapper.append(pokemonTitle); //, pokemonStats
    mainContainer.append(pokemonWrapper);
}

navState = "getDetails";
// navigate("https://pokeapi.co/api/v2/pokemon?limit=75&offset=75.");




renderPokedex(pokemonData){
    const pokedexContainer = createElement("div", {class: "pokedex"})
    const pokemonContainer = createElement("div", {class: "pokemonContainer"})
    mainContainer.append(pokedexContainer)

}

const createElement = (type, attributes, styles, textContent) => {
    const el = document.createElement(type);
    Object.assign(el.style, styles);
    for (const [key, value] of Object.entries(attributes)) {
        el.setAttribute(key, value);
    }
    el.textContent = textContent;
    return el;
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
