const info = document.querySelector("info");
const addTask = document.getElementById("add-task");
const closeBtn = document.getElementById("close");
const cancelBtn = document.getElementById("cancel");
const confirmBtn = document.getElementById("submit");
const dialog = document.getElementById("form-dialog");
const title = document.getElementById("title");
const date = document.getElementById("date");
const description = document.getElementById("description");


// Al hacer click en el texto para agregar una nueva tarea, se abre el dialog con el formulario dentro.
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

let tasks = [];

//Botón de confirmación. En pruebas.
document.querySelector('form').addEventListener('submit', (event) => { 
    event.preventDefault(); 
    console.log(title.value);
    console.log(date.value);
    console.log(description.value);
    alert("Tarea guardada");
    clearInputs();

  });

//Función para limpiear Inputs. En pruebas.
  function clearInputs() {
    title.value = "";
    date.value = "";
    description.value = "";
  }