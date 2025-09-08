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
  console.log(plants);
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
                        <h3 class="text-[12px] font-semibold mb-1">${plant.name}</h3>
                        <p class="text-[#8C8C8C] mb-4">${shortDesc}</p>
                    </div>
                    <div class="card-footer flex justify-between items-center">
                        <h6>${plant.category}</h6>
                        <span class="text-lg font-semibold">${plant.price}</span>
                    </div>
                    <button class="cart-btn">Add to Cart</button>
                </div>

                        `;
    categoryContainer.appendChild(div);
  }
};

// LoadCategoryData function fetchCategoryData

function fetchAllPlantsData() {
  const allPlants_url = "https://openapi.programming-hero.com/api/plants";
  fetch(allPlants_url)
    .then((res) => res.json())
    .then((json) => displayCategoryData(json.plants));
}
const displayCategoryData = (Plants) => {
  console.log(Plants);
  const categoryContainer = document.getElementById("allCard");
  categoryContainer.innerHTML = "";
  for (const plant of Plants) {
    // Shorten description to 20 words
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
                        <h3 class="text-[12px] font-semibold mb-1">${plant.name}</h3>
                        <p class="text-[#8C8C8C] mb-4">${shortDesc}</p>
                    </div>
                    <div class="card-footer flex justify-between items-center">
                        <h6>${plant.category}</h6>
                        <span class="text-lg font-semibold">${plant.price}</span>
                    </div>
                    <button class="cart-btn">Add to Cart</button>
                </div>
        
        `;
    categoryContainer.appendChild(div);
  }
};

fetchAllPlantsData();

// Set All Trees as default active on page load
window.addEventListener("DOMContentLoaded", function () {
  const allTreesBtn = document.getElementById("allTrees");
  if (allTreesBtn) {
    allTreesBtn.classList.add("active");
  }
});

// Delegate click events for category buttons and All Trees
document.addEventListener("click", function (e) {
  // Check if a category li or All Trees was clicked
  if (e.target.matches(".cetegory li") || e.target.id === "allTrees") {
    // Remove 'active' from all category buttons and All Trees
    document.querySelectorAll(".cetegory li, #allTrees").forEach(btn => btn.classList.remove("active"));
    // Add 'active' to the clicked button
    e.target.classList.add("active");
  }
});

 
