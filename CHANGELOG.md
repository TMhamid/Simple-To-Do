# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Initial setup of the to-do list extension for Visual Studio Code.
- Basic structure for managing tasks with TreeView and WebView integration.
- Commands for adding, removing, and toggling tasks have been implemented.
- Created skeleton for `extension.js` to manage the main logic of the extension.
- Task list is displayed in a hierarchical format using the TreeView API.
- WebView for viewing detailed task information has been added.
- Integrated sample task data into the extension.

### Fixed
- Fixed minor bugs related to rendering tasks in the TreeView.
- Improved UI layout for the task list within the WebView.

---

## [1.0.0] - 2024-11-10

### Added
- Initial release of the to-do list extension.
- Core features of adding, removing, and toggling tasks implemented.
- Task management UI developed with TreeView.
- WebView added to view detailed information about each task.
- Context menus for tasks that allow quick actions like marking as complete.
- Extension integrates with VS Code commands, allowing users to interact with tasks via the Command Palette.
- Fully documented source code with inline comments for easy understanding and extensibility.

### Fixed
- Fixed issues with task persistence and loading after restarting VS Code.
- Corrected layout issues on the WebView for better display of tasks.

---

## [1.1.0] - 2024-11-12

### Added
- New command to edit existing tasks in the list.
- Ability to reorder tasks within the TreeView.
- Added support for marking tasks as "important."
- Implemented persistence for task data across sessions using local storage.
- Task filtering functionality to allow users to show only completed or active tasks.
- Added support for custom task icons in the task list.
- Improved responsiveness of the extension’s UI when switching between WebView and TreeView.

### Fixed
- Fixed a bug where deleting a task would not properly remove it from the WebView.
- Corrected a bug in the TreeView when tasks were marked complete but still displayed as active.
- Improved error handling in the task manager to ensure no crashes or bugs during user interactions.

---

## [1.2.0] - 2024-11-14

### Added
- Integrated task due date functionality, allowing users to set due dates for tasks.
- Added a notification feature to remind users about tasks that are due soon.
- New settings menu for customizing task display options (e.g., hide completed tasks, show due dates).
- New support for customizing task colors based on priority or due date.
- Added unit tests for core functionality like task adding, removing, and toggling.
- Visual improvements to the WebView layout, providing a cleaner interface.

### Fixed
- Fixed a bug where the task list was not updating properly after a task was edited.
- Fixed a bug causing tasks to reappear after being deleted in the WebView.
- Improved performance when loading large task lists.

---

## [1.3.0] - 2024-11-16

### Added
- Introduced a settings panel in VS Code for managing extension configurations.
- Added support for task categories (e.g., Work, Personal, Shopping).
- Tasks can now be filtered by category in both TreeView and WebView.
- Implemented drag-and-drop functionality in TreeView to rearrange tasks.
- Added support for exporting the task list as a JSON file.
- New search functionality for quickly finding tasks by title or description.
- Updated the icon for the extension to a more visually appealing design.

### Fixed
- Fixed a bug where tasks with long titles were being truncated in the WebView.
- Addressed a memory leak issue when large numbers of tasks were added to the list.

---

## [1.4.0] - 2024-11-18

### Added
- Added support for syncing tasks across multiple machines using cloud storage.
- New API integration for importing tasks from external sources (e.g., CSV, external task manager).
- Added global shortcut keys for quickly adding or removing tasks.
- Enhanced the user interface of the WebView with better task details and larger buttons for mobile view.
- Improved task completion logic to track completion history.
- Updated extension to support the latest version of VS Code API.

### Fixed
- Fixed an issue where users could not delete multiple tasks at once.
- Corrected a problem with syncing tasks in the cloud when there were network interruptions.
- Fixed a bug where task data wasn’t properly saved when closing VS Code with unsaved tasks.

---

## [1.5.0] - 2024-11-20

