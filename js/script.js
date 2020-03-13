/******************************************
Project 2 - Dynamic Web Page: Pagination and Filtering
Adapted from Treehouse FSJS Techdegree:
******************************************/


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
//total list of all students
var students = document.getElementsByClassName("student-item cf");

//creates div for page numbers
var page = document.getElementsByClassName("page")[0];
var pagenumber = document.createElement("div");
pagenumber.className= "pagination";
page.appendChild(pagenumber);

//creates ul for page numbers
/*var buttonlist = document.createElement('ul');
pagenumber.appendChild(buttonlist);*/

//creates div for search bar
var header = document.getElementsByClassName("page-header cf")[0];
var searchbar = document.createElement("div");
header.appendChild(searchbar);
searchbar.className = "student-search";

   //create input for search bar
   var inputsearch = document.createElement("input");
   inputsearch.placeholder = "Search for Students...";
   searchbar.appendChild(inputsearch);

   //create button for searchbar
   var searchbutton = document.createElement("button");
   searchbutton.textContent = "Search";
   searchbar.appendChild(searchbutton);




//show only 10 students on each page
function showPage(pagenum, list){
   for(let student of students){
      student.style.display = "none";
   }
   for(let i = 0; i<list.length; i++){
      if(i/10<pagenum && i/10 >= pagenum-1){
            list[i].style.display = "block";
      }
      
   }
}
//on page load set page to 1
showPage(1, students);





//add buttons to the bottom of the page and set the first to active
function appendPageLinks(list){
   var buttonlist = document.createElement('ul');
   buttonlist.className = "buttons";
   pagenumber.appendChild(buttonlist);
   numButtons = Math.ceil(list.length/10);
   for(let i = 1; i<=numButtons; i++){
      var buttonuls = document.createElement("li");
      buttonlist.appendChild(buttonuls);
      var insideli = document.createElement("A");
      insideli.textContent = i;
      buttonuls.appendChild(insideli);
      if(i==1){
         insideli.className = "active";
      }

      
   }
}
appendPageLinks(students);

//on click of on eof the buttons switch page and change activeness of buttons
page.addEventListener('click', ()=>{
   let button = event.target;
   if(button.tagName == "A"){
   let bbb = document.getElementsByClassName("active");
   if(bbb.length != 0){
      bbb[0].className = 'none';
   }
   if(button.tagName == "A"){
      showPage(button.textContent, students);
      button.className = "active";
   }
}
}

)




//making the searchbar work
function searchBar(){
   //delete old no result
   let oldresult = document.querySelectorAll(".nores");
   if(oldresult.length>0){
      page.removeChild(oldresult[0]);
   }  

   
   //delete old buttons
   let findbuttons = document.querySelector(".buttons");
   pagenumber.removeChild(findbuttons);

   //create new list of students
   var newlist = [];
    for(let i of students){
         if(i.children[0].children[1].textContent.indexOf(inputsearch.value) != -1){
            newlist.push(i);
         }
   }

   //show new page
   showPage(1, newlist);

   //add new buttons
   appendPageLinks(newlist);

   //add no result if no results
   if(newlist.length ==0){
      var noresult = document.createElement('h4');
      noresult.className = "nores";
      noresult.textContent = "No result";
      page.appendChild(noresult);
   }
}
//both for search bar to react when u type a key or click the search button
inputsearch.addEventListener('keyup', ()=>{
   searchBar();
})
searchbutton.addEventListener("click", ()=>{
   searchBar();
})







