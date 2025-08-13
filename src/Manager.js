import Task from "./Task.js";
import Project from "./Project.js";

export default class Manager {
  constructor() {
    this.projects = [];
  }

  // Project management
  createProject(name) {
    const project = new Project(name);
    this.projects.push(project);
    return project;
  }

  getProjectById(projectId) {
    return this.projects.find(p => p.id === projectId);
  }

  removeProject(projectId) {
    this.projects = this.projects.filter(p => p.id !== projectId);
  }

  // Task management
  createTask(title, description, dueDate, priority) {
    return new Task(title, description, dueDate, priority);
  }

  addTaskToProject(projectId, task) {
    const project = this.getProjectById(projectId);
    if (!project) throw new Error(`Project with id ${projectId} not found`);
    project.addTask(task);
  }

  removeTaskFromProject(projectId, taskId) {
    const project = this.getProjectById(projectId);
    if (!project) throw new Error(`Project with id ${projectId} not found`);
    project.removeTask(taskId);
  }
}
