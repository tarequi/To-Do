let input = document.querySelector(".textInput");
let submit = document.querySelector(".submit-btn");
let tasks = document.querySelector(".tasks");
let delete_all = document.getElementById("delete-all");

let arrayTasks = [];
// check if localStorage Have Data //(Error when Array Is Empty)
if (window.localStorage.getItem("tasks")) {
    arrayTasks = JSON.parse(localStorage.getItem("tasks"));
}
getDataFromLocalStorage();

tasks.addEventListener("click", (ele) => {
    if (ele.target.classList.contains("delete")) {
        //Remove Element From Loal Storage
        deleteTask(ele.target.parentElement.getAttribute("data-id"));//call Function
        //Remove element From Page
        ele.target.parentElement.remove();
    }

    //function to change completed task
    if (ele.target.classList.contains("task")) {
        toggleStatusTaskWith(ele.target.getAttribute("data-id"));//get the id for clicked element
        ele.target.classList.toggle("done");
    }

});




submit.onclick = function () {
    if (input.value !== "") {
        addTaskToArray(input.value);//Call function
        input.value = "";
    }   
}

delete_all.onclick = function () {
    tasks.innerHTML = "";
    window.localStorage.removeItem("tasks");
}


function addTaskToArray(TaskTitel) { //TaskTitel ==> input.value
    //obj task
    let task = {
        id: Date.now(),
        titel: TaskTitel,
        completed: false
    };
    //add task to array
    arrayTasks.push(task);
    addElementsToPageFrom(arrayTasks);
    addTaskToLocalstorageFrom(arrayTasks);
};

//create task from arrayTask
function addElementsToPageFrom(Eachtasks) { //Eachtasks is an Array
    tasks.innerHTML = "";
    Eachtasks.forEach((element) => {//(element) ==> (task) Object
        let div = document.createElement("div");
        div.setAttribute("data-id", element.id);
        if (element.completed == true) {//if task completed
            div.className = "task done";
        }
        else {
            div.className = "task";
        }
        //create delete button
        let del = document.createElement("span");
        del.className = "delete";
        del.innerHTML = "delete";
        div.appendChild(del);
        div.appendChild(document.createTextNode(element.titel));
        tasks.appendChild(div);
    });
}



function addTaskToLocalstorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}



function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
    let soso = JSON.parse(data);
    addElementsToPageFrom(soso);
    }
}



function deleteTask(taskId) {
    arrayTasks = arrayTasks.filter((task) => task.id != taskId) //return all task without (deleted task)
    addTaskToLocalstorageFrom(arrayTasks);// update localStorage after deleting task
}


function toggleStatusTaskWith(taskId) {
    for (let i = 0; i < arrayTasks.length; i++){
        if (arrayTasks[i].id == taskId) {
            if (arrayTasks[i].completed == false) {
                arrayTasks[i].completed = true;
            }
            else
            {
                arrayTasks[i].completed = false;
            }
        }
    }
    addTaskToLocalstorageFrom(arrayTasks);
}