import {
    animatedPokeballContainer,
    mainContainer,
    searchContainerEl,
} from "./HTMLElements.js";
export function transistion() {
    animatedPokeballContainer.classList.toggle("fadeOut");
    animatedPokeballContainer.style.display = "none";
    mainContainer.classList.toggle("visible");
    searchContainerEl.classList.toggle("visible");
}
