const detailsSpiner = document.getElementById('details-spiner');
detailsSpiner.style.display = 'none';
const teamSpiner = document.getElementById('team-spiner');
  teamSpiner.style.display = 'none';
const searchButton = () => {
  // cleaning details div 
  const detailsParrent = document.getElementById('details-parent');
  detailsParrent.textContent = '';

  const teamSpiner = document.getElementById('team-spiner');
  teamSpiner.style.display = 'block';
  const searchBox = document.getElementById('search-input');
  searchValue = searchBox.value;
  searchBox.value = '';
  fetch(`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${searchValue}`)
    .then(res => res.json())
    .then(data => loadData(data.teams));
}

const loadData = (teams) => {
  const teamSpiner = document.getElementById('team-spiner');
  teamSpiner.style.display = 'none';
  const teamParrent = document.getElementById('team-parrent');
  teamParrent.textContent = '';
  teams.forEach(team => {
    const div = document.createElement('div');
    let stadum = team.strStadiumDescription?.slice(0, 200);
    console.log(stadum);
    div.classList.add('col');
    div.innerHTML = `
        <div class="card">
            <img src="${team.strTeamJersey}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${team.strTeam}</h5>
              <p class="card-text">${stadum}</p>
              <button class="bg-info" onclick="details(${team.idTeam})">Details</button>
            </div>
          </div>
        `;
    teamParrent.appendChild(div);
  })
}

const details = teamId => {
  const detailsSpiner = document.getElementById('details-spiner');
  detailsSpiner.style.display = 'block';

  fetch(`https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${teamId}`)
    .then(res => res.json())
    .then(data => loadDetails(data.teams[0]))
}

const loadDetails = team => {
  const detailsSpiner = document.getElementById('details-spiner');
  detailsSpiner.style.display = 'none';
  const detailsParrent = document.getElementById('details-parent');
  detailsParrent.textContent = '';
  const div = document.createElement('div');
  div.classList.add('card');
  div.innerHTML = `
            <img class="w-25 mx-auto" src="${team.strTeamJersey}" alt="...">
            <div class="card-body">
              <h5 class="card-title">${team.strTeam}</h5>
              <p class="card-text">${team.strStadiumDescription}</p>
            </div>
    `;
  detailsParrent.appendChild(div);
}