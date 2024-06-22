document.addEventListener('DOMContentLoaded', () => {
    const baseURL = 'https://pokeapi.co/api/v2/pokemon/';

    const select = document.getElementById('pokemon-select');
    const button = document.getElementById('get-pokemon');
    const pokemonInfo = document.getElementById('pokemon-info');

    button.addEventListener('click', () => {
        const selectedPokemon = select.value.toLowerCase();
        const url = `${baseURL}${selectedPokemon}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo obtener el Pokémon');
                }
                return response.json();
            })
            .then(data => {
                const { name, sprites, types, height, weight } = data;
                const pokemonTypes = types.map(type => type.type.name).join(', ');

                // Limpiar el contenido previo del contenedor
                pokemonInfo.innerHTML = '';

                // Crear elementos HTML y estructurar la información del Pokémon
                let pokemonCard = document.createElement('div');
                pokemonCard.classList.add('pokemon-card');

                let heading = document.createElement('h2');
                heading.innerText = name;

                let image = document.createElement('img');
                image.src = sprites.front_default;
                image.alt = name;

                let typeParagraph = document.createElement('p');
                typeParagraph.innerHTML = `<b>Tipo:</b> ${pokemonTypes}`;

                let heightParagraph = document.createElement('p');
                heightParagraph.innerHTML = `<b>Altura:</b> ${height} decímetros`;

                let weightParagraph = document.createElement('p');
                weightParagraph.innerHTML = `<b>Peso:</b> ${weight / 10} kilogramos`;

            
                pokemonCard.appendChild(heading);
                pokemonCard.appendChild(image);
                pokemonCard.appendChild(typeParagraph);
                pokemonCard.appendChild(heightParagraph);
                pokemonCard.appendChild(weightParagraph);

            
                pokemonInfo.appendChild(pokemonCard);
            })
            .catch(error => {
                console.error('Error al obtener el Pokémon:', error);
                pokemonInfo.innerHTML = `Error: ${error.message}`;
            });
    });
});
