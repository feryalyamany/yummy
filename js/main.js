let toggleIcon = document.querySelector(".toggle-icon");
let row = document.getElementById("row");
let searchContainer = document.getElementById("searchContainer");
let submitBtn;

$(document).ready(()=>{
  searchByName([]).then(()=>{
    $('#loading').fadeOut(500)
    $('body').css('overflow','visible')
    // $('#innerLoading').fadeOut(300);
  })
 
})

function openSideNav() {
  $(".side-nav").animate({ left: 0 }, 500);
  toggleIcon.innerHTML = '<i class="fa fa-x cursor"></i>';
  for (let i = 0; i < 5; i++) {
    $(".list")
      .eq(i)
      .animate({ top: 0 }, (i + 5) * 100);
  }
}

function closeSideNav() {
  let leftNavWidth = $("#leftNav").outerWidth();
  $(".side-nav").animate({ left: -leftNavWidth }, 500);
  toggleIcon.innerHTML = '<i class="fa fa-align-justify cursor"></i>';
  $(".list").animate({ top: 300 }, 500);
}
closeSideNav();

$(".side-nav .toggle-icon").click(() => {
  if ($(".side-nav").css("left") === "0px") {
    closeSideNav();
  } else {
    openSideNav();
  }
});

async function searchByName(name) {
  $('#innerLoading').fadeIn(300);
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  res = await res.json();

  res.meals ? displayMeals(res.meals) : displayMeals([]);
  $('#innerLoading').fadeOut(300);
}

async function searchByFletter(letter) {
  closeSideNav()
  $('#innerLoading').fadeIn(300);
  letter == "" ? (letter = "a") : "";
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );
  res = await res.json();

  res.meals ? displayMeals(res.meals) : displayMeals([]);
  $('#innerLoading').fadeOut(300);
}

function displayMeals(mealsBox) {
  closeSideNav()
  let meals = "";
  for (let i = 0; i < mealsBox.length; i++) {
    meals += `
       
       <div class="col-md-3 col-12">
              <div onclick="getMealDetails('${mealsBox[i].idMeal}')" class="meal position-relative">
                <img class="w-100" src="${mealsBox[i].strMealThumb}" alt=""/>
                <div class="layer position-absolute">
                  <h3 class="fw-bold px-2">${mealsBox[i].strMeal}</h3>
                </div>
              </div>
            </div>
       
       
       `;
  }
  row.innerHTML = meals;
}


async function getCategories() {
  closeSideNav()
  $('#innerLoading').fadeIn(300);
  searchContainer.innerHTML = "";
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  res = await res.json();

  displayCategories(res.categories.slice(0, 12));
  $('#innerLoading').fadeOut(300);
}

function displayCategories(mealsBox) {
  closeSideNav()
  let meals = "";
  for (let i = 0; i < mealsBox.length; i++) {
    meals += `
       
       <div  class="col-md-3 col-12">
        
       <div onclick="getCategoryMeals('${
         mealsBox[i].strCategory
       }')" class="meal shady position-relative">
           <img src="${mealsBox[i].strCategoryThumb}" class="w-100" alt=""/>
           <div class="layer position-absolute justify-content-center ">
             <div class="text-center p-2">
                 <h3 class="fw-semibold">${mealsBox[i].strCategory}</h3>
                 <p class="fw-semibold">${mealsBox[i].strCategoryDescription
                   .split(" ")
                   .slice(0, 10)
                   .join(" ")}</p>
             </div>
            
           </div>
         </div> 
   
  
 </div>
       
       
       `;
  }
  row.innerHTML = meals;
}

async function getArea() {
  closeSideNav()
  $('#innerLoading').fadeIn(300);
  searchContainer.innerHTML = "";
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  res = await res.json();
  displayArea(res.meals);
  $('#innerLoading').fadeOut(300);
}

function displayArea(mealsBox) {
  closeSideNav()
  let meals = "";
  for (let i = 0; i < mealsBox.length; i++) {
    meals += `
       
       <div class="col-md-3 col-12">
              <div onclick="getAreaMeals('${mealsBox[i].strArea}')" class=" shady meal text-center py-3 ">
                  <i class="fa-solid fa-city area-icon fa-3x my-2"></i>
                  <h2 class=" fw-bold text-white">${mealsBox[i].strArea}</h2>
                
              </div>
            </div>
       
       
       `;
  }
  row.innerHTML = meals;
}

async function getIngredients() {
  closeSideNav()
  $('#innerLoading').fadeIn(300);
  searchContainer.innerHTML = "";
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  res = await res.json();

  displayIngredients(res.meals.slice(0, 20));
  $('#innerLoading').fadeOut(300);
}

