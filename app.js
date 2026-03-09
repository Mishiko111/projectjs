
let menu = document.querySelector("#menu");
let categoriesDiv = document.querySelector("#categories");

let products = [];
let total = 0;
let count = 0;

// ======= Categories =======
fetch("https://restaurant.stepprojects.ge/api/Categories/GetAll")
  .then((res) => res.json())
  .then((data) => {
    categoriesDiv.innerHTML = "";
    data.forEach((cat) => {
      categoriesDiv.innerHTML += `
            <button onclick="filterCategory(${cat.id})">${cat.name}</button>
        `;
    });
  });

// ======= Products =======
fetch("https://restaurant.stepprojects.ge/api/Products/GetAll")
  .then((res) => res.json())
  .then((data) => {
    products = data;
    displayProducts(products);
  });

// ======= Display Products =======
// displayProducts ფუნქცია main.js-ში
function displayProducts(arr) {
  menu.innerHTML = "";
  arr.forEach((el) => {
    let card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
            <img src="${el.image}">
            <h3>${el.name}</h3>
            <p>Spiciness: ${el.spiciness}</p>
            <p>$${el.price}</p>
            <button class="cartbtn">Add to Cart</button>
        `;
    menu.appendChild(card);

    // button click -> addToCart
    let btn = card.querySelector(".cartbtn");
    btn.addEventListener("click", () =>
      addToCart(el.id, el.name, el.price)
    );
  });
}

// ======= Filter by Category =======
function filterCategory(id) {
  let filtered = products.filter((p) => p.categoryId == id);
  displayProducts(filtered);
}

// ======= Filter by Spice / Nuts / Vegetarian =======
function applyFilter() {
  let spice = document.querySelector("#spice").value;
  let nuts = document.querySelector("#nuts").checked;
  let veg = document.querySelector("#veg").checked;

  let filtered = products.filter((p) => {
    if (p.spiciness > spice) return false;
    if (nuts && p.nuts) return false;
    if (veg && !p.vegetarian) return false;
    return true;
  });

  displayProducts(filtered);
}


 function  addToCart(id, name, price) {
    // თუ Cart page-ზე არაა, უბრალოდ API-ს გამოგიგზავნის
    fetch("https://restaurant.stepprojects.ge/api/Baskets/AddToBasket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({  quantity: 1, price : price,  productId: id, 

        }),
    }).then((res) => res.json())
    .then(data => {
         console.log(data);
         
    })

    // Update Cart page elements მხოლოდ თუ არსებობს
    let cart = document.querySelector("#cart-items");
    if (!cart) return;

    let div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `<span>${name}</span> <span>$${price}</span>`;
    cart.appendChild(div);

    total += price;
    count++;
    document.querySelector("#total").innerText = total;
    document.querySelector("#cart-count").innerText = count;
};


