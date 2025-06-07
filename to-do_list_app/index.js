let taskInput = document.getElementById("task_input");
let add_btn = document.getElementById("add_btn");
let taskContainer = document.getElementById("task_container");

add_btn.onclick = function addTask() {
    if (taskInput.value.trim() === '') {
        alert("You must write something!");
    }
    else {
        taskContainer.innerHTML += `
            <div class="task_row">
                <img src="images/unchecked.png" class="check_img" data-checked="false">
                <input type="text" class="task_text" id="task_input" value="${taskInput.value}">
                <button class="del_btn">DEL</button>
            </div>`;
        taskInput.value = "";
    }
};

taskContainer.onclick = function (e) {
    if (e.target.classList.contains("check_img")) {
        let img = e.target;
        let checked = img.getAttribute("data-checked") === "true";
        let taskRow = img.parentElement;
        let task_text = taskRow.querySelector(".task_text");
        
        if (checked) {
            img.src = "images/unchecked.png";
            img.setAttribute("data-checked", "false");
            task_text.style.cssText = `
            color: #000;
            text-decoration: none;
            `;
        }
        else {
            img.src = "images/checked.png";
            img.setAttribute("data-checked", "true");
            task_text.style.cssText = `
            color: crimson;
            text-decoration: line-through;
            `;
        }
    }
    else if(e.target.classList.contains("del_btn")) {
        let taskRow = e.target.parentElement;
        taskRow.remove();
    }
};