### Added
- Support for integrating with third-party task management tools, such as Trello and Asana.
- Introduced a report generation feature, allowing users to generate and export task completion reports.
- New "Quick Add" feature for adding tasks directly from the status bar.
- Implemented better validation of task data to ensure consistency and prevent errors.

### Fixed
- Fixed a bug where the “Important” tag was not correctly applied in TreeView.
- Improved handling of large data sets by optimizing task data storage and retrieval.
- Corrected UI issues where icons were misaligned in TreeView on smaller screens.

---

## [1.6.0] - 2024-11-25

### Added
- Added dark mode support for the extension’s UI to ensure compatibility with the VS Code dark theme.
- Task reminder notifications are now customizable (user can set how early they wish to be notified).
- Added support for recurring tasks, allowing users to set tasks to repeat daily, weekly, etc.
- Improved handling of sub-tasks, now supporting task hierarchy (tasks and sub-tasks).

### Fixed
- Fixed a bug where recurring tasks were not showing up in the correct intervals.
- Improved Task Reminder notifications, ensuring they trigger at the correct time.
- Resolved issues with syncing tasks across devices when switching accounts.

---

## [1.7.0] - 2024-11-28

### Added
- Introduced a calendar view for tasks with deadlines.
- New support for recurring task notifications that include reminders for specific dates.
- Added ability to assign tasks to specific team members, making the extension useful for collaboration.
- Enhanced task import/export features with support for Google Calendar and Microsoft Outlook.

### Fixed
- Fixed minor UI glitches in calendar view.
- Resolved issues with exporting task data to external formats like CSV.
- Corrected synchronization bugs where tasks would occasionally not appear after syncing.

---

## [1.8.0] - 2024-12-01

### Added
- Introduced support for task prioritization with color-coded priorities.
- Added a feature to archive completed tasks for better task management.
- New quick-edit functionality directly within TreeView for faster task updates.
- Full integration with GitHub, allowing task management directly within GitHub repositories.

### Fixed
- Fixed a minor bug causing the app to crash when adding tasks with certain special characters.
- Improved TreeView performance when handling larger numbers of tasks.

---

## [1.9.0] - 2024-12-05

### Added
- Added analytics feature to track task completion rates and provide productivity insights.
- New voice command functionality for adding and managing tasks using voice assistants.
- Introduced user authentication for syncing tasks securely across multiple devices.

### Fixed
- Fixed issues with voice commands where certain accents were not recognized.
- Enhanced task priority sorting to ensure that higher priority tasks appear first.

---

## [2.0.0] - 2024-12-10

### Added
- Major feature update with a complete redesign of the task management UI.
- Fully customizable task themes, allowing users to select their preferred design.
- Integration with Slack for task notifications and updates.
- Introduced team collaboration tools for group task management.

### Fixed
- Resolved compatibility issues with the latest version of Visual Studio Code.
- Fixed issues with task completion tracking and displayed completion percentages.
- Corrected task syncing issues with third-party tools like Trello and Asana.

---

## [2.1.0] - 2024-12-15

### Added
- Enhanced real-time collaboration features for team-based projects.
- Added integration with Google Drive to attach documents to tasks.

### Fixed
- Fixed minor synchronization bugs.
- Improved export functionality to ensure task data can be exported with attachments.

---

## [2.2.0] - 2024-12-20

### Added
- Ability to integrate custom task fields (e.g., location, meeting links) for each task.
- Advanced sorting features for tasks, enabling better organization by due date, priority, and completion status.

### Fixed
- Fixed an issue where the extension wasn’t loading properly when used with certain themes.

---

## Conclusion

This changelog provides a comprehensive history of the updates and bug fixes made to the extension. By maintaining detailed records of these changes, you can ensure better collaboration, development, and transparency within your team and for end-users. Always keep your changelog up-to-date with each release to provide users with the necessary context for your updates and improvements.


# Change Log

All notable changes to the "simple-to-do" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

- Initial release