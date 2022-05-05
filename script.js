// alert("Krishna");


let editBtn = document.querySelector("#edit-btn");
let addTitle = document.querySelector("#note-title");
let addText = document.querySelector("#note-text");
let addBtn = document.querySelector("#add-btn");

// editBtn.style.visibility = "hidden";
// console.log(addTitle);

var hidden = false;

addBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    if(addTitle.value == "" || addText.value == "" ){
        return alert("Plaese Add Notes")


    }
let notes = localStorage.getItem("notes");

if(notes == null){
    notesObj = []
}else{
    notesObj = JSON.parse(notes);
}

let myObj = {
    title:addTitle.value,
    text:addText.value
}
notesObj.push(myObj);
localStorage.setItem("notes",JSON.stringify(notesObj));
addTitle.value = "";
addText.value = "";

showContent();
})

function showContent(){
    let notes = localStorage.getItem("notes");
if(notes == null){
    notes = [];
}else{
    notesData = JSON.parse(notes);
}

let html = "";
console.log("html");
notesData.forEach((element,index) => {
    html +=`
    <div id="note">
    <p class="note-container">${index+1}</p>
    <h3 class="note-title"> ${element.title}</h3>
    <p class="note-text"> ${element.text}</p>
    <button id="${index}" onclick="deleteNote(this.id)" class="note-btn"> Delete Note</button>
    <button id="${index}"  onclick="editNote(this.id)" class="note-btn  edit-btn"> Edit Note</button>
    </div>
    `
});
let content = document.querySelector("#notes");
content.innerHTML = html;  
}

function deleteNote(index){
    let notes = JSON.parse(localStorage.getItem("notes"));
    notes.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notes));
    showContent();
}

function editNote(index){
    console.log(index);
    let notes = JSON.parse(localStorage.getItem("notes"));
    let result = notes.filter((v,i)=>index == i);
    console.log(result);
    addTitle.value = result[0].title;
    addText.value = result[0].text;

   
}
