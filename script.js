function LoadCategoryData() {
    const category_url = "https://openapi.programming-hero.com/api/categories";
    fetch(category_url)
        .then((res) => res.json())
        .then((json) => DisplaycategoryData(json.categories))
        
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
<li class="">${categories.category_name}</li>        
  </ul>
        `;
        categoryContainer.appendChild(div);
    }
};

LoadCategoryData();


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
    const shortDesc = descWords.length > 7
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


