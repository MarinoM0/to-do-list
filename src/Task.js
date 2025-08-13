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

    formattedDate(date) {
        return date.format()
    }

    getId() {
        return this.id;
    }
}