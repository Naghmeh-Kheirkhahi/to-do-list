let myInput = document.getElementById('myInput');
let taskList = document.getElementById('task-list');
let temp;


myInput.addEventListener('keydown', ev => {
    if (ev.key === 'Enter') {
        if (temp) {
            temp.innerText = myInput.value;
            temp = null;
        }
        else{
            let task = addElementNew(myInput.value);
            taskList.appendChild(task);
            // instead of these two lines in else, you can write ---> taskList.appendChild(addElementNew(myInput.value));
        }
        //taskList.innerHTML += addElement(myInput.value);
        myInput.value = '' // keydown is used when we want to used a key on the keyboard
    }
})

function addElement(value) {
    return `<div class="task-class col-12 text-center display-flex align-item-center space-between">
                <div class="display-flex col-10">
                    <input type="checkbox">
                    <p style="margin-left: 10px;">${value}</p>
                </div>
                <div class="col-2">
                    <i class="fa-solid fa-ellipsis" onclick="editOrDeleteClick()"></i>
                    <div class="editORdelete-class text-center display-flex align-item-center">
                        <div class="display-flex col-12">
                            <i class="fa-solid fa-pen" style="margin-bottom: 5px;"></i>
                            <p style="margin: 0 0 5px 8px ;">Edit</p>
                        </div>
                        <div class="display-flex col-12">
                            <i class="fa-solid fa-trash-can" style="margin-top: 5px;"></i>
                            <p style="margin: 5px 0 0 8px;">Delete</p>
                        </div>
                    </div>
                </div>
            </div>`;
}

function addElementNew(value){
    const parent = document.createElement("div");
    parent.classList = "task-class col-12 text-center display-flex align-item-center space-between";

    const firstChild = document.createElement("div");
    firstChild.className = "display-flex col-10";
    const inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    const fisrtP = document.createElement("p");
    fisrtP.style = "margin-left: 10px";
    fisrtP.innerText = value;

    firstChild.appendChild(inputElement);
    firstChild.appendChild(fisrtP);
    parent.appendChild(firstChild);


    const secondChild = document.createElement("div");
    secondChild.className = "col-2";
    const editOrDeleteIcon = document.createElement("i");
    editOrDeleteIcon.className = "fa-solid fa-ellipsis"
    const editOrDeleteDiv = document.createElement("div");
    editOrDeleteDiv.classList = "editORdelete-class text-center display-flex align-item-center"

    secondChild.appendChild(editOrDeleteIcon);
    secondChild.appendChild(editOrDeleteDiv);

    const editDiv = document.createElement("div");
    editDiv.className = "display-flex col-12"; 
    const editIcon = document.createElement("i");
    editIcon.className = "fa-solid fa-pen";
    editIcon.style = "margin-bottom: 5px";
    const editP = document.createElement("p");
    editP.style = "margin: 0 0 5px 8px";
    editP.innerText = "Edit";

    editDiv.appendChild(editIcon);
    editDiv.appendChild(editP);

    editOrDeleteDiv.appendChild(editDiv);

    const deleteDiv = document.createElement("div");
    deleteDiv.className = "display-flex col-12"; 
    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fa-solid fa-trash-can";
    deleteIcon.style = "margin-top: 5px";
    const deleteP = document.createElement("p");
    deleteP.style = "margin: 5px 0 0 8px" ;
    deleteP.innerText = "Delete" ;

    deleteDiv.appendChild(deleteIcon);
    deleteDiv.appendChild(deleteP);

    editOrDeleteDiv.appendChild(deleteDiv);

    parent.appendChild(secondChild);


    
    inputElement.addEventListener("change" , () => {
        fisrtP.classList.toggle('text-decoration');
    })
    
    editOrDeleteIcon.addEventListener("click" , () => {
        document.querySelectorAll(".editORdelete-class").forEach(choice => {
            choice.style.display = "none";
        })

        document.querySelectorAll(".fa-ellipsis").forEach(choice => {
            choice.style.display = "flex";
        })

        editOrDeleteDiv.style.display = "flex";
        editOrDeleteIcon.style.display = "none";       
    })   

    editDiv.addEventListener("click" , () => {
        myInput.value =  fisrtP.innerText;
        temp = fisrtP;
    })

    deleteDiv.addEventListener("click" , () => {
        taskList.removeChild(parent);
    })


    return parent;
}


function buttonClearAll(){
    while (taskList.firstChild) {
        taskList.removeChild(taskList.lastChild);
        
      }
}

function taskStatus(value){
    taskList.childNodes.forEach(child => {
        if (value === 'Pending') {
            if (child.querySelector('input').checked) {
                child.style.display = 'none';
            }
            else{
                child.style.display = 'flex';
            }
        }

        else if (value === 'Completed') {
            if (child.querySelector('input').checked) {
                child.style.display = 'flex';
            }
            else{
                child.style.display = 'none';
            }
        }

        else {
            child.style.display = 'flex';
        }
    })
}