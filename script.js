//You can edit ALL of the code here
const input = document.getElementById("search");
const container = document.getElementById("container");
const select = document.getElementById("episode-select")
const option = document.getElementById("option");
const episodesOption = document.getElementById("episodes-option")
const rootDiv = document.getElementById("root");
const countDisplay = document.getElementById("count-display");
const showSelect = document.getElementById("shows");
const showsNav = document.getElementById("shows-nav");
const searchShows = document.getElementById("search-shows");
let showOption;
let showEpisodes = [];


function setup() {
 
  populateShowsDropDown();
  select.style.display = "none";
  input.style.display = "none";
  input.addEventListener("input", search);
  searchShows.addEventListener("input", searchForShow);
}

 // function to load all episodes
function makePageForEpisodes(episodeList) {
  container.innerHTML = "";
  countDisplay.innerHTML = `Displaying ${episodeList.length} of ${showEpisodes.length}`
  episodeList.forEach((episode) => {
    container.innerHTML += `<div id="episodesDiv"> <div id="title-div"> <h2>${episode.name} 
    - Season: ${paddedToTwoDigits(episode.season)} 
    - Episode: ${paddedToTwoDigits(episode.number)} </h2> </div> 
    <img id="img" src="${episode.image != null ? episode.image.medium : ''}"/> 
    ${episode.summary}<div id="level-500"> - Runtime: ${episode.runtime}</div></div>`;
});
 input.style.display = "inline"; 
}

// function to load shows
function makePageForShows(showList) {
  container.innerHTML = "";
  countDisplay.innerHTML = "";
  showList.forEach((episode) => {
    container.innerHTML += `<div onclick="fetchEpisodes(${episode.id})" id="episodesDiv"> <div id="title-div"> <h2>${episode.name} </h2> </div> 
    <img id="img" src="${episode.image != null ? episode.image.medium : ''}"/> 
    ${episode.summary}<div id="level-500">Genres: ${episode.genres} - Status: ${episode.status} - Rating: ${episode.rating.average} - Runtime: ${episode.runtime}</div></div>`;
});
  
}
 
// function zero-padded to two digits.
function paddedToTwoDigits(num) {
  return num.toString().padStart(2, 0);
}

// function to search for episodes
function search(elem) {
  let searchString = elem.target.value.toLowerCase();
  let filteredEpisodes = showEpisodes.filter((episode) => {
    return (
      episode.name.toLowerCase().includes(searchString) ||
      (episode.summary && episode.summary.toLowerCase().includes(searchString))
    );
  });
  container.innerHTML = "";
  makePageForEpisodes(filteredEpisodes);
}




// function to search for shows
function searchForShow(elem) {
  const allShows = getAllShows();
  let searchString = elem.target.value.toLowerCase();
  let filteredShows = allShows.filter((episode) => {
    return (
      episode.name.toLowerCase().includes(searchString) ||
      episode.genres.join(" ").toLowerCase().includes(searchString) || 
      (episode.summary && episode.summary.toLowerCase().includes(searchString))
    );
  });
  container.innerHTML = "";
 makePageForShows(filteredShows);
}





// function to select episodes
function populateEpisodesDropDown (episodes) {
    select.innerHTML = "";
    episodes.forEach(episode => {
      let episodeOption = document.createElement("option");


      episodeOption.value = episode.id;
      episodeOption.innerHTML = `S${paddedToTwoDigits(episode.season)}
      E${paddedToTwoDigits(episode.number)} - 
      ${episode.name}`

      select.appendChild(episodeOption);
    })

    select.addEventListener("change", (e) => {
     
      let selectedEpisode = showEpisodes.filter(episode => {
        return episode.id === parseInt(e.target.value);
      })
      makePageForEpisodes(selectedEpisode);
    })
   
};

//fetch API 
function fetchEpisodes(showID) {
  fetch(`https://api.tvmaze.com/shows/${showID}/episodes`)
    .then((response) => response.json())
    .then((data) => {
      showEpisodes = data;

      populateEpisodesDropDown(showEpisodes);
      makePageForEpisodes(showEpisodes);
    })
    .catch((error) => console.log(error));
}

// select a show drop down

function populateShowsDropDown() {
  const allShows = getAllShows();
  
  allShows.sort(function(a, b) {
  return compareStrings(a.name, b.name);
})

  makePageForShows(allShows);
  allShows.forEach((show) => {
    showOption = document.createElement("option");
    showOption.value = show.id;
    showOption.innerHTML = show.name;
    showSelect.appendChild(showOption);
  });
       
   showSelect.addEventListener("change", (e) => {

     if(e.target.value === "default"){
       makePageForShows(allShows);
       input.style.display = "none";
       select.style.display = "none";
       searchShows.style.display = "inline";
     } else {
        fetchEpisodes(e.target.value)
        select.style.display = "inline";
        searchShows.style.display = "none";
     }
      
    })
};

//nav link for shows list
showsNav.addEventListener("click", function(){
  showSelect.selectedIndex = 0;
  input.style.display = "none";
  select.style.display = "none";
  searchShows.style.display = "inline";
  const allShows = getAllShows();
  allShows.sort(function(a, b) {
  return compareStrings(a.name, b.name);
})

  makePageForShows(allShows);
})

// function returns case-insensitive
function compareStrings(a, b) {
  
  a = a.toLowerCase();
  b = b.toLowerCase();

  return (a < b) ? -1 : (a > b) ? 1 : 0;
}


 
window.onload = setup;






/* original code
//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const displayElem = document.getElementById("episodesDisplay");
  displayElem.textContent = `Got ${episodeList.length} episode(s)`;
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

window.onload = setup;
*/