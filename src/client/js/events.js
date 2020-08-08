import { handleInput } from './handleInput'

function addEventListeners() {
    document.getElementById("searchForm").addEventListener("submit", handleInput);
}

export { addEventListeners };

