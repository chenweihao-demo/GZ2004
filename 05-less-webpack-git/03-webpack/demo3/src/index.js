import printMe from "./print";

console.log('index.j   s')
// printMe()

var btn = document.createElement('button')
btn.innerHTML = 'btn'
btn.onclick = printMe

document.body.appendChild(btn)