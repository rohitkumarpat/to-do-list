document.addEventListener("DOMContentLoaded",()=>{

    let todoinput=document.getElementById("todo-input");
    let addtaskbutton=document.getElementById("add-task-btn");
    let todolist=document.getElementById("todo-list");
    
    let task=JSON.parse(localStorage.getItem("task"))||[];

    task.forEach(tasks=> {
        render(tasks);
    });
    
    addtaskbutton.addEventListener("click",()=>{
        let tasktext=todoinput.value;
        if(tasktext==="") return;
    
        let newtask={
            id: Date.now(),
            text:tasktext,
            completed:false,
        }
    
        task.push(newtask);
          savetasks();
          render(newtask);
        todoinput.value="";  // just clear the value 
        console.log(task);
    
    })
    
    function render (tasks) {
        let li=document.createElement("li");
        li.setAttribute("data-id",tasks.id);
        li.innerHTML=`<span>${tasks.text} </span> <button>delete</button>`
        
         todolist.appendChild(li);

        li.addEventListener("click",(e)=>{
            if(e.target.tagname==='button') return;
               
            tasks.completed=!task.completed;
            li.classList.toggle("completed");
            savetasks();
        })

        li.querySelector("button").addEventListener("click",(e)=>{
            e.stopPropagation();
            task=task.filter((t)=>t.id!==tasks.id);
            li.remove();
            savetasks();

        })
    }
    
    function savetasks() {
        localStorage.setItem("task",JSON.stringify(task));
    }
   })

     
   