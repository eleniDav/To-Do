import "./style.scss";
import * as bootstrap from "../node_modules/bootstrap";
import "../node_modules/animate.css";
import Swal from '../node_modules/sweetalert2';

//resizing tasks and loss of focus event
let tasks = document.querySelectorAll(".tasks");
for(let i of tasks){
  i.addEventListener("keyup", resizing);
  i.addEventListener("focusout", filling);
}

//for flexible (in height) textarea
function resizing(){
    let task = document.querySelectorAll("textarea");
    [].forEach.call(task, function(t){
        t.style.height = "36px";
        let height = t.scrollHeight;
        t.style.height = `${height}px`;
    });    
}

//when task is written and focus is out of textarea
function filling(event){
    if(event.target.value!=""){
        event.target.disabled = true;
        //prints the task written on the console
        let input = event.target.value;
        console.log(input);
    }
}

//for editting tasks
let b1 = document.querySelectorAll(".sideBtn1");
for(let i of b1){
  i.addEventListener("click",edit);
}

//control task buttons event handling
function edit(event){
    let task = event.currentTarget.parentNode.previousElementSibling.children[1];
    let tick = event.currentTarget.parentNode.previousElementSibling.children[0];
    let line = event.currentTarget.parentNode.parentNode;
    let list = line.parentNode;
    if(task.value!=""){
        task.disabled = false;
        if(tick.checked){ //if task was marked as done and you edit it=> the check is removed and the task is moved to the top of the list as well as the viewpoint so the user can know where it went
          tick.checked = false;
          list.insertBefore(line, list.children[0]);
          window.scrollTo(0,0);
        }
    }
    else{
        Swal.fire({
            title: "No task to be edited here!",
            text: "Try again after filling in the task",
            width: 500,
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
            }
          });
    }    
}

//for deleting tasks
document.querySelector(".sideBtn2").addEventListener("click",erase);

function erase(event){
    let task = event.currentTarget.parentNode.previousElementSibling.children[1]; //0 is input 1 is textarea --dont use childNodes cause it takes in account texts and comments and eeeverything 
    let tick = event.currentTarget.parentNode.previousElementSibling.children[0];
    let line = event.currentTarget.parentNode.parentNode;
    let list = line.parentNode;
    if(task.value==""){
        Swal.fire({
            title: "No task to be deleted here!",
            text: "Try again on an actual task",
            width: 500,
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
            }
          });
    }else{
        Swal.fire({
            title: "Are you sure?",
            html: `
              After deleting task <b>` + task.value + `</b> it will be gone forever!
            `,
            showCancelButton: true,
            confirmButtonColor: "light grey",
            cancelButtonColor: "dark grey",
            confirmButtonText: "I am sure!",
            icon: "warning"
          }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Task deleted!",
                    icon: "success"
                });
                task.value = null;
                task.disabled = false;
                task.style.height = "35px";
                if(tick.checked)
                  tick.checked = false;
                list.insertBefore(line, list.children[0]);
            }
          });
    }
}

//for newly added tasks you can remove the whole added task/line completely
function eraseNew(event){
    let task = event.currentTarget.parentNode.previousElementSibling.children[1]; //0 is input 1 is textarea --dont use childNodes cause it takes in account texts and comments and eeeverything 
    let line = event.currentTarget.parentNode.parentNode;
    if(task.value==""){
      Swal.fire({
          title: "Empty task deleted!",
          icon: "success",
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `
          }
        });
        document.getElementById("sumOfTasks").removeChild(line);
  }else{
      Swal.fire({
          title: "Are you sure?",
          html: `
            After deleting task <b>` + task.value + `</b> it will be gone forever!
          `,
          showCancelButton: true,
          confirmButtonColor: "light grey",
          cancelButtonColor: "dark grey",
          confirmButtonText: "I am sure!",
          icon: "warning"
        }).then((result) => {
          if (result.isConfirmed) {
              Swal.fire({
                  title: "Task deleted!",
                  icon: "success"
              });
              document.getElementById("sumOfTasks").removeChild(line);
          }
        });
  }
}

//for adding tasks
document.getElementById("adding").addEventListener("click", add_tasks);

//adding task button event handling
function add_tasks(){
    let audio = new Audio("../src/click_sound2.mp3");
    audio.play();

    let listItem = document.createElement("li");
    listItem.setAttribute("class", "list-group-item");

    let div1 = document.createElement("div");
    div1.setAttribute("class", "form-check");

    let check = document.createElement("input");
    check.setAttribute("class", "form-check-input");
    check.setAttribute("type", "checkbox");
    check.setAttribute("name", "tick");
    check.addEventListener("change", tickHandle);

    let area = document.createElement("textarea");
    area.setAttribute("class", "tasks");
    area.setAttribute("name", "tasks");
    area.setAttribute("placeholder", "∘∘∘");
    area.addEventListener("keyup", resizing);
    area.addEventListener("focusout", filling);

    let whiteSpace = document.createTextNode(""); //must use!! its the third child afterall..

    let div2 = document.createElement("div");
    div2.setAttribute("id", "helpers");

    let b1 = document.createElement("button");
    b1.setAttribute("type", "button");
    b1.setAttribute("class", "sideBtn1");
    b1.addEventListener("click", edit);

    let i1 = document.createElement("img");
    i1.src = "../src/edit.png";
    i1.setAttribute("id", "edit");

    let b2 = document.createElement("button");
    b2.setAttribute("type", "button");
    b2.setAttribute("class", "sideBtn2");
    b2.addEventListener("click", eraseNew);

    let i2 = document.createElement("img");
    i2.src = "../src/delete.png";
    i2.setAttribute("id", "delete");
 
    b2.appendChild(i2);
    b1.appendChild(i1);
    div2.appendChild(b1);
    div2.appendChild(b2);
    div1.appendChild(check);
    div1.appendChild(area);
    div1.appendChild(whiteSpace);
    listItem.appendChild(div1);
    listItem.appendChild(div2);

    //when you add new tasks you have two cases, if you have already checked tasks then new tasks will be added before the checked ones, otherwise new tasks will be added at the bottom of the list

    let ticks = document.getElementsByClassName("form-check-input");
    for(let i = 0; i < ticks.length; i++){
      if(ticks[i].checked){
        document.getElementById("sumOfTasks").insertBefore(listItem, ticks[i].parentNode.parentNode);
        break;
      }
      else
        document.getElementById("sumOfTasks").appendChild(listItem);
    }    
}

//task completion handling
let tick = document.querySelectorAll(".form-check-input");
for(let i of tick){
  i.addEventListener("change", tickHandle);
}

function tickHandle(event){
    let tick = event.currentTarget;
    let task = tick.nextElementSibling;
    let line = tick.parentNode.parentNode;
    let list = line.parentNode;
    if(tick.checked){
      if(task.value == ""){
        Swal.fire({
          title: "There's no task here!",
          text: "Try again on an actual task",
          width: 500,
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `
          }
        });
        tick.checked = false;
      }
      else{
        let audio = new Audio("../src/task_check_sound.mp3");
        audio.play();
        task.disabled = true;
        list.appendChild(line);       
      }
    }
    else if(!tick.checked){
      list.insertBefore(line, list.children[0]);
      window.scrollTo(0,0);
    }
}