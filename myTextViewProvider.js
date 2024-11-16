const vscode = require('vscode'); // Import VSCode module

class MyTextViewProvider {
    constructor(todoProvider) {
        this.todoProvider = todoProvider; // Initialize the Todo provider
    }

    resolveWebviewView(webviewView, context, token) {
        webviewView.webview.options = {
            enableScripts: true // Enable scripts for the webview
        };

        webviewView.webview.html = this.getHtmlContent(); // Set the HTML content for the webview
        this.sendTasksToWebView(webviewView); // Send the tasks to the webview

        webviewView.webview.onDidReceiveMessage(message => { // Listen for messages from the webview
            switch (message.command) {
                case 'taskAdded': // When a new task is added
                    this.todoProvider.addTask(message.task); // Add the new task
                    this.sendTasksToWebView(webviewView); // Send updated tasks to the webview
                    break;
                case 'toggleTask': // When a task's completion status is toggled
                    this.todoProvider.toggleTask(message.taskIndex); // Toggle the task's completion
                    this.sendTasksToWebView(webviewView); // Send updated tasks to the webview
                    break;
                case 'removeTask': // When a task is removed
                    this.todoProvider.removeTask(message.taskIndex); // Remove the task
                    this.sendTasksToWebView(webviewView); // Send updated tasks to the webview
                    break;
                case 'removeAllTasks': // When all tasks are removed
                    this.todoProvider.removeAllTasks(); // Remove all tasks
                    this.sendTasksToWebView(webviewView); // Send updated tasks to the webview
                    break;
                case 'reloadTasks': // When tasks need to be refreshed
                    this.todoProvider.refresh(); // Refresh all tasks
                    this.sendTasksToWebView(webviewView); // Send updated tasks to the webview
                    break;
            }
        });
    }

    sendTasksToWebView(webviewView) {
        const taskData = this.todoProvider.tasks.map(task => ({
            label: task.label, // Task label
            completed: task.completed // Task completion status
        }));
        webviewView.webview.postMessage({ type: 'updateTasks', tasks: taskData }); // Send tasks to the webview
    }

    getHtmlContent() {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Simple To-Do</title>
                <style>
                    body { 
                        font-family: Arial, sans-serif; 
                        position: relative; 
                        min-height: 100vh; 
                        margin: 0; 
                        padding: 0;
                        display: flex;
                        flex-direction: column;
                    }
    
                    #inputContainer {
                        display: flex;
                        gap: 10px;
                        padding: 10px;
                    }
    
