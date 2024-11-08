const searchParams = (new URLSearchParams(window.location.search))
const type = searchParams.get('type')
const maintitle = document.getElementById('main-title')
const maindesc = document.getElementById('main-description')


async function run() {
const {items,contents} = (await (await fetch("./config/user.json")).json());
// code 404
const isFound = keytype => (keytype.type === type)
if(!items.some(isFound)) window.location.replace("/404.html");
const {title,description} = items.find(isFound)
const fileteredList = contents.filter(contentType => contentType.type === type)
if(fileteredList.length===0) window.location.replace("/empty.html");
maintitle.innerHTML = title
maindesc.innerHTML = description

}

// async function fetchData() {
    

// }
run()