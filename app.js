let menu = document.querySelector("#menu")
let categoriesDiv = document.querySelector("#categories")

let products = []

// categories
fetch("https://restaurant.stepprojects.ge/api/Categories/GetAll")
.then(res => res.json())
.then(data => {

data.forEach(cat => {

categoriesDiv.innerHTML += `
<button onclick="filterCategory(${cat.id})">
${cat.name}
</button>
`

})

})

// products
fetch("https://restaurant.stepprojects.ge/api/Products/GetAll")
.then(res => res.json())
.then(data => {

products = data

displayProducts(products)

})

function displayProducts(arr){

menu.innerHTML = ""

arr.forEach(el => {

menu.innerHTML += `

<div class="card">

<img src="${el.image}">

<h3>${el.name}</h3>

<p>Spiciness: ${el.spiciness}</p>

<p>$ ${el.price}</p>


<button class="cartbtn" onclick="addToCart(${el.id}, '${el.name}', ${el.price})">
Add to cart
</button>
</div>

`

})

}


function filterCategory(id){

let filtered = products.filter(p => p.categoryId == id)

displayProducts(filtered)

}


function applyFilter(){

let spice = document.querySelector("#spice").value
let nuts = document.querySelector("#nuts").checked
let veg = document.querySelector("#veg").checked

let filtered = products.filter(p => {

if(p.spiciness > spice) return false
if(nuts && p.nuts) return false
if(veg && !p.vegeterian) return false

return true

})

displayProducts(filtered)

}


let total = 0

function addToCart(id,name,price){

fetch("https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
productId:id,
quantity:1
})

})
.then(res=>res.json())
.then(data=>{

displayCart(name,price)

})

}
function displayCart(name,price){

let cart = document.querySelector("#cart-items")

let div = document.createElement("div")

div.className = "cart-item"

div.innerHTML = `
<span>${name}</span>
<span>$${price}</span>
`

cart.appendChild(div)

total += price

document.querySelector("#total").innerText = total

}