                    #taskListContainer {
                        flex: 1;
                        overflow-y: auto;
                        margin: 20px;
                        padding-bottom: 10px;
                    }
    
                    #taskList { 
                        margin-top: 20px; 
                    }
    
                    .task { 
                        padding: 5px;
                        border-top: 1px solid #ccc; 
                        margin: 5px 0;
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                        white-space: nowrap;
                    }
    
                    .circle { 
                        width: 20px; 
                        height: 20px; 
                        border: 2px solid #007ACC; 
                        border-radius: 50%; 
                        margin-right: 10px; 
                        transition: background-color 0.3s ease, border-color 0.3s ease;
                    }
    
                    .completed { background-color: #007ACC; }
    
                    .selected { background-color: #b0b0b0; }
    
                    .task span {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        max-width: calc(100% - 30px);
                    }
    
                    .button-container {
                        position: sticky;
                        bottom: 0;
                        background: #000000;
                        padding: 10px;
                        display: flex;
                        justify-content: flex-start;
                        gap: 10px;
                        border-top: none;
                    }
    
                    button {
                        padding: 5px 10px;
                        cursor: pointer;
                        border: none; 
                        background-color: #007ACC;
                        color: white;
                        border-radius: 5px;
                        transition: background-color 0.3s ease;
                    }
    
                    button:disabled {
                        background-color: #ccc;
                        cursor: not-allowed;
                    }
    
                    #taskInput {
                        flex: 1;
                    }
    
                    .no-tasks-message {
                        text-align: center;
                        color: #777;
                        font-style: italic;
                    }
                </style>
            </head>
            <body>
                <h1>Simple To-Do</h1>
                
                <div id="inputContainer">
                    <input type="text" id="taskInput" placeholder="Add a new task..." aria-label="New task input" />
                    <button id="addTaskButton" aria-label="Add task button">Add Task</button>
                </div>
                
                <div id="taskListContainer">
                    <div id="taskList">
                        <div class="no-tasks-message">No tasks yet.</div> <!-- Default message when no tasks exist -->
                    </div>
                </div>
                
                <div class="button-container">
                    <button id="removeTaskButton" disabled aria-label="Remove selected task button">Remove Selected Task</button>
                    <button id="removeAllTasksButton" disabled aria-label="Remove all tasks button">Remove All Tasks</button>
                    <button id="reloadTasksButton" aria-label="Reload tasks button">Reload Tasks</button> <!-- Reload button -->
                </div>
                
                <script>
                    const vscode = acquireVsCodeApi();
                    let selectedTaskIndex = -1;
    
                    // Event listener for adding a new task
                    document.getElementById('addTaskButton').addEventListener('click', () => {
                        const taskInput = document.getElementById('taskInput');
                        const task = taskInput.value.trim();
                        if (task) {
                            vscode.postMessage({ command: 'taskAdded', task: task });
                            taskInput.value = '';
                        } else {
                            alert('Please enter a task!');
                        }
                    });
    
                    // Event listener for reloading tasks
                    document.getElementById('reloadTasksButton').addEventListener('click', () => {
                        vscode.postMessage({ command: 'reloadTasks' });
                    });
    
                    // Listen for messages from the extension
                    window.addEventListener('message', event => {
                        const message = event.data;
                        switch (message.type) {
                            case 'updateTasks':
                                const taskList = document.getElementById('taskList');
                                taskList.innerHTML = ''; // Clear the list before updating
    
                                if (message.tasks.length === 0) {
                                    const noTasksMessage = document.createElement('div');
                                    noTasksMessage.className = 'no-tasks-message';
                                    noTasksMessage.textContent = 'No tasks yet.';
                                    taskList.appendChild(noTasksMessage);
                                } else {
                                    message.tasks.forEach((task, index) => {
                                        const taskElement = document.createElement('div');
                                        taskElement.className = 'task' + (index === selectedTaskIndex ? ' selected' : '');
    
                                        const circle = document.createElement('div');
                                        circle.className = 'circle' + (task.completed ? ' completed' : '');
                                        circle.addEventListener('click', (e) => {
                                            e.stopPropagation();
                                            vscode.postMessage({ command: 'toggleTask', taskIndex: index });
                                        });
    
                                        const taskLabel = document.createElement('span');
                                        taskLabel.textContent = task.label;
    
                                        taskElement.appendChild(circle);
                                        taskElement.appendChild(taskLabel);
                                        taskList.appendChild(taskElement);
    
                                        taskElement.addEventListener('click', () => {
                                            selectedTaskIndex = (selectedTaskIndex === index) ? -1 : index;
                                            updateSelectedTask();
                                        });
                                    });
                                }
                                updateButtonStates();
                                break;
                        }
                    });
    
                    function updateSelectedTask() {
                        document.querySelectorAll('.task').forEach((taskElement, index) => {
                            taskElement.classList.toggle('selected', index === selectedTaskIndex);
                        });
                        updateButtonStates();
                    }
    
                    function updateButtonStates() {
                        const taskList = document.querySelectorAll('.task');
                        document.getElementById('removeTaskButton').disabled = selectedTaskIndex === -1;
                        document.getElementById('removeAllTasksButton').disabled = taskList.length === 0;
                    }
    
                    document.getElementById('removeTaskButton').addEventListener('click', () => {
                        if (selectedTaskIndex !== -1) {
                            vscode.postMessage({ command: 'removeTask', taskIndex: selectedTaskIndex });
                            selectedTaskIndex = -1;
                        } else {
                            alert('Please select a task to remove!');
                        }
                    });
    
                    document.getElementById('removeAllTasksButton').addEventListener('click', () => {
                        vscode.postMessage({ command: 'removeAllTasks' });
                        selectedTaskIndex = -1;
                    });
                </script>
            </body>
            </html>
        `;
    }
}

module.exports = MyTextViewProvider;
