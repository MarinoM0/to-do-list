export default function domController(manager) {
  const projectList = document.querySelector("#projects-list");
  const taskList = document.querySelector("#tasks-list");
  let activeProjectId = null;

  function renderProjects() {
    projectList.innerHTML = "";
    manager.projects.forEach(p => {
      const project = document.createElement("div");
      project.classList.add("project-item");
      project.textContent = p.name;
      if (p.id === activeProjectId) project.classList.add("active");
      project.addEventListener("click", () => {
        activeProjectId = p.id;
        renderProjects();
        renderTasks(p.id);
      });
      projectList.appendChild(project);
    });
  }

  function renderTasks(projectId) {
    const project = manager.getProjectById(projectId);
    taskList.innerHTML = "";
    if (!project) return;
    project.getTasks().forEach(task => {
      const taskCard = document.createElement("div");
      taskCard.classList.add("task-card", task.priority);

      const title = document.createElement("p");
      title.classList.add("task-title");
      title.textContent = task.title;

      const due = document.createElement("p");
      due.classList.add("task-due");
      due.textContent = task.getFormattedDate();

      const details = document.createElement("div");
      details.classList.add("task-details");
      details.style.display = "none";

      const desc = document.createElement("p");
      desc.textContent = `Description: ${task.description || "No description"}`;

      const prio = document.createElement("p");
      prio.textContent = `Priority: ${task.priority}`;

      details.appendChild(desc);
      details.appendChild(prio);

      taskCard.appendChild(title);
      taskCard.appendChild(due);
      taskCard.appendChild(details);

      taskCard.addEventListener("click", () => {
        details.style.display = details.style.display === "none" ? "block" : "none";
      });

      taskList.appendChild(taskCard);
    });
  }

  function getActiveProjectId() {
    return activeProjectId;
  }

  function setActiveProject(projectId) {
    activeProjectId = projectId;
  }

  return { renderProjects, renderTasks, getActiveProjectId, setActiveProject };
}
