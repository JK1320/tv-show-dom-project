//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  //rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  let container = document.getElementById("container")
  let input = document.getElementById("filter");

  input.addEventListener("keyup", (elem) => {
    console.log(elem.target.value);
  })

  episodeList.forEach(episode => {
    // let img = document.createElement("img");
    // img.setAttribute("src", episode.image.medium)
    // container.appendChild(img);
    // container.innerHTML += `<h2>${episode.name} - Season: ${paddedToTwoDigits(episode.season)} - Episode: ${paddedToTwoDigits(episode.number)} </h2> {img} ${episode.summary}`;
    container.innerHTML += `<h2>${episode.name} - Season: ${paddedToTwoDigits(episode.season)} - Episode: ${paddedToTwoDigits(episode.number)} </h2> <img src="${episode.image.medium}"/> ${episode.summary}`
  })
 
}

function paddedToTwoDigits (num) {
return num.toString().padStart(2, 0);
};

window.onload = setup; 
