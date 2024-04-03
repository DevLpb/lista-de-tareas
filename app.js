const container = document.querySelector(".container");
const info = document.querySelector(".info")
const addTask = document.getElementById("add-task");
const closeBtn = document.getElementById("close");
const cancelBtn = document.getElementById("cancel");
const confirmBtn = document.getElementById("submit");
const dialog = document.getElementById("form-dialog");
const title = document.getElementById("title");
const date = document.getElementById("date");
const description = document.getElementById("description");
const editBtn = document.getElementById("edit-task");
const deleteBtn = document.getElementById("delete-task");

let tasks = JSON.parse(localStorage.getItem("myTasks")) || [];

//Función para leer elementos guardados, y elegir mostrar o no el aviso de información.

function showInfo() {
  if (tasks.length !== 0) {
    info.classList.add("hidden");
  } else {
    info.classList.remove("hidden");
  }  
}
function comprobarInfo() {
  showInfo();
  if (tasks) {
    tasks.forEach(task => {
      createElement(task);
    });
  }
}

//Función para crear un nuevo elemento HTML
function createElement(task) {

  let taskDiv = document.createElement("div");
  taskDiv.classList.add("task-div");
  taskDiv.innerHTML = `
  <h2 id="task-title">${task.title}</h2>
  <p id="task-date">${task.date}</p>
  <p id="task-description">${task.description}</p>
  <div class="buttons-div">
    <button id="edit-task">Editar</button>
    <button id="delete-task">Borrar</button>
    </div>
  `;
container.insertBefore(taskDiv, addTask);
}

comprobarInfo();

//Al hacer click en el texto para agregar una nueva tarea, se abre el dialog con el formulario dentro.
addTask.addEventListener('click', openDialog);

function openDialog() {
    dialog.showModal();
}

//El botón de cerrar, cierra el dialog sin perder los datos ingresados en el formulario. 
closeBtn.addEventListener('click', () => {
    dialog.close();
})

//El botón de cancelar, cierra el dialog y también reinicia los datos ingresados en el formulario.
cancelBtn.addEventListener('click', () => {
    dialog.close();
})

//Botón de confirmación. En pruebas.
document.querySelector('form').addEventListener('submit', (event) => { 
    event.preventDefault(); 

    //Creación de objeto y asignación de valores de input. Inclusión en array de tareas.
    let task = {
      title: title.value,
      date: date.value,
      description: description.value
    }

    tasks.push(task);
    
    //Lógica de guardado de tareas. En pruebas.
    localStorage.setItem("myTasks", JSON.stringify(tasks));
    alert("Tarea guardada");
    clearInputs();
    dialog.close();
    addElement(task);
    showInfo();
  });

//Función para limpiar Inputs. En pruebas.
  function clearInputs() {
    title.value = "";
    date.value = "";
    description.value = "";
  }
  
  //Función para adicionar un nuevo elemento HTML
  function addElement(task) {

    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task-div");
    taskDiv.innerHTML = `
    <h2 id="task-title">${tasks[tasks.length - 1].title}</h2>
    <p id="task-date">${tasks[tasks.length - 1].date}</p>
    <p id="task-description">${tasks[tasks.length - 1].description}</p>
    <div class="buttons-div">
    <button id="edit-task">Editar</button>
    <button id="delete-task">Borrar</button>
    </div>
    `;
 container.insertBefore(taskDiv, addTask);
  }