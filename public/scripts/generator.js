const searchInput = document.querySelector(".searchBarInput")
const list = document.querySelector('.list');
const selectionButtonsSection = document.querySelector('.selection')
var currentActiveClass = 'all'
var dataContents = []
// const main = async () => {
//     const {username} = (await (await fetch("./config/user.json")).json());
//     const data = (await (await fetch(`https://api.github.com/users/${username}`)).json());
//     setProfile(data);
// };


// function setProfile({bio,blog,avatar_url,followers,public_repos,name,company}) {
// document.querySelector('.info').innerHTML = `
// <figure>
//             <img alt="User Profile" src="${avatar_url}" />
//         </figure>
//         <div>
//             <h2 id="name"><a href=${blog}><strong>${name}</strong></a></h2>
//             <p>${bio}</p>
//             <p>
//                 Followers: <strong>${followers}</strong>
//                 Repos: <strong>${public_repos}</strong>
//                 ${company ? "Work: "+company : "" }

//             </p>
            
//         </div>
//         `;
// }


function generateTags(fileteredList) {
return [...new Set((fileteredList.map(e => e.tags)).flat())] 

}
async function displayDirs(typeDir,filteredContent) {
    const {items,contents} = (await (await fetch("./config/user.json")).json());
    searchInput.classList.remove('hide');
    if(typeDir=="items") {
    items.forEach((dir,index) => {
             let liItem = document.createElement('li');
             liItem.classList.add('itm');
             dir.id = index
             liItem.innerHTML = generator(dir,"main");
                list.append(liItem);
      
    });    // }
}
else if(typeDir=="contents") {
    const tags = await generateTags(filteredContent)
    filteredContent.forEach((dir,index) => {
        dataContents.push(dir)
        let liItem = document.createElement('li');
        liItem.classList.add('itm');
        dir.id = index
        dir.tags.forEach((tag) => liItem.classList.add(tag))
        liItem.innerHTML = generator(dir,"content");
           list.append(liItem);
 
});    // }

}
    }

    

searchInput.addEventListener('input', (e) => {
    const search = e.target.value;
    searchDisplay(search,currentActiveClass)
});

function searchDisplay(search,tag) {
    const items = document.querySelectorAll('.itm');
    const searchNormalize = search.toLowerCase();
    // tag==all ignore other wise filter
    items.forEach((item) => {
        const normalText = item.innerText.toLowerCase();
        const className = item.className.toLowerCase();
        // console.log(className)
        if (normalText.includes(searchNormalize) &&(tag && tag !="all" ? className.includes(tag.toLowerCase()) : true)) item.classList.remove('remove');
        else item.classList.add('remove');
    });
}
function generator(dir,type) {

//     ${tags ? tags.map(tag => tag).join(' ') : ""}
// const tags = dir.tags ? dir.tags : false;
if(type === "main"){
 return `
<a href= "${dir.url ? dir.url : ("/showcase.html?type="+dir.type)} " target='_blank'>
    <div>
        <h3>
        <span class='${dir.icon}' ></span>
            ${dir.title}
        </h3>
        <p>${dir.description}</p>
           ${ dir.tags ? `<p>Tags: ${dir.tags.map(tag => `#${tag}`).join(', ')}</p>` : ""} 
    </div>
</a>`
}
else if(type === "content"){
    switch(dir.type) { 
        case "socials": 
        return `
                    <a href= "${dir.url ? dir.url : ("/showcase.html?type="+dir.type)} " target='_blank'>
                        <div>
                            <h3>
                            <span class='${dir.icon}' ></span>
                                ${dir.title}
                            </h3>
                            <p>${dir.description}</p>
                               ${ dir.tags ? `<p>Tags: ${dir.tags.map(tag => `#${tag}`).join(', ')}</p>` : ""} 
                        </div>
                    </a>`;break;
                    case "main": 
        return `
                    <a href= "${dir.url ? dir.url : ("/showcase.html?type="+dir.type)} " target='_blank'>
                        <div>
                            <h3>
                            <span class='${dir.icon}' ></span>
                                ${dir.title}
                            </h3>
                            <p>${dir.description}</p>
                               ${ dir.tags ? `<p>Tags: ${dir.tags.map(tag => `#${tag}`).join(', ')}</p>` : ""} 
                        </div>
                    </a>`;break;
                    // <a href= "${dir.url ? dir.url : ("/showcase.html?type="+dir.type)} " target='_blank'>
                                case "softprojects":  
                                case "hardprojects":  
                                return `
                                            
                                                <div>
                                                    <h3>
                                                    <span class='${dir.icon}' ></span>
                                                        ${dir.title}
                                                    </h3>
                                                    <p>${dir.description}</p>
                                                       ${ dir.tags ? `<p>Tags: ${dir.tags.map(tag => `#${tag}`).join(', ')}</p>` : ""} 
                                                </div>
                                            </a>
                                            <!-- Trigger button -->
<button class="popup-trigger" onclick=popup(${dir.id}) >View Project</button>
`;break;
}        
}

/*

*/


                }
function displayTags(tags) {

    tags.forEach(tag => {
        selectionButtonsSection.innerHTML += `<button class="btn ${tag}" onclick="filterSelection('${tag}')"> ${tag.toUpperCase()} </button>`
})
}


function filterSelection(className) {
    selectionButtonsSection.classList.add('.'+currentActiveClass)
    const selectionButtons = document.querySelectorAll('.btn')
    const selectedButton = document.querySelector('.'+className)
    currentActiveClass = className
    var currentActiveButton = document.querySelector('.btn.active')
    currentActiveButton.classList.remove('active')
    currentActiveButton.className = currentActiveButton.className.replace('active', '') 
    selectedButton.className += " active"
    console.log(currentActiveClass)
    searchDisplay("",currentActiveClass)
}