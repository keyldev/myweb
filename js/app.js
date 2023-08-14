function renderTime() {
  var timeNow = new Date();
  var ampm = "AM";
  var hours = timeNow.getHours();
  var minutes = timeNow.getMinutes();
  var seconds = timeNow.getSeconds();
  setTimeout("renderTime()", 1000);  //таймер каждую секунду
  if (hours == 0) hours = 12;
  else if (hours > 12) {
    ampm = "PM";
    hours = hours - 12;
  }
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;
  var finalClock = document.getElementById("clock-ru"); // элемент clock

  finalClock.innerText = hours + ":" + minutes + ":" + seconds + ampm;
}
renderTime();

const API_URL = "https://zltflab.xyz/v1/getWorks.php"; // API php
const cardContainer = document.getElementById("card-container"); // контейнер пол карточки

function showWorks(works) {
  works.forEach((work) => { // для каждого элемента в массиве выплняем это
    const { name, description, photo_url, project_url } = work; // объект для дессериализации
    const workElement = document.createElement("div"); // обертка карточки
    workElement.classList.add("work-card");
    workElement.innerHTML = `
                <img src=${photo_url} title=${description}>
                <a href="${project_url}" target="_blank">${name}</a>
        `;
    cardContainer.appendChild(workElement); // закидываем на экран
  });
}
async function getWorks(url) {
  const res = await fetch(url); // запрашиваю данные у "api"
  const data = await res.json(); //декодирует ответ в формате JSON
  showWorks(data);
}
getWorks(API_URL);

const GIT_API_URL = "https://api.github.com/users/";
const main = document.getElementById("git-container");

const createUserCard = (user) => {
  const cardHTML = `
    <div class="card">
        <div>
          <img
            src="${user.avatar_url}"
            alt="${user.name}"
            class="avatar"
          />
        </div>
        <div class="user-info">
          <h2>${user.name}</h2>
          <p>
          ${user.bio}
          </p>
          <ul>
            <li>${user.followers}<strong>Followers</strong></li>
            <li>${user.following}<strong>Following</strong></li>
            <li>${user.public_repos}<strong>Repos</strong></li>
          </ul>
          <div id="repos">
          </div>
        </div>
      </div>
    `;
  main.innerHTML = cardHTML;
};

const createErrorCard = (message) => {
  const cardHTML = `
    <div class="card"><h1>${message}</h1></div>
    `;
  main.innerHTML = cardHTML;
};

const addReposToCard = (repos) => {
  const reposElement = document.getElementById("repos");
  repos.slice(0, 5).forEach((repo) => {
    const repoElement = document.createElement("a"); // создает ссылку на репозиторий
    repoElement.classList.add("repo");
    repoElement.href = repo.html_url;
    repoElement.target = "_blank";
    repoElement.innerText = repo.name;
    reposElement.appendChild(repoElement);
  });
};

const getUser = async (username) => {
  try {
    const { data } = await axios(GIT_API_URL + username);
    createUserCard(data); 
    getRepos(username);
  } catch (error) {
    console.log(error);
  }
};

const getRepos = async (username) => {
  try {
    const { data } = await axios(GIT_API_URL + username + "/repos?sort=created");
    addReposToCard(data);
  } catch (error) {
    createErrorCard("Problem fetching repos");
  }
};
getUser("keyldev"); // получение инфы гит по моему нику
 
