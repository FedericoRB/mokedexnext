export const pokeApiSvc = {
  getPokePage,
  getPokeInfo,
  getPokeDetails,
  getAbilityDesc,
};

const apiUrl = "https://pokeapi.co/api/v2/pokemon/";

async function getPokePage(pageUrl) {
  return await fetch(pageUrl)
    .then((res) => res.json())
    .catch((error) => console.log(error));
}

async function getPokeInfo({ pokeName }) {
  const fetchData = await fetch(apiUrl + pokeName)
    .then((res) => res.json())
    .catch((error) => console.log(error));

  return {
    id: fetchData.id,
    name: fetchData.name,
    height: fetchData.height,
    weight: fetchData.weight,
    experience: fetchData.base_experience,
    image: fetchData.sprites.other["official-artwork"].front_default,
  };
}

async function getPokeDetails({ pokeName }) {
  const fetchData = await fetch(apiUrl + pokeName)
    .then((res) => res.json())
    .catch((error) => console.log(error));

  return {
    name: fetchData.name,
    abilities: fetchData.abilities,
    pokeImage: fetchData.sprites.other["official-artwork"].front_default,
    pokeImageHover: fetchData.sprites.other.dream_world.front_default,
  };
}

async function getAbilityDesc({ skillUrl, lang }) {
  const fetchData = await fetch(skillUrl)
    .then((res) => res.json())
    .catch((error) => console.log(error));

  const filterName = fetchData.names.filter(
    (eachName) => eachName.language.name === lang
  );
  const filterDesc = fetchData.effect_entries.filter(
    (effect) => effect.language.name === lang
  );

  const skillName =
    filterName.length === 0 ? "No Disponible" : filterName[0].name;
  const skillDesc =
    filterDesc.length === 0 ? "No Disponible" : filterDesc[0].effect;

  return {
    skillName,
    skillDesc,
  };
}
