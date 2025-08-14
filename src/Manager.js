import Task from "./Task.js";
import Project from "./Project.js";

export default class Manager {
  constructor() {
    this.projects = [];
  }


  createProject(name) {
    const project = new Project(name);
    this.projects.push(project);
    this.saveToStorage();
    return project;
  }

  getProjectById(projectId) {
    return this.projects.find(p => p.id === projectId);
  }

  removeProject(projectId) {
    this.projects = this.projects.filter(p => p.id !== projectId);
    this.saveToStorage();
  }

  createTask(title, description ="", dueDate, priority) {
    return new Task(title, description, dueDate, priority);
  }

  addTaskToProject(projectId, task) {
    const project = this.getProjectById(projectId);
    if (!project) throw new Error(`Project with id ${projectId} not found`);
    project.addTask(task);
    this.saveToStorage();
  }

  removeTaskFromProject(projectId, taskId) {
    const project = this.getProjectById(projectId);
    if (!project) throw new Error(ggg`Project with id ${projectId} not found`);
    project.removeTask(taskId);
    this.saveToStorage();
  }

  saveToStorage() {
    localStorage.setItem("projects", JSON.stringify(this.projects))
  }

  loadFromStorage() {
    const data = localStorage.getItem("projects");
    if (!data) return;

    const parsed = JSON.parse(data);

    this.projects = parsed.map(p => {
      const project = new Project(p.name,p.id);
      p.tasks.forEach(t => {
        const task = new Task(t.title,t.description,t.dueDate,t.priority);
        project.addTask(task);
      })
      return project;
    })
  }
}