function displayIngredients(mealsBox) {
  closeSideNav()
  let meals = "";
  for (let i = 0; i < mealsBox.length; i++) {
    meals += `
       
       <div class="col-md-3 col-12">
              <div onclick="getIngrMeals('${
                mealsBox[i].strIngredient
              }')" class="shady meal text-center px-2 py-3 ">
                  <i class="fa-solid fa-drumstick-bite area-icon fa-3x my-2"></i>
                  <h4 class="fw-bold text-white">${
                    mealsBox[i].strIngredient
                  }</h4>
                  <p class="text-white">${mealsBox[i].strDescription
                    .split(" ")
                    .slice(0, 21)
                    .join(" ")}<p>
                
              </div>
            </div>
       
       
       `;
  }
  row.innerHTML = meals;
}

async function getCategoryMeals(category) {
  closeSideNav()
  $('#innerLoading').fadeIn(300);
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  res = await res.json();

  displayMeals(res.meals.slice(0, 20));
  $('#innerLoading').fadeOut(300);
}

async function getAreaMeals(area) {
  closeSideNav()
  $('#innerLoading').fadeIn(300);
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  res = await res.json();

  displayMeals(res.meals.slice(0, 20));
  $('#innerLoading').fadeOut(300);
}

async function getIngrMeals(ingr) {
  closeSideNav()
  $('#innerLoading').fadeIn(300);
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingr}`
  );
  res = await res.json();

  displayMeals(res.meals.slice(0, 20));
  $('#innerLoading').fadeOut(300);
}

async function getMealDetails(mealId) {
  closeSideNav()
  $('#innerLoading').fadeIn(300);
  searchContainer.innerHTML = "";
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  res = await res.json();
  displayMealDetails(res.meals[0]);
  $('#innerLoading').fadeOut(300);
}

function displayMealDetails(meal) {
  closeSideNav()
  searchContainer.innerHTML = "";
  let ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="me-1 alert m-1 px-1 py-0  alert-success">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags?.split(",");
  if (!tags) tags = [];
  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += ` <li class="me-1 alert m-1 px-1 py-0 alert-danger">${tags[i]}</li>`;
  }

  let meals = `
        
        <div class="col-md-4 col-12">
        <img class="w-100 rounded-2" src="${meal.strMealThumb}" alt="" />
        <h2 class=" text-white fw-semibold mt-3">${meal.strMeal}</h2>
      </div>
      <div class="col-md-8 col-12 text-white">
        <h3 >Instructions</h3>
        <p >
         ${meal.strInstructions}
        </p>
        <p class="fw-bold ">Area: <span class="span fw-light">${meal.strArea}</span></p>
        <p class="fw-bold ">Category: <span class="span fw-light">${meal.strCategory}</span></p>
        <h4>Recipe:</h4>
        <ul class="recipe list-unstyled g-3">
         ${ingredients}
        </ul>
        <h4>Tags:</h4>
        <ul class="recipe list-unstyled g-3">
        ${tagsStr}
       
        </ul>
        <a target="_blank" href="${meal.strSource}" class="mt-3 btn btn-sm btn-success">Source</a>
        <a target="_blank" href="${meal.strYoutube}" class="mt-3 btn btn-sm btn-danger">Youtube</a>
      </div>
        
        
        
        `;

  row.innerHTML = meals;
}

function showSearch() {
  closeSideNav()
  
  searchContainer.innerHTML = `  <div id="row" class="row py-5 g-4">
      <div class="col-md-6 col-12 mb-3">
      <input id="searchByName" onkeyup="searchByName(this.value)" type="text" placeholder="search by name" class="w-100 p-2 text-center ">
    </div>
    <div class="col-md-6 col-12">
      <input id="searchByLetter" onkeyup="searchByFletter(this.value)" maxlength="1" type="text" placeholder="search by first letter" class="w-100 p-2 text-center">
    </div>

      </div>
     
  `;
  
  row.innerHTML = "";

}

function showContacts() {
  closeSideNav()
  row.innerHTML = ` <section id="contact" class="py-5">
    
  <div class="container w-75 text-center">
      <h2 class="text-white my-3 fw-bold"> Contact Us</h2>
      <div class="row g-3">
          <div class="col-md-6 col-12">
              <input onkeyup="inputsValidation()" id="nameInput" type="text" placeholder="Enter Your Name" class="w-100 p-2 text-center ">
              <div id="nameAlert" class="alert alert-warning mt-2 w-100 py-1 d-none">
              "Special Chars and Numbers aren't allowed"
              </div>
            </div>
            <div class="col-md-6 col-12">
              <input onkeyup="inputsValidation()" id="mailInput" type="email" placeholder="Enter Email" class="w-100 p-2 text-center">
              <div id="mailAlert" class="alert alert-warning mt-2 w-100 py-1 d-none">
              "Enter valid Email"
              </div>
            </div>
            <div class="col-md-6 col-12">
              <input onkeyup="inputsValidation()"  id="numInput" type="number" placeholder="Enter Phone" class="w-100 p-2 text-center">
              <div id="numAlert" class="alert alert-warning mt-2 w-100 py-1 d-none">
              "Enter valid phone number"
              </div>
            </div>
            <div class="col-md-6 col-12">
              <input onkeyup="inputsValidation()" id="ageInput" type="number" placeholder="Enter Age" class="w-100 p-2 text-center">
              <div id="ageAlert" class="alert alert-warning mt-2 w-100 py-1 d-none">
              "Enter valid age"
              </div>
            </div>
            <div class="col-md-6 col-12">
              <input onkeyup="inputsValidation()" id="passInput" type="password" placeholder="Enter Password" class="w-100 p-2 text-center ">
              <div id="passAlert" class="alert alert-warning mt-2 w-100 py-1 d-none">
              "Enter valid password"
              </div>
            </div>
            <div class="col-md-6 col-12">
              <input onkeyup="inputsValidation()" id="repassInput" type="password" placeholder="Re-Enter Password" class="w-100 p-2 text-center">
              <div id="repassAlert" class="alert alert-warning mt-2 w-100 py-1 d-none">
              "Password not matched"
              </div>
            </div>
      </div>
    
        <button id="submitBtn" type="submit" class=" mt-3 btn btn-outline-warning" disabled >Submit</button>
      
  </div>

