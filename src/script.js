const inputValue = document.querySelector("#inputSearch");
const searchButton = document.querySelector("#searchBtn");
const randomButton = document.querySelector("#randomBtn");
const cleanButton = document.querySelector("#cleanBtn");
const mainSection = document.querySelector("#sectionRes");

searchButton.addEventListener('click', function() {
    console.log(inputValue.value)
    getPokemon(inputValue.value)
        .then(pokemon => {
        console.log(pokemon);
        mainSection.innerHTML = `
        <h2>${pokemon.name}</h2>
        <img src="${pokemon.image}" alt="${pokemon.name}">
        <ul>
            <li>Height: ${pokemon.height}dm</li>
            <li>Weight: ${pokemon.weight}hg</li>
            <li>Type/s: ${pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</li>
            <li>Abilities: ${pokemon.abilities.map(abilitiesInfo => abilitiesInfo.ability.name).join(', ')}</li>
            <li>Move/s: ${pokemon.moves.map(moveInfo => moveInfo.move.name).join(', ')}</li>
        </ul>
        `
    })
    .catch(error => {
        console.error("Nope");
    }); 
})

cleanButton.addEventListener('click', function() {
    mainSection.innerHTML = '';
})

const getPokemon = (id) => { 
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => {
            if(!response.ok) {
                console.error("Nope");
            }
            return response.json()
        })
        .then(data => {
            return {
                name: data.name,
                image: data.sprites.front_default,
                height: data.height,
                weight: data.weight,
                types: data.types,
                abilities: data.abilities,
                moves: data.moves,
            }; 
        })
};