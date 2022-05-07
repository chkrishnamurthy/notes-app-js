let editBtn = document.querySelector("#edit-btn");
let addTitle = document.querySelector("#note-title");
let addText = document.querySelector("#note-text");
let addBtn = document.querySelector("#add-btn");
let content = document.querySelector("#notes");
let deleteBtn = document.querySelector("#delete-btn")
var editIndex = 0;

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
notesData.forEach((element,index) => {
    html +=`
    <div id="note">
    <p class="note-container">${index+1}</p>
    <h3 class="note-title"> ${element.title}</h3>
    <p class="note-text"> ${element.text}</p>
    <button id="delete-btn" onclick="deleteNote(${index})" class="note-btn"> Delete Note</button>
    <button id="${index}"  onclick="editNote(${index})" class="note-btn  edit-btn"> Edit Note</button>
    </div>
    `
});
content.innerHTML = html;  
}

function deleteNote(index){
    let notes = JSON.parse(localStorage.getItem("notes"));
    notes.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notes));
    showContent();
}

function editNote(index){
    addBtn.style.display ="none"
    editBtn.style.display ="block"
    let notes = JSON.parse(localStorage.getItem("notes"));
    let result = notes.filter((v,i)=>index == i);
    console.log(result);
    addTitle.value = result[0].title;
    addText.value = result[0].text;
    editIndex = index;
    console.log(deleteBtn);
    document.querySelector("#delete-btn").setAttribute('disabled',"");
    // addBtn.setAttribute('disabled',"");
}


editBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    editBtn.style.display ="none"
    addBtn.style.display ="block"
    let notes = JSON.parse(localStorage.getItem("notes"));
    if(addTitle.value == "" || addText.value == "" ){
        return alert("Plaese Add Notes")
    }
    let myObj = {
        title:addTitle.value,
        text:addText.value
    }
    notes[editIndex] = myObj;
    console.log(notes);
    localStorage.setItem("notes",JSON.stringify(notes));
    addTitle.value = "";
    addText.value = "";
    document.querySelector("#delete-btn").removeAttribute('disabled',"");

    showContent();

})
showContent();