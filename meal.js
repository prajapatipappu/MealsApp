var detials_meal =document.getElementById('detials_meal')
// console.log(request.query.id)
// api calling
async function more_details()
{
    let url=new URLSearchParams(window.location.search)
    let url_id =url.get('id')
    console.log(url_id)

    let data=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${url_id}`)
    let response=await data.json()
    console.log(response.meals)
    loaddetails(response.meals)

    // render_l(response.meals)
}
// rendering the mealdetails
function loaddetails(item)
{
    for(let m=0;m<item.length;m++)
    {
        console.log(item[m])
        document.body.style.backgroundImage=`url(${item[m].strMealThumb})`
    
    detials_meal.innerHTML=`<div class="Meal_Details">
    <img src="${item[m].strMealThumb}" alt="unable to load">
    <span>${item[m].strMeal}</span>
    <h4>Category :${item[m].strCategory} </h4>
    <h4>Area : ${item[m].strArea}</h4>

     <h3>Instructions:-</h3>
     <p> ${item[m].strInstructions}</p>
       
         
</div>
<div class="video">
    <a href="${item[m].strYoutube}">
    <button type="submit">Watch Video</button></a>
</div>`
        
}
}
more_details()