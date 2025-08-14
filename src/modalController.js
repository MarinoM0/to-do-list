export default function modalController(manager,dom) {

  const projectModal = document.querySelector("#project-modal");
  const projectForm = document.querySelector("#project-form");
  const addProjectBtn = document.querySelector("#add-project-btn");
  const cancelProjectBtn = document.querySelector("#cancel-project-btn");


  const taskModal = document.querySelector("#task-modal");
  const taskForm = document.querySelector("#task-form");
  const addTaskBtn = document.querySelector("#add-task-btn");
  const cancelTaskBtn = document.querySelector("#cancel-task-btn");

  
  function openModal(modal) {
    modal.style.display = "block";
  }

  function closeModal(modal) {
    modal.style.display="none";
  }

  addProjectBtn.addEventListener("click", () => {
    openModal(projectModal);
  })

  addTaskBtn.addEventListener("click", () => {
    openModal(taskModal);
  })

  cancelProjectBtn.addEventListener("click", () => {
    projectForm.reset();       
    closeModal(projectModal); 
  });

  cancelTaskBtn.addEventListener("click", () => {
    taskForm.reset();
    closeModal(taskModal);
  });



  projectForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.querySelector("#project-name").value.trim();

    if(name) {
      const project= manager.createProject(name);
      dom.renderProjects();
      dom.setActiveProject(project.id);
      projectForm.reset();
      closeModal(projectModal);
    }
  }) 

  taskForm.addEventListener("submit", e => {
    e.preventDefault();

    const title= document.querySelector("#task-title").value.trim();
    const description = document.querySelector("#task-desc").value.trim();
    const date = document.querySelector("#task-date").value;
    const priority = document.querySelector("#task-priority").value;

    if (title && description && priority) {
      const task = manager.createTask(title, description, date, priority);
      manager.addTaskToProject(dom.getActiveProjectId(), task);
      dom.renderTasks(dom.getActiveProjectId());
      taskForm.reset();
      closeModal(taskModal);
    }
  })

}