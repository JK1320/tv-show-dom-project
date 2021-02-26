//You can edit ALL of the code here
let input = document.getElementById("filter");
let container = document.getElementById("container");
let select = document.getElementById("select-input")
let option = document.getElementById("option");
let episodesOption = document.getElementById("episodes-option")
let rootDiv = document.getElementById("root");
let countDisplay = document.getElementById("count-display");
let allEpisodes;

function setup() {
 allEpisodes = getAllEpisodes();
 makePageForEpisodes(allEpisodes);
 input.addEventListener("input", search);
selectEpisode(allEpisodes);
}

 // function to load all episodes
function makePageForEpisodes(episodeList) {
  container.innerHTML = "";
  countDisplay.innerText = `Displaying ${episodeList.length} of ${allEpisodes.length}`
  episodeList.forEach((episode) => {
    container.innerHTML += `<div id="episodesDiv"> <div id="title-div"> <h2>${
      episode.name
    } - Season: ${paddedToTwoDigits(
      episode.season
    )} - Episode: ${paddedToTwoDigits(episode.number)} </h2> </div> <img id="img" src="${
      episode.image.medium
    }"/> ${episode.summary}<div>`;
  });
}
 
// function zero-padded to two digits.
function paddedToTwoDigits(num) {
  return num.toString().padStart(2, 0);
}

// function to search for episodes
function search(elem) {
  let searchString = elem.target.value.toLowerCase();
  let filteredEpisodes = allEpisodes.filter((episode) => {
    return (
      episode.name.toLowerCase().includes(searchString) ||
      episode.summary.toLowerCase().includes(searchString)
    );
  });

  makePageForEpisodes(filteredEpisodes);
}

input.addEventListener("input", search);


// function to select episodes
function selectEpisode () {
    allEpisodes.forEach(episode => {
      let episodeOption = document.createElement("option");


      episodeOption.value = episode.name;
      episodeOption.innerHTML = `S${paddedToTwoDigits(episode.season)}
      E${paddedToTwoDigits(episode.number)} - 
      ${episode.name}`

      select.appendChild(episodeOption);
    })

    select.addEventListener("change", (e) => {
      
      let selectedEpisode = allEpisodes.filter(episode => {
        return episode.name === e.target.value;
      })
      if(selectedEpisode.length === 0) {
        selectedEpisode = allEpisodes;
      }
      makePageForEpisodes(selectedEpisode);
    })
   
};

/*
function fetchEpisodes () {

 fetch("https://api.tvmaze.com/shows/${showID}/episodes")
.then(response => response.json())
.then(data => 
  allEpisodes = data
  makePageForEpisodes(allEpisodes))
  .catch(error => console.log(error))
}

*/
 
window.onload = setup;


//  function paddedToTwoDigits(num) {
//    if (num < 10) return "0" + number;
//    else return num;
//  }