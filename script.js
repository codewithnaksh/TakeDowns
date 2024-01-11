const addButton = document.querySelector("#add");

const updateLocalStorageData = ()=>{
    const textareaData = document.querySelectorAll('textarea');
    const notes = [];

    textareaData.forEach((note)=>{
        console.log(note.value);
        return notes.push(note.value);
    })

    localStorage.setItem('notes', JSON.stringify(notes));
}

const addNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");

  const htmlData = `
                    <div class="operation">
                        <button class="edit"><i class="far fa-edit"></i></button>
                         <button class="delete"><i class="fas fa-trash-alt"></i></button>
                    </div>
                    <div class="main ${text ? "" : "hidden"}"></div>
                    <textarea class="${text ? "hidden" : ""}"></textarea>`;

    note.insertAdjacentHTML('afterbegin',htmlData);

    const editButton = note.querySelector('.edit');
    const delButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textarea = note.querySelector('textarea');

    delButton.addEventListener('click',()=>{
        note.remove();
        updateLocalStorageData();
    })

    textarea.value = text;
    mainDiv.innerHTML = text;

    editButton.addEventListener('click',()=>{
        mainDiv.classList.toggle('hidden');
        textarea.classList.toggle('hidden');
    })

    textarea.addEventListener('change',(event)=>{
        const value = event.target.value;
        mainDiv.innerHTML =  value;

        updateLocalStorageData();
    })


    const mainContainer = document.querySelector("main");
    mainContainer.appendChild(note);
};


const notes = JSON.parse(localStorage.getItem('notes'));

if (notes) {
    notes.forEach((note)=> addNote(note));
}

addButton.addEventListener("click", () => {
  addNote();
});
