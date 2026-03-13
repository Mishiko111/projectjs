fetch("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
  .then((resp) => resp.json())
  .then((data) => {
    console.log(data);
    displayCart(data);

  });

function displayCart(cartArray) {
  let cart = document.querySelector("#cart-items");
  cart.innerHTML = ""; // clear previous items

  let total = 0;
  let count = 0;

  cartArray.forEach((item) => {
    let div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
            <span>${item.product.name}</span>
            <span>$${item.price}</span>
            <span>Qty: ${item.quantity}</span>
        `;

    cart.appendChild(div);

    total += item.price * item.quantity;
    count += item.quantity;
  });

  document.querySelector("#total").innerText = total;
  document.querySelector("#cart-count").innerText = count;
}

function displayCart(cartArray) {
  let cart = document.querySelector("#cart-items");
  cart.innerHTML = ""; // clear previous items

  let total = 0;
  let count = 0;

  cartArray.forEach((item) => {
    let div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
        <img src="${item.product.image}">
            <span>${item.product.name}</span>
            <span>${item.price}</span>
            <span>Qty: ${item.quantity}</span>
            
            <button onclick="removeFromCart(${item.product.id})">Remove</button>
            <button onclick="increase(${item.quantity}, ${item.price} )">+</button>
        `;

    cart.appendChild(div);

    total += item.price * item.quantity;
    count += item.quantity;
  });

  document.querySelector("#total").innerText = total;
  document.querySelector("#cart-count").innerText = count;
}


function increase(quantity,price,productid){
  fetch(`https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket`,{
    method : "PUT",
      headers: { "Content-Type": "application/json" },
  },


  )

}



function removeFromCart(productId) {
  fetch(
    

    `https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${productId}`,
    {
      method: "DELETE", // API ხშირად POST-ს იყენებს
      headers: { "Content-Type": "application/json" },
    },
  )
    .then((res) => res.json())
    .then((data) => {
      // თუ წარმატებით წაიშალა, DOM-იც წავშალე
      element.remove();

      // შემდეგ შეგიძლია გაანგარიშო ახალი total და count
      fetch("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
        .then((res) => res.json())
        .then(displayCart);
    });

window.location.href = "cart.html"

}





