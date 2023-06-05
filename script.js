const input_box=document.getElementById('input_box')
var container=document.getElementById('container')
console.log(container)
// passing the search value 
function search_meal()
{

    let Text=input_box.value
    console.log(Text)   
    api_calling(Text)
}
// api calling
 async function api_calling(Text)
{
    // if only one letter
    if (Text.length==1)
    {
        let data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${Text}`)
        let response= await data.json()
        console.log(response.meals.length )
        render_l(response.meals)
        
    }
    // if letter is greater than one
    else if(Text.length>1)
    {
        let data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${Text}`)
        let response= await data.json()
        console.log(response)
        render_l(response.meals)
    }

}
// render list item
function render_l(meals)
{
    container.innerHTML=""
    for(let m=0;m<meals.length;m++)
    {
        console.log(meals[m])
        mealitem=document.createElement('div')
        mealitem.id=meals[m].idMeal
        mealitem.className='detail'
        mealitem.innerHTML=`
        <div class="imge">
                    
                    <img src="${meals[m].strMealThumb}" alt="unable to load">
                </div>
                <div class="title">
                    <h4>${meals[m].strMeal}</h4>
                </div>
                <div class="card_body">
                    <a href="./meal.html?id=${meals[m].idMeal}">
                    <button type="submit">More Detail</button></a>
                    <button ><i class="fa-sharp fa-solid fa-heart" id=${meals[m].idMeal}></i></button>
                </div>

            </div>
        
        `
        container.append(mealitem)

    }
    
}


var favmealsList = [];
var oldArray = [];
function favlist(buttonID )
{
  
        console.log(buttonID)
        // to add the meals only once into list
        if (!favmealsList.includes(buttonID.toString())) {
            favmealsList.push(buttonID.toString());
        }
        console.log(favmealsList);
        console.log('-------------------------------');
        
        // display toast to confirm user that meals has been added to list
        // displayMessage();
    
    
        //first we need to check if local storage is empty, if yes then push data directly; if not, then first reterive that data, modify it and then append modified data to localstorage;
        oldArray = JSON.parse(localStorage.getItem('favouritemealsList'));
        if (oldArray == null) {
            localStorage.setItem('favouritemealsList', JSON.stringify(favmealsList));
        }
        else{
            // appending only new entries in old array
            favmealsList.forEach(item =>{
                if (!oldArray.includes(item)) {
                    oldArray.push(item);
                }
            })
            localStorage.setItem('favouritemealsList', JSON.stringify(oldArray));
        }
        alert("Added sucessfully to  favourite meal ")
        
        console.log(favouritemealsList);

       
    

}
// handle click event
function handle(event)
{
    const btnonclick= event.target
    if( btnonclick.className ==="fa-sharp fa-solid fa-heart")
    {
        favlist(btnonclick.id)
    }

}
document.addEventListener('click',handle)