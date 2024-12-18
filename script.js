const typesPage = document.getElementById("types-page");
const pokemonsPage = document.getElementById("pokemons-page");
const detailsPage = document.getElementById("details-page");

const typesContainer = document.getElementById("types-container");
const pokemonsContainer = document.getElementById("pokemons-container");
const detailsContainer = document.getElementById("details-container");


async function loadTypes() {
    const response = await fetch('https://pokeapi.co/api/v2/type?offset=0&limit=21');
    const data = await response.json();

    data.results.forEach(type => {
        const button = document.createElement('button');
        button.textContent = type.name;
        button.onclick = () => loadPokemonsByType(type.url);
        typesContainer.appendChild(button);
    });
}


async function loadPokemonsByType(typeUrl) {
    const response = await fetch(typeUrl);
    const data = await response.json();

    pokemonsContainer.innerHTML = '';  
    data.pokemon.forEach(pokemon => {
        const button = document.createElement('button');
        button.textContent = pokemon.pokemon.name;
        button.onclick = () => loadPokemonDetails(pokemon.pokemon.url);
        pokemonsContainer.appendChild(button);
    });

    
    typesPage.classList.remove("active");
    pokemonsPage.classList.add("active");
}


async function loadPokemonDetails(pokemonUrl) {
    const response = await fetch(pokemonUrl);
    const data = await response.json();

    detailsContainer.innerHTML = `
        <h2>${data.name}</h2>
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <p><strong>Height:</strong> ${data.height}</p>
        <p><strong>Weight:</strong> ${data.weight}</p>
        <p><strong>Types:</strong> ${data.types.map(type => type.type.name).join(', ')}</p>
    `;

    
    pokemonsPage.classList.remove("active");
    detailsPage.classList.add("active");
}


function goBack() {
    if (detailsPage.classList.contains("active")) {
        detailsPage.classList.remove("active");
        pokemonsPage.classList.add("active");
    } else if (pokemonsPage.classList.contains("active")) {
        pokemonsPage.classList.remove("active");
        typesPage.classList.add("active");
    }
}


loadTypes();