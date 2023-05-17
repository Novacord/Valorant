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
  return agenteSeleccionado
}

document.addEventListener('keyup', () => {
  agt(url, options);
});





