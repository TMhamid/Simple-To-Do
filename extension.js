const vscode = require('vscode'); // Import VS Code API
const MyTextViewProvider = require('./myTextViewProvider'); // Ensure MyTextViewProvider is imported for displaying WebView content
const TodoProvider = require('./todoProvider'); // Import TodoProvider to manage tasks

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    const todoProvider = new TodoProvider(); // Create an instance of TodoProvider to manage the tasks

    // Register the view provider for the WebviewView, which will be used to display tasks in a WebView
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider('todoListView', new MyTextViewProvider(todoProvider)) // Register MyTextViewProvider for the 'todoListView' WebView
    );

    // Command to add a new To-Do item
    const addTaskCommand = vscode.commands.registerCommand('simple-to-do.addTodo', async () => {
        const taskLabel = await vscode.window.showInputBox({ prompt: 'Enter a new task' }); // Show input box to get task label
        if (taskLabel) {
            console.log('Adding task:', taskLabel); // Log the task being added (for debugging)
            todoProvider.addTask(taskLabel); // Add the task to TodoProvider
        } else {
            vscode.window.showWarningMessage('Task cannot be empty!'); // Show warning if no task is entered
        }
    });

    // Command to delete a selected To-Do item
    const deleteTaskCommand = vscode.commands.registerCommand('simple-to-do.deleteTodo', () => {
        vscode.window.showInformationMessage('Please delete tasks directly in the To-Do List view.'); // Inform the user to delete tasks in the To-Do List view
    });

    // Command to reload the To-Do list
    const reloadTaskCommand = vscode.commands.registerCommand('simple-to-do.reloadTodo', () => {
        vscode.window.showInformationMessage('Please delete tasks directly in the To-Do List view.'); // Inform the user that tasks can be reloaded in the view
    });

    // Command to mark a selected To-Do item as done
    const markAsDoneCommand = vscode.commands.registerCommand('simple-to-do.markAsDone', () => {
        vscode.window.showInformationMessage('Please mark tasks directly in the To-Do List view.'); // Inform the user to mark tasks as done in the To-Do List view
    });

    // Command to reveal and focus on the To-Do list in the Tree View
    const showTodoListCommand = vscode.commands.registerCommand('simple-to-do.showTodoList', () => {
        if (todoProvider.tasks.length > 0) {
            vscode.window.showInformationMessage('To-Do List is displayed in the WebView.'); // Show information if tasks exist
        } else {
            vscode.window.showInformationMessage('No tasks available in the To-Do list.'); // Show message if no tasks are available
        }
    });

    // Register all commands so they are active in the extension
    context.subscriptions.push(addTaskCommand, deleteTaskCommand, markAsDoneCommand, showTodoListCommand, reloadTaskCommand);
}

// Deactivate function (does nothing in this case)
function deactivate() {}

module.exports = {
    activate, // Export the activate function
    deactivate // Export the deactivate function
};
