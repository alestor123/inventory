var searchParams = (new URLSearchParams(window.location.search))
var type = searchParams.get('type')
console.log(type)


async function run() {
const {items} = (await (await fetch("./config/user.json")).json());
if(!items.some(keytype => keytype.type === type)) window.location.replace("/404.html");

}

async function fetchData() {
    

}
run()