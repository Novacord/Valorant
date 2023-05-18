let data;
let agente;
let listaBusqueda;

const url = '../valorant.json';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '837d4091fcmsh3361d584d6e55d1p16ff2djsne4ee20107e39',
    'X-RapidAPI-Host': 'valorant-agents-maps-arsenal.p.rapidapi.com'
  }
};

let config = {
  headers: new Headers({
    "Content-Type": "application/json"
  }),
};



const searchUser = (agents, agentName) => {
  const matchingAgents = agents.filter(agent => agent.title.toLowerCase().includes(agentName.toLowerCase()));
  return matchingAgents;
}

const searchUserAsync = async (agentName) => {
  try {
    const response = await fetch(`../valorant.json`);
    const data = await response.json();
    const matchingAgents = searchUser(data.agents, agentName);
    console.log(matchingAgents);
    return matchingAgents;
  } catch (error) {
    console.error(error);
  }
}

async function agentes(url, options) {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

let agenteSeleccionado

let container = document.querySelector('conteiner')

async function agt(url, options) {
  let agentesData = await agentes(url, options);
  console.log(agentesData);
  let buscador = document.getElementById('buscador');
  let listaB = document.getElementById('listaB');
  let textoBusqueda = '';

  buscador.addEventListener('keyup', async () => {
    const nuevoTextoBusqueda = buscador.value.toLowerCase();

    if (nuevoTextoBusqueda !== textoBusqueda) {
      const resultados = await searchUserAsync(nuevoTextoBusqueda);
      console.log(resultados);
      listaB.innerHTML = '';
      if (nuevoTextoBusqueda.length > 0 && resultados.length > 0) {
        resultados.forEach(data => {
          const li = document.createElement('li');
          li.textContent = data.title;
          li.addEventListener('click', () => {
            agenteSeleccionado = data.title; 
            console.log(agenteSeleccionado);
            document.querySelector('.conteiner').style.display = 'none';
            document.querySelector('.Agentes').style.display = 'flex';
            document.querySelector('.cont').innerHTML = `
            <div class="titulo">
              <div class="nombreA">
                <h1>${data.title}</h1>
                <img src="${data.role_icon.url}">
              </div>
              <div class="info">
                <div class="description">
                  <h2>// BIOGRAFÍA</h2>
                  <p>${data.description}</p>
                </div>
                <div class="habilidades">
                  <button id="habilidad1"><img src="${data.abilities[0].ability_icon.url}"></button>
                  <button id="habilidad2"><img src="${data.abilities[1].ability_icon.url}"></button>
                  <button id="habilidad3"><img src="${data.abilities[2].ability_icon.url}"></button>
                  <button id="habilidad4"><img src="${data.abilities[3].ability_icon.url}"></button>
                </div>
                <div class="HabilidadDe">
                  <p>${data.abilities[2].ability_description}</p>
                </div>
              </div>
              <div class="video">
                  <video preload="true" loop playsinline poster data-testid="abilities:video"><source src="${data.abilities[0].ability_video.url}" type="video/mp4"></video>
              </div>
            </div>
            <div class="imagenAgente">
              <img src="${data.agent_image.url}"
            </div>
            `
            document.querySelector('#habilidad1').addEventListener('click',()=>{
                let infoA1 = `
                <p>${data.abilities[0].ability_description}</p>
                `
                document.querySelector(".HabilidadDe").innerHTML = infoA1
            })
            document.querySelector('#habilidad2').addEventListener('click',()=>{
              let infoA2 = `
              <p>${data.abilities[1].ability_description}</p>
              `
              document.querySelector(".HabilidadDe").innerHTML = infoA2
          })
          document.querySelector('#habilidad3').addEventListener('click',()=>{
            let infoA3 = `
            <p>${data.abilities[2].ability_description}</p>
            `
            document.querySelector(".HabilidadDe").innerHTML = infoA3
        })
        document.querySelector('#habilidad4').addEventListener('click',()=>{
          let infoA4 = `
          <p>${data.abilities[3].ability_description}</p>
          `
          document.querySelector(".HabilidadDe").innerHTML = infoA4
      })
             
          });
          listaB.appendChild(li);
        });
        listaB.style.display = 'block';
      } else {
        listaB.style.display = 'none';
      }
    }
    textoBusqueda = nuevoTextoBusqueda;
  });
}

document.addEventListener('keyup', () => {
  agt(url, options);
});