</section>`;
searchContainer.innerHTML=''
submitBtn=document.getElementById('submitBtn');

document.getElementById('nameInput').addEventListener('focus', ()=>{
  nameInputTouched=true;
 })
 document.getElementById('mailInput').addEventListener('focus', ()=>{
  mailInputTouched=true;
 })
 document.getElementById('numInput').addEventListener('focus', ()=>{
  phoneInputTouched=true;
 })
 document.getElementById('ageInput').addEventListener('focus', ()=>{
  ageInputTouched=true;
 })
 document.getElementById('passInput').addEventListener('focus', ()=>{
  passInputTouched=true;
 })
 document.getElementById('repassInput').addEventListener('focus', ()=>{
  repassInputTouched=true;
 })
}

let nameInputTouched=false,
 mailInputTouched=false,
 phoneInputTouched=false,
 ageInputTouched=false,
 passInputTouched=false,
 repassInputTouched=false;




function inputsValidation() {

  if(nameInputTouched){
    if(nameValidation()){
      document.getElementById('nameAlert').classList.replace('d-block','d-none')
    
    }
    else{
      document.getElementById('nameAlert').classList.replace('d-none','d-block')
      
    }
  }
 
  if(mailInputTouched){
    if(emailValidation()){
      document.getElementById('mailAlert').classList.replace('d-block','d-none')
    }
    else{
      document.getElementById('mailAlert').classList.replace('d-none','d-block')
    }
  }
  
  if(phoneInputTouched){
    if(phoneValidation()){
      document.getElementById('numAlert').classList.replace('d-block','d-none')
    }
    else{
      document.getElementById('numAlert').classList.replace('d-none','d-block')
    }
  }
 
  if(ageInputTouched){
    if(ageValidation()){
      document.getElementById('ageAlert').classList.replace('d-block','d-none')
    }
    else{
      document.getElementById('ageAlert').classList.replace('d-none','d-block')
    }
  }
 
  if(passInputTouched){
    if(passwordValidation()){
      document.getElementById('passAlert').classList.replace('d-block','d-none')
    }
    else{
      document.getElementById('passAlert').classList.replace('d-none','d-block')
    }
  }

  if(repassInputTouched){
    if(repasswordValidation()){
      document.getElementById('repassAlert').classList.replace('d-block','d-none')
    }
    else{
      document.getElementById('repassAlert').classList.replace('d-none','d-block')
    }
  }
 

  if (nameValidation() &&
  emailValidation() &&
  phoneValidation() &&
  ageValidation() &&
  passwordValidation() &&
  repasswordValidation()) {
  submitBtn.removeAttribute("disabled")
} else {
  submitBtn.setAttribute("disabled", true)
}
}

function nameValidation() {
return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("mailInput").value))
}

function phoneValidation() {
return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("numInput").value))
}

function ageValidation() {
return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passInput").value))
}

function repasswordValidation() {
return document.getElementById("repassInput").value == document.getElementById("passInput").value
}
