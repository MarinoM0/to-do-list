export default function domController(manager) {
    const projectList = document.querySelector("#projects-list");
    const taskList = document.querySelector("#tasks-list");
    const addProjectBtn = document.querySelector("#add-project-btn");
    const addTaskBtn = document.querySelector("#add-task-btn");

    let activeProjectId = null;

    function renderProjects() {
    projectList.innerHTML = "";

    manager.projects.forEach(p => {
        const project = document.createElement("div");
        project.classList.add("project-item");
        project.textContent = p.name;

        // Highlight the active one
        if (p.id === activeProjectId) {
            project.classList.add("active");
        }

        // Make it clickable
        project.addEventListener("click", () => {
            activeProjectId = p.id;        // set active
            renderProjects();              // re-render to update highlight
            renderTasks(p.id);              // show this project's tasks
        });

        projectList.appendChild(project);
    });
}

    function renderTasks(projectId) {
        const project = manager.getProjectById(projectId);

        taskList.innerHTML="";
        project.getTasks().forEach(task => {
            const taskCard = document.createElement("div");
            const title = document.createElement("p");
            title.textContent=task.title;
            const due = document.createElement("p");
            due.textContent = task.getFormattedDate();
            taskCard.appendChild(title);
            taskCard.appendChild(due);
            taskList.appendChild(taskCard);
        })
    }

    function getActiveProjectId() {
        return activeProjectId;
    }

    function setActiveProject(projectId) {
        activeProjectId = projectId;
    }


    return { renderProjects, renderTasks, getActiveProjectId, setActiveProject };
}