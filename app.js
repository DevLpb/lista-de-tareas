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

let tasks = JSON.parse(localStorage.getItem("myTasks")) || [];

let editMode = false;

let currentTaskTitle = null;
//Función para leer elementos guardados, y elegir mostrar o no el aviso de información.

function showInfo() {
  if (tasks.length !== 0) {
    info.classList.add("hidden");
  } else {
    info.classList.remove("hidden");
  }  
}
function getInfo() {
  showInfo();
  if (tasks) {
    tasks.forEach(task => {
      createElement(task);
    });
  }
}

//Función para crear un nuevo elemento HTML.
function createElement(task) {

  // Cambia el formato de la fecha a DD-MM-YYYY.
  // Se ingresan los números.
  let date = new Date(task.date);

  // Se asignan los valores correspondientes.
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  // Se inicializa la fecha con el nuevo formato.
  let formattedDate = `${day}-${month}-${year}`


  let taskDiv = document.createElement("div");
  taskDiv.classList.add("task-div");
  taskDiv.innerHTML = `
  <h2 id="task-title">${task.title}</h2>
  <p id="task-date">${formattedDate}</p>
  <p id="task-description">${task.description}</p>
  <div class="buttons-div">
    <button id="edit-task" data-title="${task.title}">Editar</button>
    <button id="delete-task" data-title="${task.title}">Borrar</button>
    </div>
  `;
container.insertBefore(taskDiv, addTask);
}

getInfo();

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

//Botón de confirmación.

// Previene el reinicio de la página.
document.querySelector('form').addEventListener('submit', (event) => { 
    event.preventDefault(); 

    // Verifica si se está editando la tarea y ejecuta el código.
    if (editMode) {

      // Busca el índice de la tarea actual.
      index = tasks.findIndex(task => task.title === currentTaskTitle);

      if (index !== -1) {
        tasks[index] = {
          title: title.value,
          date: date.value,
          description: description.value
        }

        // Actualiza el elemento en localStorage.
        localStorage.setItem("myTasks", JSON.stringify(tasks));

        // Elimina todos los elementos del DOM y vuelve a actualizarlos con la nueva información del localStorage.
        document.querySelectorAll('.task-div').forEach(e => e.remove());
        getInfo();
        alert("Tarea editada");
        dialog.close();

        // Actualiza las variables del modo de edición y el título de la tarea actual.
        editMode = false;
        currentTaskTitle = null;
      }
    } else {

      //Creación de objeto y asignación de valores de input. Inclusión en array de tareas.
    let task = {
      title: title.value,
      date: date.value,
      description: description.value
    }

    tasks.push(task);
    
    //Lógica de guardado de tareas.
    localStorage.setItem("myTasks", JSON.stringify(tasks));
    createElement(task);
    alert("Tarea guardada");
    showInfo();
    clearInputs();
    dialog.close(); 
    }
  });

  //Despliegue de cuadro de edición.
document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', event => {
    // Comprueba si el evento se originó desde un botó de editar y ejecuta la función.
    if (event.target.id === 'edit-task') {

      //Actualiza la variable del modo de edición.
      editMode = true;
      
      //Actualiza la variable del título la tarea actual.
      currentTaskTitle = event.target.getAttribute('data-title');
      
      //Busca el índice de la tarea actual y asigna los valores a los inputs correspondientes.
      let index = tasks.findIndex(task => task.title === currentTaskTitle);

      if (index !== -1) {
        title.value = tasks[index].title;
        date.value = tasks[index].date;
        description.value = tasks[index].description;
        openDialog();
      }
    }
  })
})

  //Botón de eliminar.

  document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', event => {
        // Comprueba si el evento se originó desde un botón de borrar y ejecuta la función.
        if (event.target.id === 'delete-task') {
          // Obtiene el título de la tarea correspondiente al botón presionado y lo guarda en una variable.
          currentTaskTitle = event.target.getAttribute('data-title');

          // Busca el índice de la tarea actual.
          let index = tasks.findIndex(task => task.title === currentTaskTitle );

          // Si el índice existe (no es -1), lo elimina del array de tareas.
          if (index !== -1) {
            tasks.splice(index, 1);
          // Actualiza el localStorage con el nuevo array de tareas.
            localStorage.setItem("myTasks", JSON.stringify(tasks));
          // Elimina los elementos padres del botón en el DOM.
            event.target.parentNode.parentNode.remove();

          // Resetea la variable que guarda el título de la tarea actual.
            currentTaskTitle = null;

          // Informa la situación.
            alert("Tarea eliminada");
            showInfo();
          } else {
            alert("La tarea no existe");
          }
        }
    });
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
    <h2 id="task-title">${task.title}</h2>
    <p id="task-date">${task.date}</p>
    <p id="task-description">${task.description}</p>
    <div class="buttons-div">
    <button id="edit-task">Editar</button>
    <button id="delete-task" data-title="${task.title}">Borrar</button>
    </div>
    `;
 container.insertBefore(taskDiv, addTask);
  }