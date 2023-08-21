export const createElement = (type = "div", props = {}) => {
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
//                 addSVG(dexContainer, "images/rucksack.svg");
//                 // svgEl.classList.toggle("slideIn");
//                 console.log("saødkfjhaslkd");
//             }, 3000);
//         });
//     };
// }

// render();
