const apiurl = 'https://api.github.com/users/';
const detailSection = document.querySelector('.details-section');
const searchBtn = document.getElementById('search-btn');
const repoSection = document.getElementById('repos');


searchBtn.addEventListener('click',()=>{
    let searchValue = document.getElementById('search-input').value;
    console.log(searchValue);

    if(searchValue){
        getUser(searchValue);
    }
})


async function getUser(username){
    let loader = `<div id ="loader">Loading</div>`;
    detailSection.innerHTML = loader;
    
    const resp = await fetch(apiurl + username);
    const respData = await resp.json();

    createUserCard(respData);
    getRepos(username);

}

async function getRepos(username){
    let loader = `<div id ="loader">Loading</div>`;
    repoSection.innerHTML = loader;
    const resp = await fetch(apiurl + username + '/repos');
    const respData = await resp.json();

    addRepostoCard(respData);
}


function createUserCard(user){
    const html = `
            <div class ="img-container">
                <img src="${user.avatar_url}" alt="img" class="profile-img"/>
            </div>
            <div class = "user-info">
                <h2 id="name">${user.name}</h2>
                <p id="bio">${user.bio}</p>           
                <ul class ="info">
                    <li><strong>Followers:</strong>${user.followers}  </li>
                    <li><strong>Following:</strong>${user.following}</li>
                    <li><strong>Repos:</strong>${user.public_repos}</li>
                </ul>
            </div>
    `
    detailSection.innerHTML = html;

}

function addRepostoCard(repos){
    output ="<h4>Repos:</h4>";
    repos.slice(0,15).forEach((repo)=>{
        output +=`  
        <a href ="${repo.html_url}" target="_blank">${repo.name}</a>`
    }); 
    repoSection.innerHTML = output;

}

