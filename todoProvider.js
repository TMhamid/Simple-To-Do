const vscode = require('vscode'); // Import the VS Code API

// TodoItem class represents each task in the Tree View
class TodoItem extends vscode.TreeItem {
    constructor(label) {
        super(label); // Call the parent constructor with the label
        this.label = label; // Set the task's label
        this.contextValue = 'todoItem';  // Set initial context value for the task
        this.completed = false; // Task completion status, initially set to false
    }

    // Method to toggle the completion status of the task
    toggleCompleted() {
        this.completed = !this.completed; // Toggle between completed and not completed
    }

    // Method to convert the task to a string
    toString() {
        return this.label; // Return the task's label as string
    }

    // Method to send task information to the WebView
    toWebViewFormat() {
        return {
            label: this.label, // Task label
            completed: this.completed // Task completion status
        };
    }
}

// TodoProvider class to manage tasks for the WebView
class TodoProvider {
    constructor() {
        this._onDidChangeTreeData = new vscode.EventEmitter(); // Event emitter to notify changes in the tree view
        this.onDidChangeTreeData = this._onDidChangeTreeData.event; // Event to listen for changes
        this.tasks = []; // Array to hold tasks
    }

    // Method to reload tasks and update the WebView
    reloadTasks() {
        this.refresh(); // Trigger a refresh to send the updated tasks to the WebView
    }

    // Add a new task to the list
    addTask(taskLabel) {
        if (typeof taskLabel === 'string' && taskLabel.trim() !== '') { // Check if task label is valid
            const task = new TodoItem(taskLabel); // Create a new TodoItem instance
            this.tasks.push(task); // Add the new task to the tasks array
            this.refresh(); // Refresh the Tree View to show the new task
        } else {
            vscode.window.showErrorMessage('Please enter a valid task.'); // Show an error if the task is invalid
        }
    }

    // Toggle the completed state of a task
    toggleTask(index) {
        if (this.tasks[index]) { // Check if the task at the given index exists
            this.tasks[index].toggleCompleted(); // Toggle the completion status of the task
            this.refresh(); // Refresh the Tree View to reflect the change
        }
    }

    // Remove a task by index
    removeTask(index) {
        if (this.tasks[index]) { // Check if the task exists at the given index
            this.tasks.splice(index, 1); // Remove the task from the array
            this.refresh(); // Refresh the Tree View to reflect the task removal
        } else {
            vscode.window.showErrorMessage('Task not found.'); // Show an error if the task does not exist
        }
    }

    // Remove all tasks
    removeAllTasks() {
        this.tasks = []; // Clear the array of tasks
        this.refresh(); // Refresh the Tree View to show an empty task list
    }

    // Refresh the Tree View
    refresh() {
        this._onDidChangeTreeData.fire(); // Fire an event to notify that the tree data has changed
    }

    // Provide the list of tasks for the WebView
    getChildren() {
        return Promise.resolve(this.tasks.map(task => task.toWebViewFormat())); // Return the tasks in a format suitable for WebView
    }

    // Send tasks to the WebView
    sendTasksToWebView(webviewView) {
        const taskData = this.tasks.map(task => task.toWebViewFormat()); // Map the tasks to their WebView format
        webviewView.webview.postMessage({ type: 'updateTasks', tasks: taskData }); // Send the tasks to the WebView
    }
}

module.exports = TodoProvider; // Export TodoProvider class so it can be used in other files
