//You can edit ALL of the code here
let input = document.getElementById("filter");
let container = document.getElementById("container");
let select = document.getElementById("select-input")
let option = document.getElementById("option");
let episodesOption = document.getElementById("episodes-option")
let rootDiv = document.getElementById("root");
let allEpisodes;

function setup() {
 allEpisodes = getAllEpisodes();
 makePageForEpisodes(allEpisodes);
 input.addEventListener("input", search);
}

 
function makePageForEpisodes(episodeList) {
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
 
function paddedToTwoDigits(num) {
  return num.toString().padStart(2, 0);
}

// search function for input
function search(elem) {
  let searchString = elem.target.value.toLowerCase();
  let filteredEpisodes = allEpisodes.filter((episode) => {
    return (
      episode.name.toLowerCase().includes(searchString) ||
      episode.summary.toLowerCase().includes(searchString)
    );
   
  });
  container.innerHTML = "";
  makePageForEpisodes(filteredEpisodes);
}

input.addEventListener("input", search);

// function for select for episodes option
function selectOption (elem) {

  for(let i = 0; i < allEpisodes.length; i++) 
  {
    episodesOption.value = allEpisodes.name;
    episodesOption.innerHTML = `${allEpisodes[i]}`;
  }

  select.innerHTML = episodesOption;

    // select.forEach(episodes => {
    //   episodesOption.value = episodes.name;
    //   episodesOption.innerHTML = `${
    //   episodes.name
    // } - Season: ${paddedToTwoDigits(
    //   episodes.season
    // )} - Episode: ${paddedToTwoDigits(episodes.number)}`
    // })

    // select.addEventListener("change", (e) => {
    //   let eachEpisode;
    //   if(e.target.value === 0) {
    //     eachEpisode = elem;
    //   } 
    // })
    selectOption(allEpisodes);
};

 
//  function paddedToTwoDigits(num) {
//    if (num < 10) return "0" + number;
//    else return num;
//  }

 
window.onload = setup;