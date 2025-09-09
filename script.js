function LoadCategoryData() {
  const category_url = "https://openapi.programming-hero.com/api/categories";
  fetch(category_url)
    .then((res) => res.json())
    .then((json) => DisplaycategoryData(json.categories));
}

const DisplaycategoryData = (category) => {
  console.log(category);
  // Clear previous content
  const categoryContainer = document.getElementById("left-category");
  categoryContainer.innerHTML = "";
  // get every category
  for (const categories of category) {
    const div = document.createElement("div");
    div.innerHTML = `
       
       <ul class="mt-6 cetegory">
<li class="" onclick='getcategoryData(${categories.id})'>${categories.category_name}</li>        
  </ul>
        `;
    categoryContainer.appendChild(div);
  }
};

LoadCategoryData();
//category tree showing via clikcing
function getcategoryData(id) {
  const category_url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(category_url)
    .then((res) => res.json())
    .then((json) => displayCategoryPlants(json.plants));
}
const displayCategoryPlants = (plants) => {
  const categoryContainer = document.getElementById("allCard");
  categoryContainer.innerHTML = "";
  for (const plant of plants) {
    const descWords = plant.description.split(" ");
    const shortDesc =
      descWords.length > 7
        ? descWords.slice(0, 7).join(" ") + "..."
        : plant.description;
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="card">
        <div class="card-image">
          <img src="${plant.image}" alt="Tree Image" class="w-full h-auto" />
        </div>
        <div class="card-text">
          <h3 class="text-[12px] font-semibold mb-1 tree-name" style="cursor:pointer;">${plant.name}</h3>
          <p class="text-[#8C8C8C] mb-4">${shortDesc}</p>
        </div>
        <div class="card-footer flex justify-between items-center">
          <h6>${plant.category}</h6>
          <span class="text-lg font-semibold">$${plant.price}</span>
        </div>
        <button class="cart-btn">Add to Cart</button>
      </div>
    `;
    // Add modal event to tree name
    div.querySelector(".tree-name").onclick = () => showTreeModal(plant);
    categoryContainer.appendChild(div);
  }
};

// LoadCategoryData function fetchCategoryData function

function fetchAllPlantsData() {
  const allPlants_url = "https://openapi.programming-hero.com/api/plants";
  fetch(allPlants_url)
    .then((res) => res.json())
    .then((json) => displayCategoryData(json.plants));
}
const displayCategoryData = (Plants) => {
  const categoryContainer = document.getElementById("allCard");
  categoryContainer.innerHTML = "";
  for (const plant of Plants) {
    const descWords = plant.description.split(" ");
    const shortDesc =
      descWords.length > 7
        ? descWords.slice(0, 7).join(" ") + "..."
        : plant.description;
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="card">
        <div class="card-image">
          <img src="${plant.image}" alt="Tree Image" class="w-full h-auto" />
        </div>
        <div class="card-text">
          <h3 class="text-[12px] font-semibold mb-1 tree-name" style="cursor:pointer;">${plant.name}</h3>
          <p class="text-[#8C8C8C] mb-4">${shortDesc}</p>
        </div>
        <div class="card-footer flex justify-between items-center">
          <h6>${plant.category}</h6>
          <span class="text-lg font-semibold">$${plant.price}</span>
        </div>
        <button class="cart-btn">Add to Cart</button>
      </div>
    `;
    // Add modal event to tree name
    div.querySelector(".tree-name").onclick = () => showTreeModal(plant);
    categoryContainer.appendChild(div);
  }
};

fetchAllPlantsData();
//----------------------------------------------Api end ----------------------------------------------

// Add All Trees as default active from first
window.addEventListener("DOMContentLoaded", function () {
  const allTreesBtn = document.getElementById("allTrees");
  if (allTreesBtn) {
    allTreesBtn.classList.add("active");
  }

  cart = [];
  updateCartUI();
});

// Delegate click events category buttons
document.addEventListener("click", function (e) {

  if (e.target.matches(".cetegory li") || e.target.id === "allTrees") {

   const liBtn = document.querySelectorAll(".cetegory li, #allTrees");
   liBtn.forEach(btn => btn.classList.remove("active"));
  
    e.target.classList.add("active");
  }
});
//---------------------------------------------category click end ----------------------------------------------
let cart = [];

function addToCart(plant) {
  // Check if item already in cart
  const existing = cart.find(item => item.name === plant.name && item.price === plant.price);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name: plant.name, price: plant.price, quantity: 1 });
  }
  updateCartUI();
}

function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  updateCartUI();
}

function updateCartUI() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <div>
        <p class="font-semibold text-[1rem]">${item.name}</p>
        <p class="text-[#8f8f8f] text-[12px]">$${item.price} x ${item.quantity}</p>
      </div>
      <p class="cursor-pointer text-[#8f8f8f] remove-cart" data-name="${item.name}">X</p>
    `;
    cartItems.appendChild(div);
  });
  // Update total price
  const cartTotal = document.querySelector(".cart-total p");
  if (cartTotal) {
    cartTotal.textContent = `$${total}`;
  }
}

// Listen for Add to Cart and Remove actions
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("cart-btn")) {
    const card = e.target.closest(".card");
    const itemName = card.querySelector(".card-text h3").innerText;
    const itemPrice = parseFloat(card.querySelector(".card-footer span").innerText.replace(/[^0-9.]/g, "")) || 0;
    addToCart({ name: itemName, price: itemPrice });
  }
  if (e.target.classList.contains("remove-cart")) {
    const name = e.target.getAttribute("data-name");
    removeFromCart(name);
  }
});
//---------------------------------------------cart end ----------------------------------------------
function showTreeModal(plant) {
  document.getElementById("modal-image").src = plant.image;
  document.getElementById("modal-name").textContent = plant.name;
  document.getElementById("modal-category").textContent = plant.category;
  document.getElementById("modal-description").textContent = plant.description;
  document.getElementById("modal-price").textContent = `Price: $${plant.price}`;
  document.getElementById("tree-modal").style.display = "flex";
}

document.getElementById("close-modal").onclick = function() {
  document.getElementById("tree-modal").style.display = "none";
};

document.getElementById("tree-modal").onclick = function(e) {
  if (e.target === this) {
    this.style.display = "none";
  }
};
//---------------------------------------------modal end ----------------------------------------------
// Preloader
const preloader = document.getElementById('preloader');
window.addEventListener('load', function() {
  preloader.style.display = 'none';
});



