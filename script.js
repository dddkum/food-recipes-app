document.getElementById("button").addEventListener("click", () => {
  let inputValue = document.getElementById("inputName").value;
  let details = document.getElementById("details");
  details.innerHTML = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      const meals = document.getElementById("meals");
      meals.innerHTML = "";
      if (data.meals == null) {
        document.getElementById("message").style.display = "block";
      } else {
        document.getElementById("message").style.display = "none";
        data.meals.forEach((meal) => {
          mealDiv = document.createElement("div");
          mealDiv.className = "m-2 singleMeal";
          mealDiv.setAttribute("onClick", `details("${meal.idMeal}")`);
          const mealInfo = `
                        <div class="card" style="width: 12rem;">
                            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                            <div class="card-body text-center">
                                <h6 class="card-text">${meal.strMeal}</h6>  
                            </div>
                        </div>
                    `;
          mealDiv.innerHTML = mealInfo;
          meals.appendChild(mealDiv);
        });
      }
    });
});

function details(id) {
  console.log(id);
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => response.json())
    .then((detail) => {
      let meal = detail.meals[0];
      let details = document.getElementById("details");
      details.innerHTML = "";
      let detailsDiv = document.createElement("div");
      let detailsInfo = `
        <div class="card" style="width: 19rem;">
                            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h2 class="card-text">${meal.strMeal}</h2>
                                <h5>Ingredients</h5>
                                <ul>
                                <li>${meal.strIngredient1}</li>
                                <li>${meal.strIngredient2}</li>
                                <li>${meal.strIngredient3}</li>
                                <li>${meal.strIngredient4}</li>
                                <li>${meal.strIngredient5}</li>
                                <li>${meal.strIngredient6}</li>
                                <li>${meal.strIngredient7}</li>
                                <li>${meal.strIngredient8}</li>
                                </ul>  
                            </div>
                        </div>
        `;
      detailsDiv.innerHTML = detailsInfo;
      details.appendChild(detailsDiv);
    });
}
