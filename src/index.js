import "./styles.css";
import Manager from "./Manager.js";
import domController from "./domController.js";
import modalController from "./modalController.js";

const manager = new Manager();
const dom = domController(manager);

modalController(manager, dom);

manager.loadFromStorage();
dom.renderProjects();
if (manager.projects.length > 0) {
    dom.renderTasks(manager.projects[0].id);
};

