document.addEventListener('DOMContentLoaded', () => {
    const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
    let currentId = 1;

    const pokemonNameElement = document.getElementById('pokemon-name');
    const pokemonImageElement = document.getElementById('pokemon-image');
    const pokemonIdInput = document.getElementById('pokemon-id');

    const fetchPokemon = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}${id}`);
            if (!response.ok) throw new Error('Pokémon no encontrado');
            const data = await response.json();
            pokemonNameElement.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
            pokemonImageElement.src = data.sprites.front_default;
        } catch (error) {
            pokemonNameElement.textContent = 'Error: Pokémon no encontrado';
            pokemonImageElement.src = '';
        }
    };

    const showPokemon = () => fetchPokemon(currentId);

    document.getElementById('prev').addEventListener('click', () => {
        if (currentId > 1) {
            currentId--;
            showPokemon();
        }
    });

    document.getElementById('next').addEventListener('click', () => {
        currentId++;
        showPokemon();
    });

    document.getElementById('get-pokemon').addEventListener('click', () => {
        const id = parseInt(pokemonIdInput.value, 10);
        if (id > 0) {
            currentId = id;
            showPokemon();
        }
    });

    // Load the initial Pokémon
    showPokemon();
});
