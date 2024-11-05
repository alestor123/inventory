const searchInput = document.querySelector("searchBarInput")
const list = document.querySelector('.list');

const main = async () => {
    const {username} = (await (await fetch("./config/user.json")).json());
    const data = (await (await fetch(`https://api.github.com/users/${username}`)).json());
    setProfile(data);
};
main();


function setProfile({bio,blog,avatar_url,followers,public_repos,name,company}) {
document.querySelector('.info').innerHTML = `
<figure>
            <img alt="User Profile" src="${avatar_url}" />
        </figure>
        <div>
            <h2><a href=${blog}><strong>${name}</strong></a></h2>
            <p>${bio}</p>
            <p>
                Followers: <strong>${followers}</strong>
                Repos: <strong>${public_repos}</strong>
                ${company ? "Work: "+company : "" }

            </p>
            
        </div>
        `;
}


async function displayDirs(dirs) {
        const {items} = (await (await fetch("./config/user.json")).json());

items.forEach(dir => {
         let liItem = document.createElement('li');
         liItem.classList.add('itm');
         liItem.innerHTML = `
            <a href=${dir.url} target='_blank'>
                <div>
                    <h3>
                    <span class='${dir.icon}' ></span>
                        ${dir.name}
                    </h3>
                    <p>${dir.description}</p>
                </div>
            </a>`;
            list.append(liItem);
  
});    // }
}
displayDirs()