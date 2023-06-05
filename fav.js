const favcontainer=document.getElementById('favcontainer')
var storageString = localStorage.getItem('favouritemealsList');
var favouritemealsList = JSON.parse(storageString);

// console.log(myListArray);
favouritemealsList.forEach(async ids =>{
    let final_url = (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ids}`);
     console.log(final_url,ids);

    loadfavmeal(final_url,ids) 
})
// api calling
async  function loadfavmeal(final_url,ids)
{
    favapi =await fetch(final_url)
    favapimealdata= await favapi.json()
        favloaddeatils(favapimealdata,ids)   
}
// render data
async function favloaddeatils(favapimealdata,ids)

{
    // container.innerHTML=""
    console.log(favapimealdata.meals[0].strMeal)

      favmealitem = document.createElement('div')
        favmealitem.id=ids
        favmealitem.className='favdetail'
        favmealitem.innerHTML=`
        <a href="./meal.html?id=${favapimealdata.meals[0].idMeal}">
        
              
                <!-- shows the img of meals -->
                <img src="${favapimealdata.meals[0].strMealThumb}" alt="unable to load">
            
            </a>
            <div class="titles">
            ${favapimealdata.meals[0].strMeal}
             </div>
         <!--  for deleting item from selected meals  --> 
         <div class="deletemeal">      
         <button ><i class="fa-solid fa-trash-can" id=${ids} ></i></button>  
         </div>     
         `;
        favcontainer.append(favmealitem);

}
// to delete one meal
async function favdelete(favid)
{
    if (window.confirm('Delete Meal from List?')) {
        console.log(favid);
        var tempArr = await JSON.parse(localStorage.getItem('favouritemealsList'));
        var index = await tempArr.indexOf(favid.toString());
        await tempArr.splice(index,1);
         localStorage.setItem('favouritemealsList', JSON.stringify(tempArr));
         window.location.reload();
    }


}
// to clear all list
function clearall()
{
    if (window.confirm('Clear Whole List?')) {
        localStorage.clear();
        window.location.reload();
    }
}
// handle all event of click
function handleclick(event)
{
    target=event.target
    if (target.className==="fa-solid fa-trash-can")

    {
        favid=target.id
        console.log(favid)
        favdelete(favid)

    }
    else if(target.className==="clear")
    {
         clearall()
    }
}
document.addEventListener('click',handleclick)
















