export const dexContainer = document.querySelector(".dexContainer");
export const wrapper = document.querySelector(".wrapper");
export const searchInput = document.getElementById("search");
export function navButtons(index, navigatePokemons) {
    document
        .getElementById("prev")
        .addEventListener(
            "click",
            () => (index !== 0 ? index-- : null, navigatePokemons(index))
        );
    document
        .getElementById("next")
        .addEventListener(
            "click",
            () => (index !== 151 ? index++ : null, navigatePokemons(index))
        );
}
