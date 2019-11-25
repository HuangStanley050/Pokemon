const url = "https://pokeapi.co/api/v2/pokemon/";

const fetchPokemons = async () => {
  let result = await axios.get(url);
  const container = document.getElementById("pokemon-container");
  const nameContainer = document.getElementById("name");
  const ownContainer = document.getElementById("ownContainer");
  const abilitiesContainer = document.getElementById("abilities");
  const movesContainer = document.getElementById("moves");
  let pokeArray = result.data.results;
  let pokeDetails = pokeArray.map(async pokemon => {
    let promiseObj = await axios.get(pokemon.url);
    return promiseObj;
  });
  let finalResult = await Promise.all(pokeDetails);

  finalResult.map(pokemon => {
    let h3 = document.createElement("H3");
    let img = document.createElement("IMG");
    let abilities = document.createElement("H4");
    let moves = document.createElement("H4");
    let div = document.createElement("DIV");
    let ul = document.createElement("UL");
    let ul2 = document.createElement("UL");
    abilities.innerHTML = "Abilities";
    moves.innerHTML = "Moves";
    let liAbilities = document.createElement("LI");
    let liMoves = document.createElement("LI");
    h3.appendChild(document.createTextNode(pokemon.data.name));
    h3.setAttribute("style", "color:blue; border: 1px solid blue;");
    pokemon.data.abilities.forEach(ability => {
      liAbilities.appendChild(
        document.createTextNode(` ${ability.ability.name}, `)
      );
    });
    pokemon.data.moves.forEach(move => {
      liMoves.appendChild(document.createTextNode(` ${move.move.name}, `));
    });
    ul.appendChild(liAbilities);
    ul2.appendChild(liMoves);
    div.appendChild(h3);
    img.src = `${pokemon.data.sprites.front_default}`;
    div.appendChild(img);
    div.appendChild(abilities);
    div.appendChild(ul);
    div.appendChild(moves);
    div.appendChild(ul2);
    nameContainer.append(div);
  });
};

fetchPokemons();
