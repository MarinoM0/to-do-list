export default function domController(manager) {
    const projectList = document.querySelector("#project-list");
    const taskList = document.querySelector("#task-list");
    const addProjectBtn = document.querySelector("#add-project-btn");
    const addTaskBtn = document.querySelector("#add-task-btn");

    let activeProjectId = null;

    function renderProjects() {
        projectList.innerHtml ="";

        manager.projects.array.forEach(project => {
            const project = document.createElement("li");
            project.textContent = project.name;

            project.addEventListener("click", () => {
                activeProjectId= project.id;
                renderTasks(project.id);
            })
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

    return { renderProjects, renderTasks, getActiveProjectId };
}