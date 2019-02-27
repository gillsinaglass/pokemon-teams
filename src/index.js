//solution goes here
document.addEventListener('DOMContentLoaded', ()=>{
  fetchTrainer()
})

function trainerURL(){
  return url = 'http://localhost:3000/trainers'
}

function pokemonUrl(){
  return url = `http://localhost:3000/pokemons`
}

function fetchTrainer(){
  fetch(trainerURL())
  .then(res=> res.json())
  .then(json => getTrainers(json))
}

function fetchPokemon(trainer){
  let data = {trainer_id: trainer.id}
  fetch(pokemonUrl(),{
    method: `POST`,
    headers: {
            "Content-Type": "application/json"
          },
    body: JSON.stringify(data),
  })
  .then(res => res.json())
  .then(json => getPokemon(json))
}

function getTrainers(json){
  json.forEach((trainer) => renderTrainerDiv(trainer))
}

function renderTrainerDiv(trainer){
  let mainTag = document.querySelector('main')
  let trainerDiv = document.createElement('div')
  trainerDiv.id = trainer.id
  trainerDiv.classList.add('card')
  let trainerPTag = document.createElement('p')
  let trainerButton = document.createElement(`button`)
  let trainerUlist = document.createElement('ul')
  trainerUlist.id=(`ul-${trainer.id}`)
  trainerButton.id = `button-${trainer.id}`
  trainerButton.innerText = `Add Pokemon`
  trainerButton.addEventListener("click", ()=>{fetchPokemon(trainer)})
  trainerPTag.innerText = trainer.name
  trainerDiv.append(trainerPTag, trainerButton, trainerUlist)
  mainTag.appendChild(trainerDiv)
  trainerPokemon(trainer)

}

function trainerPokemon(trainer){
  let pokearr = trainer.pokemons
  pokearr.forEach(pokemon => renderPoke(trainer, pokemon))
}

function renderPoke(trainer, pokemon){
  let ul = document.getElementById(`ul-${trainer.id}`)
  let li = document.createElement('li')
  let button = document.createElement('button')
  button.innerText = `Release`
  button.classList.add(`release`)
  li.id = pokemon.id
  li.innerText = `${pokemon.nickname}`
  li.appendChild(button)
  ul.append(li)
}

function getPokemon(pokemon){
  
}
