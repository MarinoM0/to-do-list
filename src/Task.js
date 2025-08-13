import { format } from "date-fns";

export default class Task {

    constructor(title,description,dueDate,priority) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description=description;
        this.dueDate = dueDate;
        this.priority=priority;
        this.isComplete = false;
    }


    editContents(property, newContents) {
        if(Object.hasOwn(this,property)) {
            this[property] = newContents;
        }
    }

    toggleComplete() {
        this.isComplete = !this.isComplete;
    }

    getFormattedDate() {
        return format(new Date(this.dueDate), "do MMMM, yyyy");
    }

    getId() {
        return this.id;
    }
}